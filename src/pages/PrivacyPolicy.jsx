import React from 'react'
import { LegalContact, LegalLink, LegalPage, LegalSection } from '../components/legal/LegalPage'
import { BUSINESS, LEGAL_EFFECTIVE_DATE, LEGAL_PATHS } from '../data/business'

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>
      This Privacy Policy explains what information {BUSINESS.name} collects, why we collect it, how we look after it
      and what choices you have. It applies to texcodes.com, to our software products, including CommentIQ, and to
      client project work.
    </p>

    <LegalSection number={1} title="Who we are">
      <p>
        {BUSINESS.name} is a software business run by {BUSINESS.owner} from Gujranwala, Pakistan. In this policy,
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
          only the two-letter country code, in a cookie called <code>tx_country</code> that lasts 24 hours, so that prices
          are shown in your local currency.
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
          <strong>Disconnecting and deletion.</strong> You can disconnect at any time. You can remove CommentIQ’s access
          in your Facebook, Instagram or TikTok settings, and you will also be able to disconnect inside CommentIQ once
          that option is available. We delete your platform data when you ask us to, or when you delete your CommentIQ
          account.
        </li>
      </ul>
      <p>
        To ask us to delete your data, follow the steps on our{' '}
        <LegalLink to={LEGAL_PATHS.dataDeletion}>Data Deletion page</LegalLink>.
      </p>
      <p>We handle data received from Meta and TikTok in line with their platform terms and developer policies.</p>
    </LegalSection>

    <LegalSection number={5} title="Third parties we work with">
      <p>
        We use a small number of service providers to run our website and products. They process data only to provide
        their service to us.
      </p>
      <ul>
        <li>
          <strong>Netlify</strong> hosts texcodes.com and works out your country for currency display.
        </li>
        <li>
          <strong>Supabase</strong> stores the messages sent through our contact form.
        </li>
        <li>
          <strong>Google Fonts</strong> and <strong>Iconify</strong> serve some fonts and icons on texcodes.com, so they
          receive your IP address and browser details when a page loads.
        </li>
        <li>
          <strong>Meta</strong> (Instagram, Facebook and WhatsApp) and <strong>TikTok</strong> provide the APIs that
          CommentIQ uses. WhatsApp also carries any messages you send us there.
        </li>
        <li>
          <strong>Payment providers</strong>: if you buy a paid plan, your payment is handled by the payment provider or
          bank shown at checkout. We receive only what we need to confirm your payment.
        </li>
      </ul>
      <p>We may also share information when the law requires it.</p>
    </LegalSection>

    <LegalSection number={6} title="Storage and security">
      <p>
        Your information is stored with the service providers listed above, and some of them store data outside
        Pakistan. We protect it with encrypted (HTTPS) connections, by limiting access to the people who need it to run
        the service, and through the security controls of those providers. No online service can be completely secure,
        but we take reasonable steps to protect your information.
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
