"use client";

import { motion } from "framer-motion";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { Shield, Eye, Lock, Globe, FileText, MessageCircle, Clock, Database } from "lucide-react";

const privacySections = [
	{
		icon: FileText,
		title: "Information We Collect",
		content: [
			"Personal Information: When you make a reservation, contact us, or use our services, we may collect personal information such as your name, email address, phone number, postal address, and payment information.",
			"Property Preferences: Information about your accommodation preferences, special requests, and travel patterns to provide personalized service.",
			"Communication Records: Records of your communications with us through phone, email, WhatsApp, or other messaging platforms.",
			"Website Usage Data: Information about how you use our website, including pages visited, time spent, and interactions with our content.",
			"Device Information: Technical information about the device and browser you use to access our services."
		]
	},
	{
		icon: Eye,
		title: "How We Use Your Information",
		content: [
			"Provide Services: To process your bookings, manage your reservations, and deliver the accommodation services you request.",
			"Customer Support: To respond to your inquiries, provide customer service, and resolve any issues you may encounter.",
			"Communication: To send you booking confirmations, updates about your reservation, and important service-related communications via WhatsApp, email, or phone.",
			"Service Improvement: To analyze usage patterns and feedback to improve our properties, services, and website functionality.",
			"Marketing: With your consent, to send you promotional offers, newsletters, and information about new properties or services.",
			"Legal Compliance: To comply with applicable laws, regulations, and legal processes."
		]
	},
	{
		icon: MessageCircle,
		title: "WhatsApp Bot Integration",
		content: [
			"Automated Responses: Our WhatsApp bot provides automated responses to common inquiries about availability, pricing, and property information.",
			"Booking Assistance: The bot can help facilitate the booking process and connect you with our human support team when needed.",
			"Message Storage: Conversations with our WhatsApp bot are stored to improve service quality and ensure continuity of support.",
			"Opt-Out: You can stop receiving WhatsApp messages from us at any time by sending 'STOP' or by contacting us directly.",
			"Human Oversight: While our bot handles routine inquiries, human staff review important conversations to ensure quality service."
		]
	},
	{
		icon: Database,
		title: "Information Sharing",
		content: [
			"Service Providers: We may share your information with trusted third-party service providers who help us operate our business, such as payment processors, property management companies, and technology service providers.",
			"Property Partners: When you book a property, we share necessary information with property owners or managers to facilitate your stay.",
			"Legal Requirements: We may disclose your information when required by law, court order, or government regulations.",
			"Business Transfers: In the event of a merger, acquisition, or sale of our business, your information may be transferred to the new entity.",
			"Consent: We may share your information with other parties when you have given us explicit consent to do so."
		]
	},
	{
		icon: Lock,
		title: "Data Security",
		content: [
			"Encryption: We use industry-standard encryption to protect your personal information during transmission and storage.",
			"Access Controls: Access to your personal information is restricted to authorized personnel who need it to provide services.",
			"Regular Audits: We regularly review and update our security practices to protect against unauthorized access, alteration, disclosure, or destruction of your information.",
			"Secure Storage: Your data is stored on secure servers with appropriate physical and digital safeguards.",
			"Incident Response: We have procedures in place to detect, respond to, and notify users of any security incidents."
		]
	},
	{
		icon: Clock,
		title: "Data Retention",
		content: [
			"Booking Records: We retain booking and payment information for accounting and legal purposes, typically for 7 years after your stay.",
			"Communication Records: Records of communications are retained for customer service purposes and may be kept for up to 3 years.",
			"Marketing Preferences: We keep records of your marketing preferences until you change them or close your account.",
			"Website Analytics: Anonymous usage data may be retained for up to 2 years for analysis and improvement purposes.",
			"Legal Requirements: Some information may be retained longer if required by applicable laws or regulations."
		]
	},
	{
		icon: Shield,
		title: "Your Rights",
		content: [
			"Access: You have the right to request access to the personal information we hold about you.",
			"Correction: You can request that we correct any inaccurate or incomplete personal information.",
			"Deletion: You may request that we delete your personal information, subject to legal and business requirements.",
			"Portability: You have the right to receive your personal information in a portable format.",
			"Objection: You can object to certain types of processing, including direct marketing.",
			"Withdraw Consent: You can withdraw your consent for processing activities that require consent at any time."
		]
	},
	{
		icon: Globe,
		title: "International Transfers",
		content: [
			"Global Services: As we operate internationally, your information may be transferred to and processed in countries other than Morocco.",
			"Adequate Protection: We ensure that any international transfers of your personal information are protected by appropriate safeguards.",
			"Third-Party Services: Some of our service providers may be located outside Morocco, and we ensure they maintain adequate data protection standards.",
			"Legal Compliance: All international transfers comply with applicable data protection laws and regulations."
		]
	}
];

