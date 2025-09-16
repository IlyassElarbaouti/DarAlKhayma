"use client";

import { PageWithHeaderPadding } from "@/components/layout/PageLayout";

export default function PrivacyPage() {
  return (
    <PageWithHeaderPadding>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Privacy Policy
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              
              <section>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Dar Al Khayma, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, 
                  book our properties, or interact with our services, including our WhatsApp bot.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Last Updated:</strong> September 17, 2025
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Personal Information: Name, email, phone number, postal address, and payment information</li>
                  <li>• Property Preferences: Accommodation preferences, special requests, and travel patterns</li>
                  <li>• Communication Records: Records of communications through phone, email, WhatsApp, or other messaging platforms</li>
                  <li>• Website Usage Data: Information about how you use our website</li>
                  <li>• Device Information: Technical information about your device and browser</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Provide Services: Process bookings, manage reservations, and deliver accommodation services</li>
                  <li>• Customer Support: Respond to inquiries and provide customer service</li>
                  <li>• Communication: Send booking confirmations, updates, and service-related communications</li>
                  <li>• Service Improvement: Analyze usage patterns to improve our properties and services</li>
                  <li>• Marketing: With your consent, send promotional offers and newsletters</li>
                  <li>• Legal Compliance: Comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp Bot Integration</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automated Responses: Our WhatsApp bot provides automated responses to common inquiries</li>
                  <li>• Booking Assistance: The bot helps facilitate the booking process</li>
                  <li>• Message Storage: Conversations are stored to improve service quality</li>
                  <li>• Opt-Out: You can stop receiving WhatsApp messages by sending STOP</li>
                  <li>• Human Oversight: Human staff review important conversations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Encryption: We use industry-standard encryption to protect your information</li>
                  <li>• Access Controls: Access is restricted to authorized personnel only</li>
                  <li>• Regular Audits: We regularly review and update our security practices</li>
                  <li>• Secure Storage: Data is stored on secure servers with appropriate safeguards</li>
                  <li>• Incident Response: We have procedures to detect and respond to security incidents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Access: Request access to your personal information</li>
                  <li>• Correction: Request correction of inaccurate information</li>
                  <li>• Deletion: Request deletion of your personal information</li>
                  <li>• Portability: Receive your personal information in a portable format</li>
                  <li>• Objection: Object to certain types of processing</li>
                  <li>• Withdraw Consent: Withdraw consent for processing activities</li>
                </ul>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp & Facebook Integration</h2>
                <p className="text-gray-600 mb-4">
                  Our WhatsApp bot service is powered by Meta (Facebook) technologies. By using our WhatsApp service, 
                  you acknowledge that your messages may be processed according to WhatsApp and Meta privacy policies 
                  in addition to our own.
                </p>
                <div className="space-x-4">
                  <a 
                    href="https://www.whatsapp.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    WhatsApp Privacy Policy
                  </a>
                  <a 
                    href="https://www.facebook.com/privacy/policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Meta Privacy Policy
                  </a>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p><strong>Email:</strong> privacy@daralkhayma.com</p>
                    <p><strong>Email:</strong> hello@daralkhayma.com</p>
                  </div>
                  <div>
                    <p><strong>Phone:</strong> +212774214018</p>
                    <p><strong>Address:</strong> Dar Al Khayma, Agadir, Morocco</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                  posting the updated policy on our website, sending email notifications, or displaying notices on our website. 
                  Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}