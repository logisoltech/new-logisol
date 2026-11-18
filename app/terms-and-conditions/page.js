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
          TERMS &amp; <span className="text-cyan-400">CONDITIONS</span>
        </h1>
        <p className="text-white/60 mt-4 text-sm md:text-base">Last updated: November 18, 2026</p>
      </div>

      <section className="relative pb-16 lg:pb-24">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 space-y-10 text-white/80 leading-relaxed">
          <div>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website{' '}
              <a href="https://logisol.tech/" className="text-cyan-400 hover:text-cyan-300 underline">logisol.tech</a>{' '}
              and the services offered by Logisol Technologies (&quot;Logisol,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By engaging our services, making a payment, or using our website, you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) agree to these Terms. If you do not agree, do not use our services.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>1. Services</h2>
            <p>
              Logisol provides software development, web development, mobile application development, digital marketing, SEO, graphic design, video editing, and related professional services. The specific scope, deliverables, timelines, and fees for each engagement will be set out in a proposal, statement of work, invoice, or written agreement (collectively, the &quot;Agreement&quot;). In the event of a conflict between these Terms and an Agreement, the Agreement will control for that engagement.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>2. Agreement and Acceptance</h2>
            <p>
              An Agreement is formed when you accept a proposal in writing (including email), sign a contract, or make an advance or other payment toward a project. Once an Agreement is formed, both parties are bound by these Terms and the agreed scope of work.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>3. Payments and Non-Refundable Policy</h2>
            <p className="mb-3">
              Unless expressly stated otherwise in a signed Agreement, the following payment terms apply:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white font-medium">Advance and general payments are non-refundable.</span>{' '}
                Once an Agreement is in place, any advance payment, deposit, milestone payment, or other payment made to Logisol will not be refunded under any circumstances, including project cancellation, change of mind, delay attributable to the Client, or dissatisfaction after work has commenced in accordance with the agreed scope.
              </li>
              <li>
                Invoices are due according to the schedule stated in the Agreement or invoice. Late payments may result in suspension of work until outstanding amounts are cleared.
              </li>
              <li>
                Fees are quoted in the currency specified in the Agreement. Applicable taxes may be added where required by law.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>4. Project Changes and Revisions</h2>
            <p className="mb-3">
              The Client may request changes to the project at any time. We welcome ongoing collaboration and feedback.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Change requests should be submitted in writing (including email or an agreed project channel).
              </li>
              <li>
                Changes that fall within the original agreed scope and any included revision rounds will be handled as part of the project.
              </li>
              <li>
                Changes that expand scope, add features, require rework beyond agreed revisions, or affect timelines may require a revised quote, additional fees, and/or an adjusted delivery schedule. Work on out-of-scope changes will begin after written confirmation of the revised terms.
              </li>
              <li>
                Requesting changes does not entitle the Client to a refund of any amounts already paid.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>5. Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide timely feedback, approvals, content, credentials, and materials needed to complete the work.</li>
              <li>Ensure you have the rights to all materials you supply (text, images, branding, data, etc.).</li>
              <li>Designate a primary contact authorized to make decisions on behalf of the Client.</li>
              <li>Delays in Client input may extend delivery timelines without liability to Logisol.</li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>6. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Upon full payment of all fees due for a project, and subject to the Agreement, the Client will own the final deliverables created specifically for the Client, excluding Logisol&apos;s pre-existing tools, frameworks, libraries, templates, and know-how.
              </li>
              <li>
                Logisol retains ownership of its methodologies, source code libraries, reusable components, and proprietary tools. Where such materials are included in deliverables, the Client receives a non-exclusive license to use them as part of the deliverables.
              </li>
              <li>
                Until full payment is received, Logisol retains all rights in work product and may withhold delivery or access.
              </li>
              <li>
                Logisol may showcase completed work in portfolios and marketing materials unless the Client requests confidentiality in writing and that request is accepted in the Agreement.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>7. Confidentiality</h2>
            <p>
              Each party agrees to keep confidential any non-public business, technical, or personal information received from the other party in connection with a project, and to use such information only for performing under the Agreement, except where disclosure is required by law or the information is already public through no fault of the receiving party.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>8. Third-Party Services and Licenses</h2>
            <p>
              Projects may rely on third-party platforms, APIs, hosting, plugins, stock assets, or software licenses. The Client is responsible for ongoing fees, account ownership, and compliance with third-party terms unless otherwise agreed in writing. Logisol is not liable for outages, policy changes, or failures of third-party services outside our control.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>9. Warranties and Disclaimers</h2>
            <p className="mb-3">
              We will perform services in a professional and workmanlike manner consistent with industry standards. Except as expressly stated in an Agreement:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Services and deliverables are provided &quot;as is&quot; without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement.</li>
              <li>We do not guarantee specific business results, rankings, revenue, or uninterrupted operation of websites or applications.</li>
              <li>Bug fixes within a reasonable post-delivery window may be included as stated in the Agreement; enhancements beyond that are billable.</li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Logisol&apos;s total liability arising out of or related to any Agreement or these Terms shall not exceed the total fees actually paid by the Client to Logisol for the specific project giving rise to the claim in the twelve (12) months preceding the claim. In no event shall Logisol be liable for indirect, incidental, special, consequential, punitive, or lost-profit damages, even if advised of the possibility of such damages.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Logisol and its officers, employees, and contractors from claims, damages, losses, and expenses (including reasonable attorneys&apos; fees) arising from your misuse of the services, your content or materials, your violation of these Terms, or your infringement of third-party rights.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>12. Termination</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Either party may terminate an engagement as provided in the Agreement, or if no termination clause exists, by written notice if the other party materially breaches and fails to cure within a reasonable period after notice.
              </li>
              <li>
                Upon termination, the Client remains responsible for all fees for work performed and expenses incurred through the termination date. Advance and other payments already made remain non-refundable as stated in Section 3.
              </li>
              <li>
                Provisions that by their nature should survive (including payment, IP, confidentiality, limitation of liability, and indemnification) will survive termination.
              </li>
            </ul>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>13. Website Use</h2>
            <p>
              You agree not to misuse our website, attempt unauthorized access, scrape content in violation of law, introduce malware, or use the site for unlawful purposes. We may suspend or restrict access for conduct that violates these Terms.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>14. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws applicable to Logisol&apos;s primary place of business for the relevant engagement, without regard to conflict-of-law principles. Disputes should first be addressed in good faith through negotiation. If unresolved, disputes shall be submitted to the courts or arbitration forums agreed in the applicable Agreement, or otherwise to a competent court with jurisdiction over Logisol.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>15. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The &quot;Last updated&quot; date reflects the latest revision. For ongoing projects, material changes will not retroactively alter an existing signed Agreement unless both parties agree in writing. Continued use of our website after updates constitutes acceptance of the revised Terms for website use.
            </p>
          </div>

          <div>
            <h2 className={`${headingFont.className} text-2xl md:text-3xl text-cyan-400 mb-3`}>16. Contact</h2>
            <p className="mb-3">Questions about these Terms may be directed to:</p>
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
                <span className="text-white font-medium">Related:</span>{' '}
                <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">Privacy Policy</Link>
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
