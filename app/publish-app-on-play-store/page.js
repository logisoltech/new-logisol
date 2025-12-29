'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../Components/UI/Navbar';
import { headingFont } from '../Components/Font/headingFont';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';

const Page = () => {
  const [activeSection, setActiveSection] = useState('why-publish');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['why-publish', 'prerequisites', 'pre-submission', 'apk-vs-aab', 'why-matters', 'step-by-step', 'step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6', 'step-7', 'step-8', 'post-publishing', 'managing-updates', 'responding-reviews', 'advanced-aso', 'troubleshooting', 'rejection-reasons', 'avoid-rejection', 'conclusion'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="text-white relative">
      <Navbar />

      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full px-4`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          HOW TO PUBLISH AN APP ON <span className="text-cyan-400">PLAY STORE</span>
        </h1>
        
        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
          <img src="/clutch.png" alt="Clutch" className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/google_1.png" alt="Google" className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/trust.png" alt="Trust" className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Blog Content Section */}
      <section id="blog-content" className="w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* Main Content - Left Column */}
            <div className="flex-1 lg:w-2/3">
              <div className="space-y-12">
                
                {/* Why Publish on Google Play Section */}
                <div id="why-publish" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    Why Publish on Google Play?
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    Are you an <Link href="/mobile-application-development-services" className="text-cyan-400 hover:text-cyan-300 underline">Android developer or entrepreneur</Link> facing the daunting task of launching your app on Google Play? The process may look intimidating navigating the evolving Google Play Console, meeting detailed asset requirements like screenshots and feature graphics, and ensuring strict compliance with Google&apos;s developer policies. On top of that, there&apos;s always the lingering fear of app rejection, delays, or getting lost in the sea of millions of apps already competing for attention.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    The truth is, you are not alone. Many developers struggle at this stage, not because they lack coding skills, but because the distribution side has its own set of rules and challenges. From generating a signed app bundle to setting up optimized store listings, the details can easily become overwhelming if you don&apos;t have a clear path to follow.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    This <Link href="/about-us" className="text-cyan-400 hover:text-cyan-300 underline">guide from Logisol Technologies</Link> is designed to solve that problem. Think of it as your roadmap breaking down the publishing process into clear, step-by-step actions. We&apos;ll cover everything from setting up your Google Play Developer account to optimizing your listing with ASO best practices and preparing for long-term success after launch.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                    By the end of this guide, you&apos;ll know exactly how to publish an app on Google Play, how to avoid common mistakes, and how to give your app the best possible chance to thrive. Whether you&apos;re an indie developer, a small business owner, or a project manager, you&apos;ll find actionable insights here to take your Android app from code to console with confidence.
                  </p>
                </div>

                {/* Prerequisites Section */}
                <div id="prerequisites" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    Prerequisites for Publishing Your Android App
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-6">
                    Before you step into the Google Play Console, it&apos;s important to have all the essential pieces in place. Many developers overlook these requirements, which leads to unnecessary delays or even rejection during the review process. By preparing everything in advance, you&apos;ll set yourself up for a smoother publishing experience.
                  </p>

                  {/* 1.1 Essential Pre-Submission Requirements */}
                  <div id="pre-submission" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-white mb-4`}>
                      1.1 Essential Pre-Submission Requirements
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>Google Developer Account</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          The first step is registering for a Google Play Developer account. This is mandatory for every app submission and comes with a one-time fee of $25. The account requires identity verification, which can take a few days. Many developers find this stage confusing, but once completed, it unlocks access to the full publishing dashboard.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>Signed App Bundle (AAB)</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          Google now requires Android App Bundles (AABs) instead of the traditional APK format. This change optimizes app delivery and reduces file sizes for users. According to Android Developers, AABs are the modern standard, so ensure your app is compiled and signed correctly before uploading.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>Unique Package Name</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          Every app on Google Play needs a globally unique package name. Once published, this identifier cannot be changed, so choose carefully to represent your app&apos;s brand.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>App Icon</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          Your icon is the face of your application. Google Play requires high-resolution icons that meet their design guidelines. A clean, polished icon improves first impressions and supports <Link href="/seo-services-and-strategy" className="text-cyan-400 hover:text-cyan-300 underline">App Store Optimization (ASO)</Link>.
                        </p>
                      </div>
                      
                      <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 my-4">
                        <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                        <p className="text-white/90 text-base leading-relaxed">
                          Prioritize <Link href="/graphics-designing-services" className="text-cyan-400 hover:text-cyan-300 underline">high-quality screenshots, feature graphics</Link>, and a standout app icon. These visual elements often decide whether a user installs your app or scrolls past.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>Privacy Policy URL</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          Google Play requires a privacy policy link for most apps, even those that don&apos;t collect sensitive data. This reassures users and ensures policy compliance.
                        </p>
                      </div>
                      
                      <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 my-4">
                        <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                        <p className="text-white/90 text-base leading-relaxed">
                          Use tools like Termly or iubenda to quickly generate a professional privacy policy tailored to your app.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-cyan-400 font-semibold text-lg mb-2"><strong>Developer Contact Information</strong></p>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                          Google requires you to provide a valid email address. Adding a phone number or website is optional but highly recommended, as it enhances trustworthiness and credibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 1.2 Key Differences: APK vs. AAB */}
                  <div id="apk-vs-aab" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-white mb-4`}>
                      1.2 Key Differences: <span className="text-cyan-400">APK vs. AAB (App Bundle)</span>
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      One of the most common points of confusion for developers preparing their app for release is the difference between APKs and App Bundles (AABs). Since August 2021, Google has made App Bundles the required publishing format for all new apps, making it essential for every developer to understand this shift.
                    </p>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-6">
                      Here&apos;s a clear comparison to help you see why AABs are now the preferred standard:
                    </p>
                    
                    {/* APK vs AAB Table */}
                    <div className="overflow-x-auto mb-6">
                      <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-white/10 border-b border-white/20">
                              <th className="text-left text-white font-bold text-sm md:text-base p-4 border-r border-white/20">Feature</th>
                              <th className="text-left text-white font-bold text-sm md:text-base p-4 border-r border-white/20">APK</th>
                              <th className="text-left text-white font-bold text-sm md:text-base p-4">Android App Bundle (AAB)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">File Structure</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">A single file containing all code, resources, and assets for every device configuration.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">A publishing format that includes compiled code and resources, while Google Play generates optimized APKs for each device configuration.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Device Optimization</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Carries all resources (screen densities, CPU architectures, languages), leading to bloated file sizes.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Delivers only what&apos;s needed for a user&apos;s device (e.g., specific screen density or language), making installs lighter and faster.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Download Size</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Larger, as unnecessary resources are included.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Smaller and optimized downloads improve installation success rates and reduce early uninstalls.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Asset Delivery</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">All assets bundled together.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Supports <strong>Play Asset Delivery</strong>, allowing assets to be downloaded dynamically based on user needs.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Module Support</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Limited to static modules.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Supports <strong>dynamic feature modules</strong>, so you can deliver features conditionally or on demand.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Mandatory Status</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Deprecated for new apps since mid-2021. Only used for older apps that haven&apos;t migrated.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top"><strong>Required for all new apps</strong> submitted to Google Play since August 2021.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Signing</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Developer signs the APK before upload.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Developer uploads the AAB, and Google Play signs the optimized APKs via <strong>Play App Signing</strong>, offering better key security.</td>
                            </tr>
                            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Ease of Updates</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Requires a full new APK upload for every update.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Uploading a new AAB is easier; Google Play handles optimized delivery automatically.</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                              <td className="text-cyan-400 font-semibold text-sm md:text-base p-4 border-r border-white/20 align-top">Future-Proofing</td>
                              <td className="text-white/90 text-sm md:text-base p-4 border-r border-white/20 align-top">Not future-focused; Google&apos;s support is shifting away.</td>
                              <td className="text-white/90 text-sm md:text-base p-4 align-top">Fully future-proof, aligned with Google&apos;s long-term plans for app distribution.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Why This Matters */}
                  <div id="why-matters" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-white mb-4`}>
                      Why This Matters
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Switching to AABs isn&apos;t just a Google requirement—it&apos;s a smarter way to distribute your app. For developers, it simplifies the build process and improves key management security. For users, smaller downloads mean faster installations, reduced storage use, and a better overall experience.
                    </p>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        If you&apos;re still building APKs, migrate your project to App Bundles as soon as possible. Google&apos;s official documentation provides clear steps for making the switch.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Guide Section */}
                <div id="step-by-step" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    2. Step-by-Step Guide to Publishing
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-8">
                    Publishing an Android app on Google Play might seem like a long process, but when broken down step by step, it becomes manageable and structured. Below is a clear guide that addresses common developer pain points, while ensuring you follow Google&apos;s official policies and best practices.
                  </p>

                  {/* Step 1 */}
                  <div id="step-1" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.1 Step 1: Create a Google Play Developer Account
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      To begin, you need a Google Play Developer account. Navigate to the Google Play Console, sign in with your Google account, and accept the Developer Distribution Agreement.
                    </p>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      There is a one-time registration fee of $25, which gives you access to publish and manage apps indefinitely. This fee exists to maintain the platform and reduce spam submissions. Once you&apos;ve paid, you&apos;ll need to complete identity verification, which may take a few days.
                    </p>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Don&apos;t wait until your app is finished to create the account. Register early, explore the console, and familiarize yourself with the interface. It will save you time later when your app is ready to upload.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div id="step-2" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.2 Step 2: Prepare Your App for Release
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Before uploading, your app must be technically ready and fully compliant.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Generate a Signed App Bundle (AAB):</strong> <Link href="/mobile-application-development-services" className="text-cyan-400 hover:text-cyan-300 underline">Use Android Studio to create</Link> a release build. App Bundles are now mandatory for new apps.</li>
                      <li><strong className="text-cyan-400">Manage Keystores:</strong> Create and securely store your keystore and password. Losing this means you cannot update your app. Tools like Keystore Explorer can simplify management.</li>
                      <li><strong className="text-cyan-400">Set Version Codes and Names:</strong> The versionCode must always increase with each update, while the versionName is what users see (e.g., &quot;1.0.0&quot;).</li>
                      <li><strong className="text-cyan-400">Ensure App Quality:</strong> Test your app on multiple devices and Android versions. Bugs, crashes, or performance issues often lead to bad reviews or rejections.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Follow Google&apos;s Core App Quality guidelines to meet minimum performance standards and improve your app&apos;s approval chances.
                      </p>
                    </div>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      <strong className="text-cyan-400">Quick Checklist for Readiness:</strong> Signed AAB generated ✓ Keystore secured ✓ Versioning set correctly ✓ Tested across devices ✓
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div id="step-3" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.3 Step 3: Navigating the Google Play Console
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      The Google Play Console is your central hub for everything related to publishing and managing your app. Developers often find its evolving interface confusing, but understanding the basics makes it easier.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Dashboard Overview:</strong> Key sections include Dashboard, Store Presence, Release, Policy, and Statistics.</li>
                      <li><strong className="text-cyan-400">Create a New App Listing:</strong> Provide your app&apos;s name, default language, type (app or game), which can spark <Link href="/mobile-application-development-services" className="text-cyan-400 hover:text-cyan-300 underline">new game development ideas</Link>, and pricing model (free or paid). You&apos;ll also confirm that you accept the Developer Program Policies.</li>
                    </ul>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      This is your starting point for building your store listing and uploading your app.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div id="step-4" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.4 Step 4: Set Up Your Store Listing (ASO)
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Your store listing is your storefront, and optimizing it can make the difference between success and invisibility.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">App Title:</strong> Keep it descriptive, unique, and under 30 characters.</li>
                      <li><strong className="text-cyan-400">Short Description:</strong> A crisp summary of your app&apos;s core feature (max 80 characters).</li>
                      <li><strong className="text-cyan-400">Full Description:</strong> Up to 4,000 characters to explain features, benefits, and use cases. Aim for storytelling and problem-solving rather than just a feature list.</li>
                      <li><strong className="text-cyan-400">Visual Assets:</strong> Upload a polished app icon, feature graphic, and 2–8 screenshots.</li>
                      <li><strong className="text-cyan-400">Optional Video:</strong> Add a YouTube link to <Link href="/professional-video-editing-services" className="text-cyan-400 hover:text-cyan-300 underline">showcase your app in action</Link>.</li>
                      <li><strong className="text-cyan-400">Localization:</strong> Translate your listing to reach international audiences.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Optimize your listing with keywords naturally placed in the title and description, but prioritize readability and user value. Tools like AppTweak or Sensor Tower can help refine your App Store Optimization (ASO).
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div id="step-5" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.5 Step 5: Upload Your App Bundle (AAB)
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Now it&apos;s time to upload your signed App Bundle.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Select a Release Track:</strong>
                        <ul className="ml-6 mt-2 space-y-2 list-disc list-inside">
                          <li>Internal Testing: For small trusted teams.</li>
                          <li>Closed Testing: For a larger controlled group.</li>
                          <li>Open Testing: A public beta available to anyone.</li>
                          <li>Production: Your official live release.</li>
                        </ul>
                      </li>
                      <li><strong className="text-cyan-400">Upload the AAB:</strong> Use the upload button in your chosen track.</li>
                      <li><strong className="text-cyan-400">Add Release Notes:</strong> Briefly describe what&apos;s new or what the release contains.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Make use of release tracks strategically. Testing tracks help you identify bugs and gather feedback before going into production.
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div id="step-6" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.6 Step 6: Content Rating & Target Audience
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Google Play requires every app to go through a content rating questionnaire. You&apos;ll be asked about the presence of violence, language, or mature themes. Based on your responses, you&apos;ll receive an official rating from the International Age Rating Coalition (IARC).
                    </p>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Next, define your target audience by selecting an appropriate age group (e.g., 3+, 7+, 12+, 16+, or 18+). This step ensures that your app is discoverable by the right users.
                    </p>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      You&apos;ll also need to complete the <strong>Data Safety section</strong>, disclosing how your app collects, shares, or protects user data.
                    </p>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Consideration:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Always review Google Play&apos;s official content policy and Data Safety guidelines to avoid rejection.
                      </p>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div id="step-7" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.7 Step 7: Pricing & Distribution
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      This is where you decide how your app will be available.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">App Price:</strong> Choose &quot;Free&quot; or &quot;Paid.&quot; Paid apps are subject to Google&apos;s transaction fees.</li>
                      <li><strong className="text-cyan-400">Country Availability:</strong> Select the countries where your app will appear. Consider legal and regional differences before launching globally.</li>
                      <li><strong className="text-cyan-400">Device Compatibility:</strong> Confirm which devices can run your app based on its manifest.</li>
                      <li><strong className="text-cyan-400">Optional Play Pass:</strong> Enroll to expand reach through Google&apos;s subscription program.</li>
                    </ul>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      Different app types (like games vs. utility apps) may require different pricing and distribution strategies. Think carefully about where and how your app should appear.
                    </p>
                  </div>

                  {/* Step 8 */}
                  <div id="step-8" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      2.8 Step 8: Review and Roll Out Your Release
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Before hitting publish, double-check that everything is complete.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Final Checklist:</strong> Store listing, content rating, AAB upload, and distribution settings should all be in place.</li>
                      <li><strong className="text-cyan-400">Review Process:</strong> Google uses automated systems and human reviewers. Reviews typically take a few hours to a few days, depending on complexity.</li>
                      <li><strong className="text-cyan-400">Rollout:</strong> Launch directly to production or use a phased rollout, which gradually makes your app available to a percentage of users. This helps catch last-minute issues before full deployment.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Always keep track of your publishing progress with a checklist to avoid missing critical steps.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post-Publishing Section */}
                <div id="post-publishing" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    3. Post-Publishing: <span className="text-cyan-400">What&apos;s Next for Your App?</span>
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-8">
                    Publishing your app on Google Play is a big milestone, but it&apos;s not the finish line. The real journey begins once your app is live, as you&apos;ll need to continuously improve, engage with users, and optimize for long-term growth.
                  </p>

                  {/* Managing App Updates */}
                  <div id="managing-updates" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      3.1 Managing App Updates
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Regular updates are essential for maintaining user trust and keeping your app competitive. Bug fixes, security patches, and performance improvements show users that you care about their experience. New features, on the other hand, help keep your app relevant in a fast-moving market.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Version Control:</strong> Always increment your versionCode for internal tracking, and update the versionName to reflect visible changes for users (e.g., &quot;1.1.0&quot;).</li>
                      <li><strong className="text-cyan-400">Communicating Updates:</strong> Use release notes strategically. Highlight important fixes or new features in a simple, user-friendly way.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Plan for continuous updates instead of occasional big changes. Small, consistent improvements help maintain app quality and engagement.
                      </p>
                    </div>
                  </div>

                  {/* Responding to Reviews */}
                  <div id="responding-reviews" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      3.2 Responding to Reviews and Monitoring Performance
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      User feedback is one of the most valuable assets after launch. Responding promptly and professionally to reviews—whether positive or negative—can build loyalty and show that you&apos;re committed to improvement.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Engaging with Users:</strong> A quick, helpful reply to a negative review can often turn criticism into appreciation.</li>
                      <li><strong className="text-cyan-400">Monitoring App Vitals:</strong> The Google Play Console includes a Vitals dashboard where you can track crashes, ANRs (Application Not Responding errors), and battery usage. Addressing these promptly improves ratings and retention.</li>
                      <li><strong className="text-cyan-400">Analyzing Feedback:</strong> Look for recurring themes in user reviews. These insights can guide your next updates and help prioritize features.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Monitor your app&apos;s vitals regularly. Don&apos;t wait for users to complain—identify performance issues early and fix them before they escalate.
                      </p>
                    </div>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      <strong className="text-cyan-400">Product Recommendation:</strong> Pair the Play Console with <strong>Google Analytics for Firebase</strong> to track user engagement, retention, and behavior more deeply.
                    </p>
                  </div>

                  {/* Advanced ASO Strategies */}
                  <div id="advanced-aso" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      3.3 Advanced ASO Strategies
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      App Store Optimization (ASO) doesn&apos;t stop once your app goes live, and it&apos;s a crucial aspect of <Link href="/digital-marketing-services" className="text-cyan-400 hover:text-cyan-300 underline">broader digital marketing services</Link> that ensure sustained growth. Continuous refinement is key to maintaining visibility and downloads, including leveraging <Link href="/social-media-marketing-services" className="text-cyan-400 hover:text-cyan-300 underline">social media marketing services</Link> to reach a wider audience.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Keyword Refinement:</strong> Monitor your current keywords and update them based on trends and competition.</li>
                      <li><strong className="text-cyan-400">A/B Testing:</strong> Experiment with different app icons, screenshots, or descriptions to see which versions drive better installs.</li>
                      <li><strong className="text-cyan-400">Localized ASO:</strong> Translate your store listing into different languages and adapt your keywords for regional search behaviors.</li>
                    </ul>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      Taking ASO seriously after launch ensures your app stays discoverable and competitive over time.
                    </p>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                      <strong className="text-cyan-400">Differentiation Opportunity:</strong> Treat this stage as your <strong>Post-Launch Optimization Guide</strong>—covering everything from regular updates to feedback loops and ASO adjustments. This approach sets apart successful apps from those that plateau after launch.
                    </p>
                  </div>
                </div>

                {/* Troubleshooting Section */}
                <div id="troubleshooting" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    4. Troubleshooting Common Submission Issues & Policy Compliance
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-8">
                    One of the biggest concerns developers face is the possibility of app rejection. After spending months coding and preparing, getting rejected can feel discouraging. The good news is that most rejections happen due to common mistakes, and with careful planning, they can be avoided.
                  </p>

                  {/* Common App Rejection Reasons */}
                  <div id="rejection-reasons" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      4.1 Common App Rejection Reasons
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <strong className="text-cyan-400">Policy Violations:</strong> Google enforces strict developer program policies to ensure apps remain safe and trustworthy. Rejections often occur when:
                    </p>
                    <ul className="space-y-2 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li>Apps contain spammy or duplicate content.</li>
                      <li>Branding or app names impersonate existing products.</li>
                      <li>Deceptive behavior or misleading claims appear in the listing.</li>
                      <li>User data is mishandled or privacy rules are ignored.</li>
                      <li>Ads violate placement or frequency guidelines.</li>
                      <li>Inappropriate or restricted content is included.</li>
                    </ul>
                    <div className="backdrop-blur-xl bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-4">
                      <p className="text-cyan-400 font-semibold mb-2">Expert Tip:</p>
                      <p className="text-white/90 text-base leading-relaxed">
                        Prioritize policy compliance above all else. Review the official Google Play Developer Program Policies before every submission. Pay close attention to privacy, user data, and ad guidelines.
                      </p>
                    </div>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <strong className="text-cyan-400">Technical Errors:</strong> Even small technical flaws can lead to rejection, such as:
                    </p>
                    <ul className="space-y-2 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li>Apps crashing immediately on launch.</li>
                      <li>ANR (Application Not Responding) issues.</li>
                      <li>Non-functional core features.</li>
                      <li>Incorrect API levels or outdated SDKs.</li>
                    </ul>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <strong className="text-cyan-400">Store Listing Inaccuracies:</strong> Google also rejects apps when listings misrepresent them. Examples include:
                    </p>
                    <ul className="space-y-2 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed">
                      <li>Misleading descriptions or screenshots.</li>
                      <li>Branding inconsistencies.</li>
                      <li>Content that doesn&apos;t match actual functionality.</li>
                    </ul>
                  </div>

                  {/* How to Avoid Rejection */}
                  <div id="avoid-rejection" className="scroll-mt-24 mb-8">
                    <h3 className={`${headingFont.className} font-bold text-xl md:text-2xl text-cyan-400 mb-4`}>
                      4.2 How to Avoid Rejection and Ensure Compliance
                    </h3>
                    <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      The key to avoiding rejection lies in preparation and transparency.
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                      <li><strong className="text-cyan-400">Thorough Policy Review:</strong> Regularly check the Google Play policies to ensure your app remains compliant as rules evolve.</li>
                      <li><strong className="text-cyan-400">Pre-Submission Checklist:</strong> Audit your app against guidelines before hitting publish. This is where an <strong>Interactive Google Play Publishing Checklist</strong> can save time by helping you confirm assets, policies, and technical readiness.</li>
                      <li><strong className="text-cyan-400">Clear Privacy Policy:</strong> Provide a visible and accurate privacy policy link, even if your app collects minimal data.</li>
                      <li><strong className="text-cyan-400">Transparency:</strong> Be honest about your app&apos;s purpose and features. Don&apos;t overpromise or mislead.</li>
                      <li><strong className="text-cyan-400">Rigorous Testing:</strong> Test across multiple Android versions and devices to eliminate crashes or poor performance.</li>
                      <li><strong className="text-cyan-400">Responding to Rejections:</strong> If your app is rejected, carefully read the rejection email. Fix the issues and resubmit. If you believe the rejection was in error, use the appeal process provided in the Play Console.</li>
                    </ul>
                  </div>
                </div>

                {/* Conclusion Section */}
                <div id="conclusion" className="scroll-mt-24">
                  <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-6`}>
                    Conclusion
                  </h2>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    Publishing your Android app on Google Play is more than just a final step—it&apos;s the bridge between development and real-world impact. By preparing thoroughly, complying with Google&apos;s policies, optimizing your store listing for visibility, and staying engaged with users after launch, you give your app the best chance to succeed.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    The journey may feel complex at first, but every step—from creating your developer account to rolling out updates is a valuable learning experience. With the right approach, even small teams and independent developers can compete on the same stage as large companies.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    Now is the time to take action. Use this guide as your roadmap, explore the official resources we&apos;ve referenced, and start your publishing journey with confidence. The Google Play Store is home to millions of apps, but there&apos;s always room for one more great idea—yours, perhaps an <Link href="/mobile-application-development-services" className="text-cyan-400 hover:text-cyan-300 underline">innovative app like AR Zone</Link>.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-4">
                    At <strong>Logisol Technologies</strong>, our team has <Link href="/mobile-application-development-services" className="text-cyan-400 hover:text-cyan-300 underline">years of experience in Android app development</Link> and publishing. We&apos;ve helped startups, entrepreneurs, and businesses navigate this very process, ensuring their apps not only go live but also thrive in a competitive market. You can apply the same best practices shared here to transform your app from a simple build into a successful product on the world&apos;s largest app platform.
                  </p>
                  <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                    Your code is ready, but for those seeking <Link href="/custom-web-development-services" className="text-cyan-400 hover:text-cyan-300 underline">professional custom web development services</Link>, Logisol Technologies offers comprehensive solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:w-1/3 flex-shrink-0 relative">
              <div className="space-y-6 z-10 lg:sticky lg:top-24">
                {/* In This Article Section */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">In this article</h3>
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <nav className="space-y-2 max-h-96 overflow-y-auto">
                    <a 
                      href="#why-publish" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('why-publish')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'why-publish' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      Why Publish on Google Play?
                    </a>
                    <a 
                      href="#prerequisites" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('prerequisites')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'prerequisites' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      Prerequisites for Publishing Your Android App
                    </a>
                    <a 
                      href="#pre-submission" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('pre-submission')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer pl-4 ${activeSection === 'pre-submission' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      1.1 Essential Pre-Submission Requirements
                    </a>
                    <a 
                      href="#apk-vs-aab" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('apk-vs-aab')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer pl-4 ${activeSection === 'apk-vs-aab' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      1.2 Key Differences: APK vs. AAB (App Bundle)
                    </a>
                    <a 
                      href="#why-matters" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('why-matters')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer pl-4 ${activeSection === 'why-matters' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      Why This Matters
                    </a>
                    <a 
                      href="#step-by-step" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('step-by-step')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'step-by-step' || activeSection.startsWith('step-') ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      2. Step-by-Step Guide to Publishing
                    </a>
                    <a 
                      href="#post-publishing" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('post-publishing')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'post-publishing' || activeSection === 'managing-updates' || activeSection === 'responding-reviews' || activeSection === 'advanced-aso' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      3. Post-Publishing: What&apos;s Next for Your App?
                    </a>
                    <a 
                      href="#troubleshooting" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('troubleshooting')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'troubleshooting' || activeSection === 'rejection-reasons' || activeSection === 'avoid-rejection' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      4. Troubleshooting Common Submission Issues
                    </a>
                    <a 
                      href="#conclusion" 
                      onClick={(e) => { e.preventDefault(); document.getElementById('conclusion')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`block transition-colors text-sm py-1 px-2 rounded cursor-pointer ${activeSection === 'conclusion' ? 'text-cyan-400 font-semibold bg-cyan-400/10' : 'text-white/70 hover:text-cyan-400'}`}
                    >
                      Conclusion
                    </a>
                  </nav>
                </div>

                {/* Mobile App Development CTA */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">Mobile App Development</h3>
                  <Link
                    href="/contact-us"
                    className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Component */}
      <section className="relative">
        <FAQ />
      </section>

      {/* Footer Component */}
      <Footer />
    </main>
  );
};

export default Page;
