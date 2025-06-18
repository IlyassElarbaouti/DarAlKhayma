"use client";

import { motion } from "framer-motion";
import { Award, Users, Camera, ExternalLink } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Quality ",
    description: "Professionally curated homes, styled and maintained to perfection",
    detail: "What you see is what you get — no surprises Every detail checked for design, comfort, and location."
  },
  {
    icon: Users,
    title: "PROPERTIES WITH SIGNATURE", 
    description: "Distinctive design, unified by the Dar Al Khayma aesthetic",
    detail: "Fully equipped  — no extras needed Everything ready for a seamless stay."
  },
  {
    icon: Camera,
    title: "EQUIPEMENT",
    description: "Hand-selected homes with exacting standards",
    detail: "What you see is what you get — no surprises Every detail checked for design, comfort, and location"
  },
  {
    icon: ExternalLink,
    title: "Trusted Partners",
    description: "Seamless booking through Airbnb, Booking.com",
    detail: "Book with confidence through established platforms with secure payment and guest protection."
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
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
            Why Choose
            <span className="block text-primary-600">Dar Al Khayma?</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            At Dar Al Khayma we take care to select each of our homes according to high standards of quality and design to ensure a unique stay in any property and any destination where we are present.


          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-center p-6 rounded-2xl hover:bg-neutral-50 transition-all duration-300 hover:shadow-lg">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {feature.description}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Premium Properties</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Guest Satisfaction</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Local Support</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-neutral-600 mb-6">
            Ready to experience Morocco like never before?
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-neutral-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
