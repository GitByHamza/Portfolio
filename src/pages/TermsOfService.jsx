import React from 'react'
import { LegalContact, LegalLink, LegalPage, LegalSection } from '../components/legal/LegalPage'
import { BUSINESS, LEGAL_EFFECTIVE_DATE, LEGAL_PATHS } from '../data/business'

const TermsOfService = () => (
  <LegalPage title="Terms of Service">
    <p>
      These Terms of Service are an agreement between you and {BUSINESS.name}, run by {BUSINESS.owner}. They apply to
      texcodes.com and to our software products, including CommentIQ. By using our website or products, you agree to
      these terms. If you do not agree, please do not use them.
    </p>

    <LegalSection number={1} title="Our services">
      <p>
        {BUSINESS.name} builds and runs software products, such as CommentIQ, and takes on custom software projects for
        clients. Where a client project has its own written quote or agreement, that document applies to the project,
        and it takes priority over these terms if the two conflict. The same applies to offers that have their own
        published terms, such as our <LegalLink to="/solutions/terms">retail offer terms</LegalLink>: those terms apply
        to that offer and take priority over these terms if the two conflict.
      </p>
    </LegalSection>

    <LegalSection number={2} title="Accounts">
      <ul>
        <li>You must be at least 18 years old to create an account.</li>
        <li>The information you give us must be accurate, and you must keep it up to date.</li>
        <li>Keep your login details safe. You are responsible for everything that happens under your account.</li>
        <li>Tell us straight away if you think someone else has used your account.</li>
      </ul>
    </LegalSection>

    <LegalSection number={3} title="Acceptable use">
      <p>When you use our services, you must not:</p>
      <ul>
        <li>break any law, or help anyone else to do so;</li>
        <li>send spam, or harass, threaten or abuse anyone;</li>
        <li>upload viruses or other harmful code;</li>
        <li>try to break, overload, scrape, copy or reverse-engineer our services;</li>
        <li>try to get into accounts or data that are not yours;</li>
        <li>break the terms of Instagram, Facebook, TikTok or any other platform you connect.</li>
      </ul>
      <p>Only connect social media accounts that you own or are authorised to manage.</p>
    </LegalSection>

    <LegalSection number={4} title="Third-party platforms">
      <p>
        CommentIQ works with Instagram, Facebook and TikTok through their official APIs. These platforms decide what
        their APIs allow, so some features may change or stop working if they change their rules. {BUSINESS.name} is
        not affiliated with or endorsed by Meta or TikTok.
      </p>
    </LegalSection>

    <LegalSection number={5} title="Payments and subscriptions">
      <ul>
        <li>Prices and what each plan includes are shown before you buy.</li>
        <li>
          Paid plans are billed in advance for the billing period you choose, and they renew for the same period until
          you cancel.
        </li>
        <li>
          You can cancel at any time. Cancelling stops the next renewal, and you keep access until the end of the period
          you have already paid for.
        </li>
        <li>
          Payments are not refundable, except where the law requires a refund, where we have agreed to one in writing,
          or where an offer’s published terms provide for one.
        </li>
        <li>Prices do not include any taxes that may apply.</li>
        <li>If we change a price, we will tell you before the change applies to your next billing period.</li>
        <li>If a payment fails or is not made, we may pause your access until it is paid.</li>
      </ul>
    </LegalSection>

    <LegalSection number={6} title="Client projects and code ownership">
      <p>
        Client commissions and bespoke commercial solutions (such as Tech-Retail OS) are delivered with complete GitHub
        repository transfer and database control upon final milestone settlement.
      </p>
    </LegalSection>

    <LegalSection number={7} title="Your content and data">
      <p>
        You keep ownership of your content and of the data from the accounts you connect. You allow us to store and
        process it only so that we can provide the service to you. Our{' '}
        <LegalLink to={LEGAL_PATHS.privacy}>Privacy Policy</LegalLink> explains how we handle it.
      </p>
    </LegalSection>

    <LegalSection number={8} title="Our intellectual property">
      <p>
        Our software, website, design and brand belong to {BUSINESS.name}. Using our services does not give you any
        ownership of them. This does not affect client deliverables that are transferred to the client under section 6.
      </p>
    </LegalSection>

    <LegalSection number={9} title="Termination">
      <p>
        You can stop using our services at any time. We may suspend or close your account if you break these terms or
        if your use puts our services or other users at risk. When an account is closed, we handle your data as
        described in our <LegalLink to={LEGAL_PATHS.privacy}>Privacy Policy</LegalLink> and on our{' '}
        <LegalLink to={LEGAL_PATHS.dataDeletion}>Data Deletion page</LegalLink>.
      </p>
    </LegalSection>

    <LegalSection number={10} title="Disclaimer">
      <p>
        We work hard to keep our services useful and available, but we provide them “as is” and “as available”. We do
        not promise that they will always be uninterrupted or error-free. Comment analysis is produced automatically and
        may not always be accurate, so please use your own judgement before acting on it.
      </p>
    </LegalSection>

    <LegalSection number={11} title="Limitation of liability">
      <p>
        As far as the law allows, {BUSINESS.name} is not liable for any indirect or consequential loss, such as lost
        profits, lost data or lost business opportunities. Our total liability to you for any claim about our services
        is limited to the amount you paid us in the 12 months before the claim.
      </p>
    </LegalSection>

    <LegalSection number={12} title="Changes to these terms">
      <p>
        These terms are effective from {LEGAL_EFFECTIVE_DATE}. We may update them from time to time. When we do, we will
        post the new version on this page and update the effective date. If you keep using our services after that, you
        accept the updated terms.
      </p>
    </LegalSection>

    <LegalSection number={13} title="Governing law">
      <p>
        These terms are governed by the laws of Pakistan. Any dispute about them will be handled by the courts of
        Pakistan.
      </p>
    </LegalSection>

    <LegalSection number={14} title="Contact us">
      <p>If you have any questions about these terms, contact us:</p>
      <LegalContact />
    </LegalSection>
  </LegalPage>
)

export default TermsOfService
