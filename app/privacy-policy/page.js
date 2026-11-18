'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import { headingFont } from '../Components/Font/headingFont';
import Footer from '../Components/UI/Footer';

const Page = () => {
  const footerRef = useRef(null);

  return (
    <main className="text-white relative">
      <Navbar />
      <ScrollableRobot heroRef={null} aboutRef={null} gapRef={null} servicesRef={null} footerRef={footerRef} />

      <div className="flex flex-col items-center justify-center h-[24rem] md:h-[28rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full px-4`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          PRIVACY <span className="text-cyan-400">POLICY</span>
        </h1>
        {/* <p className="text-white/60 mt-4 text-sm md:text-base">Last updated: November 18, 2026</p> */}
      </div>

      <section className="relative pb-16 lg:pb-24">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 space-y-10 text-white/80 leading-relaxed">
          <div>
            <p>
              Logisol Technologies (&quot;Logisol,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{' '}
              <a href="https://logisol.tech/" className="text-cyan-400 hover:text-cyan-300 underline">logisol.tech</a>, use our services, or communicate with us.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>1. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white font-medium">Personal identifiers:</span> name, email address, phone number, company name, billing and mailing address.
              </li>
              <li>
                <span className="text-white font-medium">Project and business details:</span> information you provide in forms, proposals, briefs, or correspondence related to our services.
              </li>
              <li>
                <span className="text-white font-medium">Technical data:</span> IP address, browser type, device information, pages visited, referring URLs, and similar usage data collected through cookies and analytics tools.
              </li>
              <li>
                <span className="text-white font-medium">Payment-related information:</span> limited billing details needed to process invoices. We do not store full payment card numbers on our servers when payments are processed by third-party providers.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, manage, and improve our web, app, design, and marketing services.</li>
              <li>To respond to inquiries, prepare proposals, and communicate about projects.</li>
              <li>To process payments, send invoices, and manage contractual relationships.</li>
              <li>To send newsletters or marketing communications where you have opted in; you may unsubscribe at any time.</li>
              <li>To analyze website performance, improve user experience, and maintain security.</li>
              <li>To comply with legal obligations and enforce our agreements.</li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>3. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, pixels, and similar technologies (including analytics and advertising tools such as Google Analytics, Google Tag Manager, and Microsoft Clarity) to understand how visitors use our site and to improve our services. You can control cookies through your browser settings. Disabling cookies may affect certain site features.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>4. How We Share Information</h2>
            <p className="mb-3">We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who help us operate our business (hosting, email, analytics, payment processing), under appropriate confidentiality obligations.</li>
              <li>Professional advisors such as lawyers, accountants, or insurers when reasonably necessary.</li>
              <li>Authorities when required by law, regulation, legal process, or to protect our rights, users, or the public.</li>
              <li>A successor entity in connection with a merger, acquisition, or sale of assets, subject to this policy&apos;s protections.</li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>5. Data Retention</h2>
            <p>
              We retain personal information only for as long as needed to fulfill the purposes described in this policy, meet legal or accounting requirements, resolve disputes, and enforce our agreements. When information is no longer required, we securely delete or anonymize it where practicable.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>6. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the Internet or electronic storage is fully secure; we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>7. Your Rights and Choices</h2>
            <p className="mb-3">
              Depending on your location, you may have rights to access, correct, update, delete, or restrict certain uses of your personal information, and to withdraw consent where processing is based on consent. To exercise these rights, contact us using the details below. We may need to verify your identity before fulfilling a request.
            </p>
            <p>
              If you are in the European Economic Area, United Kingdom, or similar jurisdictions, you may also have the right to lodge a complaint with a supervisory authority.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>8. International Transfers</h2>
            <p>
              Logisol operates internationally. Your information may be processed in countries other than your own, including the United States, Canada, and the United Arab Emirates. Where required, we take steps to ensure appropriate safeguards for cross-border transfers.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page will reflect the latest revision. Continued use of our website or services after changes become effective constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>12. Contact Us</h2>
            <p className="mb-3">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul className="list-none space-y-1">
              <li>
                <span className="text-white font-medium">Email:</span>{' '}
                <a href="mailto:info@logisol.tech" className="text-cyan-400 hover:text-cyan-300 underline">info@logisol.tech</a>
              </li>
              <li>
                <span className="text-white font-medium">Website:</span>{' '}
                <Link href="/contact-us" className="text-cyan-400 hover:text-cyan-300 underline">Contact Us</Link>
              </li>
              <li>
                <span className="text-white font-medium">Address:</span> 1001 S Main St, Kalispell, Montana, USA
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
