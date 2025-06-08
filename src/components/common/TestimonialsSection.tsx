"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Morocco exceeded all expectations! The riad in Marrakech was absolutely stunning, and the local insights from Dar Al Khayma made our trip unforgettable. Every detail was perfect.",
    property: "Traditional Riad in Marrakech Medina"
  },
  {
    id: 2,
    name: "Marco Rodriguez",
    location: "Barcelona, Spain", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "The villa in Essaouira was a dream come true. Waking up to ocean views every morning and experiencing authentic Moroccan hospitality - it&apos;s an experience we&apos;ll treasure forever.",
    property: "Ocean View Villa in Essaouira"
  },
  {
    id: 3,
    name: "Amélie Dubois",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "From booking to checkout, everything was seamless. The property in Fez was exactly as described, and the cultural experiences recommended by the local team were incredible.",
    property: "Historic House in Fez Medina"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Outstanding service and incredible properties. The attention to detail and local knowledge provided by Dar Al Khayma made our Moroccan adventure truly special.",
    property: "Luxury Apartment in Casablanca"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
            What Our Guests
            <span className="block text-primary-600">Are Saying</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Real experiences from travelers who discovered Morocco&apos;s magic through our curated properties.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Content */}
                      <div>
                        <Quote className="w-12 h-12 text-primary-200 mb-6" />
                        
                        {/* Rating */}
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        {/* Testimonial Text */}                        <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 font-medium">
                          &ldquo;{testimonial.text}&rdquo;
                        </blockquote>

                        {/* Property Info */}
                        <div className="text-sm text-primary-600 font-medium mb-4">
                          Stayed at: {testimonial.property}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-800">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-neutral-600">
                              {testimonial.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Element */}
                      <div className="hidden lg:flex items-center justify-center">
                        <div className="relative w-80 h-80 rounded-3xl overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Morocco experience"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-neutral-600 mb-6">
            Ready to create your own unforgettable Morocco experience?
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book Your Stay
          </button>
        </motion.div>
      </div>
    </section>
  );
}
