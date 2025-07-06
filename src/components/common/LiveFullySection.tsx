"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LiveFullySection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            LIVE EVERY SECOND OF YOUR STAY TO THE FULLEST
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to create unforgettable memories in Morocco? Our dedicated team is here to ensure every moment of your stay exceeds your expectations.
          </p>
          <p className="text-lg text-white/80 mb-12">
            Need assistance or have questions? We're just a message away.
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Link
                href="/contact"
                className="flex flex-col items-center justify-center p-6 h-full min-h-[200px] bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <div className="w-12 h-12 bg-accent-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-neutral-800" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Send us a message</h3>
                <p className="text-white/80 text-sm text-center">Get personalized assistance for your stay</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <a
                href="https://wa.me/212774214018"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 h-full min-h-[200px] bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">WhatsApp</h3>
                <p className="text-white/80 text-sm text-center">Instant support 24/7</p>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <a
                href="mailto:hello@daralkhayma.com"
                className="flex flex-col items-center justify-center p-6 h-full min-h-[200px] bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Email</h3>
                <p className="text-white/80 text-sm text-center">Detailed inquiries welcome</p>
              </a>
            </motion.div>
          </div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-accent-500 hover:bg-accent-600 text-neutral-800 font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-accent-500/25 transform hover:-translate-y-1"
            >
              Start Your Journey Today
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
