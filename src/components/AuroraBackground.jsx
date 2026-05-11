import { motion, useReducedMotion } from 'framer-motion';

export default function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {/* Blob 1 - Primary (Blue) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/30 blur-[100px] mix-blend-screen"
      />
      
      {/* Blob 2 - Pop (Cyan) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -100, 0, 100, 0],
          y: [0, 100, 50, 0, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-pop/30 blur-[120px] mix-blend-screen"
      />

      {/* Blob 3 - Violet/Indigo mix for depth */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [100, 0, -100, 0, 100],
          y: [50, 0, 50, 100, 50],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/20 blur-[90px] mix-blend-screen"
      />

      {/* Noise Texture Overlay for that premium grainy look */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] mix-blend-overlay z-10" />
    </div>
  );
}
