"use client";

import { motion } from "framer-motion";
import { Star, Quote, Home } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Review } from "@/types/sanity";
import { ELEGANT_PLACEHOLDER } from "@/lib/imagePlaceholders";

interface PropertyOwnerTestimonialsProps {
  title?: string;
  subtitle?: string;
  className?: string;
  limit?: number;
}

export default function PropertyOwnerTestimonials({ 
  title = "Property Owner Success Stories", 
  subtitle = "What our property partners say about working with us",
  className = "",
  limit = 6
}: PropertyOwnerTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerTestimonials = async () => {
      try {
        const response = await fetch(`/api/reviews?type=property-owner&limit=${limit}`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          // Fallback to hardcoded property owner testimonials
          setTestimonials([
            {
              id: "owner-1",
              name: "Fatima Al-Zahra",
              location: "Marrakech, Morocco",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              rating: 5,
              text: "Joining Dar Al Khayma was the best decision for my riad. The professional service and premium guests have exceeded my expectations. My revenue increased by 65% in the first year.",
              property: "Traditional Riad",
              source: "Property Owner",
              reviewType: "property-owner",
              propertyOwned: "Traditional Riad in Medina",
              ownershipDuration: "2 years partnership"
            },
            {
              id: "owner-2",
              name: "Hassan Benali",
              location: "Casablanca, Morocco",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              rating: 5,
              text: "The team's attention to detail and guest care has been exceptional. My property is always well-maintained and guests leave glowing reviews. Our occupancy rate reached 80%.",
              property: "Modern Villa",
              source: "Property Owner",
              reviewType: "property-owner",
              propertyOwned: "Modern Villa in Anfa",
              ownershipDuration: "1.5 years partnership"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching property owner testimonials:', error);
        // Set fallback testimonials
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerTestimonials();
  }, [limit]);

  if (loading) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-neutral-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-neutral-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-neutral-200 rounded-full mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-16 bg-neutral-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Home className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              {title}
            </h2>
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={testimonial.avatar || ELEGANT_PLACEHOLDER}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-primary-600">Property Owner</p>
                  <p className="text-sm text-neutral-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-neutral-700 leading-relaxed mb-6">
                <Quote className="w-6 h-6 text-primary-200 mb-2" />
                {testimonial.text}
              </blockquote>
              
              <div className="space-y-3 pt-6 border-t border-neutral-100">
                {testimonial.propertyOwned && (
                  <div className="flex items-center text-sm">
                    <Home className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="font-medium text-neutral-900">Property:</span>
                    <span className="text-neutral-600 ml-2">{testimonial.propertyOwned}</span>
                  </div>
                )}
                {testimonial.ownershipDuration && (
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="font-medium text-neutral-900">Partnership:</span>
                    <span className="text-neutral-600 ml-2">{testimonial.ownershipDuration}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
