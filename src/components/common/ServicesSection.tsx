"use client";

import { motion } from "framer-motion";
import { Building, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            More Than Just Bookings
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We offer comprehensive solutions for both business travelers and property owners 
            across Morocco's luxury accommodation market.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Corporate Services */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link href="/corporate">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full">
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Building className="w-8 h-8 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-neutral-800 mb-3">
                        Corporate Rentals
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        Extended stays, business travel, and corporate housing solutions 
                        with professional service and flexible terms.
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                      Extended stay packages
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                      Team accommodations
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                      Business services included
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-semibold">
                      Learn More
                    </span>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Property Owner Services */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link href="/join-us">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full">
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Home className="w-8 h-8 text-accent-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-neutral-800 mb-3">
                        List Your Property
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        Join Morocco's premier luxury rental platform. Professional 
                        marketing, management, and maximum revenue potential.
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3" />
                      Professional photography
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3" />
                      Global marketing reach
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3" />
                      Full property management
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-accent-600 font-semibold">
                      Get Started
                    </span>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-accent-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6">
            Have questions about our services? We're here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-neutral-800 hover:bg-neutral-900 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Our Team
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
