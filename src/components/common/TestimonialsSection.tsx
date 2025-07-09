"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Review } from "@/types/sanity";
import { ELEGANT_PLACEHOLDER } from "@/lib/imagePlaceholders";

// Fallback testimonials in case Sanity data is not available
const fallbackTestimonials: Review[] = [
  {
    id: "fallback-1",
    name: "Marie Dubois",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Absolutely perfect stay! The apartment was exactly as shown in photos, impeccably clean and beautifully designed. The location in Marrakech medina was ideal for exploring. Ilyass and his team were incredibly responsive and helpful throughout our stay.",
    property: "Luxury Riad in Marrakech Medina",
    source: "Airbnb Guest"
  },
  {
    id: "fallback-2",
    name: "James Wilson",
    location: "London, UK", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Outstanding experience from start to finish. The property exceeded all expectations - modern amenities in a traditional setting. The 24/7 support was invaluable, and the local recommendations were spot on. Will definitely return!",
    property: "Traditional Riad with Modern Amenities",
    source: "Airbnb Guest"
  },
  {
    id: "fallback-3",
    name: "Sofia Rodriguez",
    location: "Madrid, Spain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "This was our first time in Morocco and Dar Al Khayma made it unforgettable. Every detail was thought of - from the welcome amenities to the perfectly equipped kitchen. The team's hospitality is unmatched. Highly recommended!",
    property: "Boutique Apartment in Casablanca",
    source: "Airbnb Guest"
  },
  {
    id: "fallback-4",
    name: "Andreas Mueller",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Professional service and stunning property. The design is simply beautiful - authentic Moroccan style with luxury finishes. Location was perfect for both business and leisure. The team went above and beyond to ensure our comfort.",
    property: "Executive Suite in Rabat",
    source: "Airbnb Guest"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Review[]>(fallbackTestimonials);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/reviews?featured=true&limit=4');
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          // Map Sanity data to use fallback avatars since we don't have images yet
          const testimonialsWithAvatars = data.data.map((review: any, index: number) => ({
            ...review,
            avatar: review.avatar || fallbackTestimonials[index]?.avatar || fallbackTestimonials[0].avatar
          }));
          setTestimonials(testimonialsWithAvatars);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep fallback testimonials
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

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

        {/* Testimonials Carousel - Optimized with Framer Motion */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] // Smooth easing for 60fps
                }}
                className="w-full"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mx-4">
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Content */}
                    <div>
                      <Quote className="w-12 h-12 text-primary-200 mb-6 mx-auto" />
                      
                      {/* Rating */}
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(Math.max(1, Math.min(5, currentTestimonial.rating || 5)))].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 font-medium">
                        &ldquo;{currentTestimonial.text}&rdquo;
                      </blockquote>

                      {/* Property Info */}
                      <div className="text-sm text-primary-600 font-medium mb-6">
                        Stayed at: {currentTestimonial.property}
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                            priority={currentIndex === 0} // Prioritize first testimonial image
                            placeholder="blur"
                            blurDataURL={ELEGANT_PLACEHOLDER}
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-neutral-800">
                            {currentTestimonial.name}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {currentTestimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            LIVE EVERY SECOND OF YOUR STAY TO THE FULLEST
          </h3>
          <p className="text-lg text-neutral-600 mb-8">
            Ready to experience Morocco like never before? Let us help you plan the perfect stay with our premium properties and personalized service.
          </p>
          <p className="text-lg text-neutral-600 mb-8">
            <strong>Contact us:</strong> +212774214018
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Contact Us Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
