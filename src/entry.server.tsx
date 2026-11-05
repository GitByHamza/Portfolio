import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { createReadableStreamFromReadable } from '@react-router/node'
import { ServerRouter } from 'react-router'
import type { EntryContext } from 'react-router'
import { handleRequest as handleVercelRequest } from '@vercel/react-router/entry.server'

export default function handleRequest(request: Request, status: number, headers: Headers, context: EntryContext): Promise<Response> {
  if (process.env.VERCEL === '1') return handleVercelRequest(request, status, headers, context)
  return new Promise((resolve, reject) => {
    let failed = false
    const { pipe, abort } = renderToPipeableStream(<ServerRouter context={context} url={request.url} />, {
      // Public copy is ready synchronously. Complete rendering also makes the
      // response useful to readers that do not process streamed JS updates.
      onAllReady() {
        const body = new PassThrough()
        headers.set('Content-Type', 'text/html; charset=utf-8')
        resolve(new Response(createReadableStreamFromReadable(body), { status: failed ? 500 : status, headers }))
        pipe(body)
      },
      onShellError: reject,
      onError(error: unknown) { failed = true; console.error(error) },
    })
    if (request.signal.aborted) abort()
    else request.signal.addEventListener('abort', abort, { once: true })
  })
}
