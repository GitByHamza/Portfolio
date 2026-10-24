import React from 'react'
import { LegalContact, LegalLink, LegalPage, LegalSection } from '../components/legal/LegalPage'
import { BUSINESS, LEGAL_PATHS } from '../data/business'

const deletionMailto = `mailto:${BUSINESS.email}?subject=Data%20Deletion%20Request`

const DataDeletion = () => (
  <LegalPage title="Data Deletion">
    <p>
      You can ask {BUSINESS.name} to delete your data at any time. This page explains how to make a request and what
      happens next.
    </p>

    <LegalSection number={1} title="What this covers">
      <p>You can ask us to delete:</p>
      <ul>
        <li>
          data from the Instagram, Facebook and TikTok accounts you connected to CommentIQ, including comments, posts,
          basic profile information and access tokens;
        </li>
        <li>your CommentIQ account details;</li>
        <li>messages you sent us through the contact form on texcodes.com.</li>
      </ul>
    </LegalSection>

    <LegalSection number={2} title="Request deletion by email">
      <p>
        Send an email to <LegalLink href={deletionMailto}>{BUSINESS.email}</LegalLink> with the subject{' '}
        <strong>“Data Deletion Request”</strong>. Please include:
      </p>
      <ul>
        <li>your name;</li>
        <li>the email address you use with us;</li>
        <li>the Instagram, Facebook Page or TikTok accounts you connected, if any.</li>
      </ul>
      <p>We may reply to ask you to confirm that the accounts are yours before we delete anything.</p>
    </LegalSection>

    <LegalSection number={3} title="Disconnect your accounts">
      <p>
        We are adding an option inside CommentIQ to disconnect your accounts. Once it is available, you will be able to
        disconnect from within the app. Until then, please send us an email as described above.
      </p>
      <p>
        If you remove CommentIQ from your Facebook or Instagram settings, we receive a notice from Meta and delete the
        data we hold for that account within 30 days.
      </p>
      <p>
        You can also remove CommentIQ’s access at any time from your TikTok settings. This stops us from receiving any
        new data from that account. To delete the data we already hold, send us a deletion request as well.
      </p>
    </LegalSection>

    <LegalSection number={4} title="How long it takes">
      <p>
        We will confirm that we have received your request, and we will complete the deletion within 30 days. We will
        email you when it is done.
      </p>
      <p>
        You can read more about how we handle your information in our{' '}
        <LegalLink to={LEGAL_PATHS.privacy}>Privacy Policy</LegalLink>.
      </p>
    </LegalSection>

    <LegalSection number={5} title="Contact us">
      <LegalContact />
    </LegalSection>
  </LegalPage>
)

export default DataDeletion
