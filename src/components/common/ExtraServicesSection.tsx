"use client";

import { motion } from "framer-motion";
import { Car, Utensils, Sparkles, ArrowRight, Shirt, Heart } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Utensils,
    title: "Acquisition of delicacies delivered to your home",
    description: "Gourmet food and local specialties delivered directly to your accommodation"
  },
  {
    icon: Car,
    title: "Transfer service",
    description: "Professional airport transfers and city transportation with bilingual drivers"
  },
  {
    icon: Sparkles,
    title: "Daily and weekly hygiene maintenance",
    description: "Professional cleaning services to keep your space pristine throughout your stay"
  },
  {
    icon: Shirt,
    title: "Professional garment care with 24-hour delivery",
    description: "Expert laundry and dry cleaning services with fast turnaround for your convenience"
  },
  {
    icon: Heart,
    title: "Wellness and health",
    description: "Access to spa treatments, massage therapy, and wellness services for your relaxation"
  }
];

export default function ExtraServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50/30">
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
            WHAT EXTRA SERVICES ARE YOU LOOKING FOR?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We help you during your stay, check our exclusive services for guests. 
            Vacation or work. Discover different ways of living in the same place.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <service.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/contact">
            <button className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              DISCOVER OUR SERVICES
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
