"use client";

import { motion } from "framer-motion";
import { Award, Wrench, MapPin, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "QUALITY",
    description: "Each property meets rigorous standards for quality, design and attention to detail",
    detail: "Each property at Dar Al Khayma is selected, designed, executed and cared for with great dedication and professionalism. We continually strive to ensure that the furnishings are as shown in the photographs and that the inventory is fully complete, which is why we have a team dedicated exclusively to this. All our houses are selected and meet minimum standards in quality, features and area."
  },
  {
    icon: Clock,
    title: "24/7 SERVICE", 
    description: "Round-the-clock support to make your stay unforgettable",
    detail: "We welcome you to our cities, we receive you in your accommodation and we offer you everything you need to make you feel comfortable during your stay. If you need additional services, no matter the time or day, let us know and we will make it happen. We want your stay to be unforgettable, so you can complete your experience with our additional services."
  },
  {
    icon: Wrench,
    title: "EQUIPMENT",
    description: "High quality amenities and fully equipped kitchens for a seamless stay",
    detail: "All our houses are provided with high quality, high thread count cotton sheets and towels, as well as a set of bathroom amenities courtesy of Dar Al Khayma. In addition, the kitchens of our apartments come with a complete inventory with everything you need to have a stay without the need to purchase any additional utensils."
  },
  {
    icon: Star,
    title: "PROPERTIES WITH SIGNATURE",
    description: "Each home designed by our team with the distinctive Dar Al Khayma style",
    detail: "Each of our houses bears the Dar Al Khayma stamp and style, that is, it has been designed by our team of interior designers. They all follow the same line, but each one has its own personality. In this way, we ensure that the quality and aesthetics from one apartment to another is very similar so you can book any property without lowering the design or quality."
  },
  {
    icon: MapPin,
    title: "UNIQUE LOCATIONS",
    description: "Premium properties in the best urban locations across Morocco",
    detail: "We offer you the best destinations, urban and in the best locations, either to enjoy a vacation or to rest in a fully equipped stay when traveling for work, as we also offer corporate rentals for short or long stays."
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

        {/* Features - Accordion Style */}
        <div className="max-w-4xl mx-auto space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-neutral-200 rounded-2xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-xl text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-primary-300 to-transparent flex-1"></div>
                  </div>
                  
                  <p className="text-primary-600 font-medium mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="bg-neutral-50 rounded-lg p-4 border-l-4 border-primary-200">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                </div>
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
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">+5</div>
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
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            JOIN THE DAR AL KHAYMA CLUB
          </h3>
          <p className="text-lg text-neutral-600 mb-8">
            Unlock exclusive benefits and become part of our luxury hospitality community. 
            Experience curated properties, personalized service, and insider access to Morocco's finest accommodations.
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-neutral-800 px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Join The Club
          </button>
        </motion.div>
      </div>
    </section>
  );
}