export default function PrivacyPolicyPage() {

	return (
		<PageWithHeaderPadding>
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 text-white py-24 lg:py-32"
			>
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
						Privacy{" "}
						<span className="text-accent-400">Policy</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
						Your privacy is important to us. Learn how we collect, use, and protect your personal information.
					</p>
				</div>
			</motion.section>

			{/* Introduction Section */}
			<section className="py-20 lg:py-32">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="prose prose-lg max-w-none"
					>
						<div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12">
							<h2 className="text-2xl font-bold text-neutral-900 mb-6">Introduction</h2>
							<p className="text-neutral-600 leading-relaxed mb-4">
								At Dar Al Khayma, we are committed to protecting your privacy and ensuring the security of your personal information. 
								This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, 
								book our properties, or interact with our services, including our WhatsApp bot.
							</p>
							<p className="text-neutral-600 leading-relaxed mb-4">
								This policy applies to all interactions with Dar Al Khayma, including our website (dar-al-khayma.com), 
								mobile applications, WhatsApp communications, and any other services we provide.
							</p>
							<p className="text-neutral-600 leading-relaxed">
								<strong>Last Updated:</strong> September 17, 2025
							</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Privacy Sections */}
			<section className="py-20 bg-neutral-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{privacySections.map((section, index) => {
							const IconComponent = section.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
								>
									<div className="flex items-center mb-6">
										<div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mr-4">
											<IconComponent className="w-8 h-8 text-primary-600" />
										</div>
										<h3 className="font-display text-xl font-bold text-neutral-900">
											{section.title}
										</h3>
									</div>
									<ul className="space-y-3">
										{section.content.map((item, itemIndex) => (
											<li key={itemIndex} className="text-neutral-600 leading-relaxed">
												<span className="inline-block w-2 h-2 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
												{item}
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-20 lg:py-32">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
					>
						<h2 className="text-2xl font-bold text-neutral-900 mb-6">Contact Us About Privacy</h2>
						<p className="text-neutral-600 leading-relaxed mb-6">
							If you have any questions about this Privacy Policy, want to exercise your rights, 
							or have concerns about how we handle your personal information, please contact us:
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold text-neutral-900 mb-2">Email</h4>
								<p className="text-neutral-600">privacy@daralkhayma.com</p>
								<p className="text-neutral-600">hello@daralkhayma.com</p>
							</div>
							<div>
								<h4 className="font-semibold text-neutral-900 mb-2">Phone</h4>
								<p className="text-neutral-600">+212774214018</p>
							</div>
							<div>
								<h4 className="font-semibold text-neutral-900 mb-2">Address</h4>
								<p className="text-neutral-600">
									Dar Al Khayma<br />
									Agadir, Morocco
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-neutral-900 mb-2">Response Time</h4>
								<p className="text-neutral-600">We will respond to your privacy inquiries within 30 days.</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Facebook Integration Notice */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white"
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
						WhatsApp & Facebook Integration
					</h2>
					<p className="text-xl text-white/90 leading-relaxed mb-8">
						Our WhatsApp bot service is powered by Meta (Facebook) technologies. By using our WhatsApp service, 
						you acknowledge that your messages may be processed according to WhatsApp's and Meta's privacy policies 
						in addition to our own.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a 
							href="https://www.whatsapp.com/legal/privacy-policy" 
							target="_blank" 
							rel="noopener noreferrer"
							className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-colors duration-200"
						>
							WhatsApp Privacy Policy
						</a>
						<a 
							href="https://www.facebook.com/privacy/policy" 
							target="_blank" 
							rel="noopener noreferrer"
							className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-colors duration-200"
						>
							Meta Privacy Policy
						</a>
					</div>
				</div>
			</motion.section>

			{/* Policy Updates */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
					>
						<h2 className="text-2xl font-bold text-neutral-900 mb-6">Policy Updates</h2>
						<p className="text-neutral-600 leading-relaxed mb-4">
							We may update this Privacy Policy from time to time to reflect changes in our practices, 
							technology, legal requirements, or other factors. We will notify you of any material changes by:
						</p>
						<ul className="space-y-2 mb-6">
							<li className="text-neutral-600 leading-relaxed">
								<span className="inline-block w-2 h-2 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
								Posting the updated policy on our website
							</li>
							<li className="text-neutral-600 leading-relaxed">
								<span className="inline-block w-2 h-2 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
								Sending an email notification to registered users
							</li>
							<li className="text-neutral-600 leading-relaxed">
								<span className="inline-block w-2 h-2 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
								Displaying a notice on our website or app
							</li>
						</ul>
						<p className="text-neutral-600 leading-relaxed">
							Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
						</p>
					</motion.div>
				</div>
			</section>
		</PageWithHeaderPadding>
	);
}