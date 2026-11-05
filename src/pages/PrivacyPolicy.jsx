
import { LegalContact, LegalLink, LegalPage, LegalSection } from '../components/legal/LegalPage'
import { BUSINESS, COMMENTIQ_AI_PROVIDER, LEGAL_EFFECTIVE_DATE, LEGAL_PATHS } from '../data/business'

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>
      This Privacy Policy explains what information {BUSINESS.name} collects, why we collect it, how we look after it
      and what choices you have. It applies to texcodes.com, to our software products, including CommentIQ, and to
      client project work.
    </p>

    <LegalSection number={1} title="Who we are">
      <p>
        {BUSINESS.name} is a software business run by {BUSINESS.owner} in Pakistan. In this policy,
        “{BUSINESS.name}”, “we”, “us” and “our” mean {BUSINESS.name}. Our full contact details are in section 11.
      </p>
    </LegalSection>

    <LegalSection number={2} title="Information we collect">
      <p>
        <strong>Information you give us</strong>
      </p>
      <ul>
        <li>
          When you use the contact form on texcodes.com: your name, email address, country, the project category you
          choose and your message.
        </li>
        <li>When you email us or message us on WhatsApp: your contact details and whatever you include in the message.</li>
        <li>When you create an account for one of our products: account details such as your name and email address.</li>
        <li>When you connect a social media account to CommentIQ: the data described in section 4.</li>
      </ul>
      <p>
        <strong>Information collected automatically</strong>
      </p>
      <ul>
        <li>
          Country: when you open texcodes.com, our hosting provider works out your country from your IP address. We keep
          only the two-letter country code, in a cookie called <code>tx_country</code> that lasts 24 hours, so that we can
          choose which currency to show prices in.
        </li>
        <li>
          Server logs: our hosting provider records standard technical information, such as IP address, browser type and
          the pages requested, to run and protect the website.
        </li>
      </ul>
      <p>
        <strong>Information that stays on your device</strong>
      </p>
      <ul>
        <li>
          texcodes.com uses your browser’s local storage to remember your theme (light or dark), your language and
          whether you have seen the theme tip. This stays in your browser and is not sent to us.
        </li>
      </ul>
      <p>texcodes.com does not use advertising cookies or third-party analytics tools.</p>
    </LegalSection>

    <LegalSection number={3} title="How we use your information">
      <ul>
        <li>To reply to your enquiries and discuss your project.</li>
        <li>To provide, maintain and support our products and services.</li>
        <li>To manage accounts and bill for paid plans.</li>
        <li>To keep our services secure and prevent misuse.</li>
        <li>To meet our legal obligations.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not share it with anyone for their own advertising.
      </p>
    </LegalSection>

    <LegalSection number={4} title="CommentIQ and connected social media accounts">
      <p>CommentIQ is a {BUSINESS.name} product that analyses the comments on your social media posts.</p>
      <ul>
        <li>
          <strong>What you connect.</strong> You connect your own Instagram professional accounts, Facebook Pages and
          TikTok accounts to CommentIQ through the official Meta and TikTok APIs. You approve this access on Meta’s or
          TikTok’s own screen, and you choose which accounts to connect.
        </li>
        <li>
          <strong>What we access.</strong> We access only the comments, posts and basic profile information of the
          accounts you connect, together with the access tokens the platform issues so that CommentIQ can read that data
          for you. We use this data only to provide comment analysis to you, the same user who connected the account.
        </li>
        <li>
          <strong>What we never do.</strong> We do not sell this data, do not use it for advertising, and do not build
          profiles of commenters.
        </li>
        <li>
          <strong>AI analysis.</strong> Comment text is sent to {COMMENTIQ_AI_PROVIDER} only to produce the analysis for
          the user who connected the account. We use {COMMENTIQ_AI_PROVIDER}’s API with model training turned off, and
          neither we nor {COMMENTIQ_AI_PROVIDER} use this data to train or improve AI models.
        </li>
        <li>
          <strong>Access tokens.</strong> Access tokens are stored encrypted on our servers and are never shared.
        </li>
        <li>
          <strong>Disconnecting and deletion.</strong> You can disconnect at any time. You can remove CommentIQ’s access
          in your Facebook, Instagram or TikTok settings, and you will also be able to disconnect inside CommentIQ once
          that option is available. When you disconnect an account or delete your CommentIQ account, we delete that
          account’s tokens, comments and analysis within 30 days, as described on our{' '}
          <LegalLink to={LEGAL_PATHS.dataDeletion}>Data Deletion page</LegalLink>. We also delete your platform data
          whenever you ask us to.
        </li>
      </ul>
      <p>
        We use Meta and TikTok platform data only as their platform terms allow, and only to provide CommentIQ to the
        user who connected the account.
      </p>
    </LegalSection>

    <LegalSection number={5} title="Third parties we work with">
      <p>
        We use only the services below to run our website and products. Netlify, Supabase, Zoho Mail and{' '}
        {COMMENTIQ_AI_PROVIDER} process data on our behalf. Google, Calendly, Meta and TikTok also handle data under their
        own privacy policies.
      </p>
      <ul>
        <li>
          <strong>Netlify</strong> hosts texcodes.com and works out your country for currency display.
        </li>
        <li>
          <strong>Supabase</strong> is our database. It stores the messages sent through our contact form and CommentIQ
          data.
        </li>
        <li>
          <strong>Zoho Mail</strong> hosts our email at {BUSINESS.email}, so it holds the emails you send us.
        </li>
        <li>
          <strong>Calendly</strong> runs our <LegalLink href={BUSINESS.bookingUrl}>call booking page</LegalLink>. If you
          book a call, Calendly collects the name, email and booking details you enter, under Calendly’s own privacy
          policy.
        </li>
        <li>
          <strong>Google Fonts</strong> serves the fonts on texcodes.com, so Google receives your IP address and browser
          details when a page loads.
        </li>
        <li>
          <strong>{COMMENTIQ_AI_PROVIDER}</strong> analyses comment text for CommentIQ, as described in section 4.
        </li>
        <li>
          <strong>Meta</strong> (Facebook and Instagram APIs) and <strong>TikTok</strong> (TikTok API for Business)
          provide the connected-account data that CommentIQ uses. We use these APIs for CommentIQ only.
        </li>
        <li>
          <strong>WhatsApp</strong> (Meta) carries any messages you choose to send us there.
        </li>
      </ul>
      <p>
        We do not use an online payment gateway. Clients pay by bank transfer against an invoice, and we receive only what
        we need to confirm the payment.
      </p>
      <p>We may also share information when the law requires it.</p>
    </LegalSection>

    <LegalSection number={6} title="Storage and security">
      <p>
        Your information is stored with the service providers listed above, and some of them store data outside
        Pakistan. Information is sent over encrypted (HTTPS) connections and is protected by the security controls of
        those providers. No online service can be completely secure, but we take reasonable steps to protect your
        information.
      </p>
      <p>
        We keep information only for as long as we need it for the purpose it was collected for, or as the law requires.
        After that, we delete it.
      </p>
    </LegalSection>

    <LegalSection number={7} title="Your rights">
      <p>You can ask us to:</p>
      <ul>
        <li>give you a copy of the personal information we hold about you;</li>
        <li>correct information that is wrong or out of date;</li>
        <li>delete your information;</li>
        <li>disconnect your social media accounts from CommentIQ, or withdraw a consent you gave us.</li>
      </ul>
      <p>
        Email us at <LegalLink href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</LegalLink> to make a request. We may
        ask you to confirm that the account is yours, and we will reply within 30 days.
      </p>
    </LegalSection>

    <LegalSection number={8} title="Cookies and local storage">
      <p>
        We use one cookie, <code>tx_country</code>, to show prices in your currency, and your browser’s local storage for
        your theme and language choices, as described in section 2. You can clear both in your browser settings at any
        time. The site still works without them.
      </p>
    </LegalSection>

    <LegalSection number={9} title="Children">
      <p>
        Our services are meant for people aged 18 or older. We do not knowingly collect information from children. If
        you think a child has given us their information, contact us and we will delete it.
      </p>
    </LegalSection>

    <LegalSection number={10} title="Changes to this policy">
      <p>
        This policy is effective from {LEGAL_EFFECTIVE_DATE}. If we change it, we will post the new version on this page
        and update the effective date.
      </p>
    </LegalSection>

    <LegalSection number={11} title="Contact us">
      <p>If you have any questions about this policy or your information, contact us:</p>
      <LegalContact />
    </LegalSection>
  </LegalPage>
)

export default PrivacyPolicy
