"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Send, 
  MessageCircle,
  Building,
  Camera,
  CheckCircle,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  // Property application fields
  propertyType?: string;
  location?: string;
  bedrooms?: string;
  propertyDescription?: string;
  currentlyRenting?: string;
  expectedRevenue?: string;
  propertySize?: string;
  amenities?: string[];
}

const inquiryTypes = [
  { id: "general", label: "General Inquiry", icon: MessageCircle },
  { id: "booking", label: "Booking Support", icon: Phone },
  { id: "property-application", label: "List My Property", icon: Building },
  { id: "media", label: "Press & Media", icon: Camera },
];

const propertyTypes = [
  { value: "riad", label: "Traditional Riad" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "resort", label: "Resort/Hotel" },
  { value: "other", label: "Other" }
];

const bedroomOptions = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5 Bedrooms" },
  { value: "6+", label: "6+ Bedrooms" }
];

const availableAmenities = [
  "Wi-Fi", "Pool", "Air Conditioning", "Kitchen", "Parking", "Garden", 
  "Terrace", "Fireplace", "Gym", "Spa", "Concierge", "Cleaning Service"
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    propertyType: "",
    location: "",
    bedrooms: "",
    propertyDescription: "",
    currentlyRenting: "",
    expectedRevenue: "",
    propertySize: "",
    amenities: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if coming from property application
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'property-application') {
      setFormData(prev => ({ ...prev, inquiryType: 'property-application' }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            inquiryType: "general",
            propertyType: "",
            location: "",
            bedrooms: "",
            propertyDescription: "",
            currentlyRenting: "",
            expectedRevenue: "",
            propertySize: "",
            amenities: []
          });
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (you could show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPropertyApplication = formData.inquiryType === 'property-application';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <div className="order-2 lg:order-1">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-6 md:mb-8">
          {isPropertyApplication ? "Property Application" : "Send us a Message"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Inquiry Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              What can we help you with?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inquiryTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"    
                    onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.id }))}
                    className={`
                      p-3 md:p-4 border rounded-lg text-left transition-colors
                      ${formData.inquiryType === type.id
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 hover:bg-neutral-50"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-xs md:text-sm font-medium">{type.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number {isPropertyApplication ? '*' : '(Optional)'}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required={isPropertyApplication}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
              placeholder="+212 xxx xxx xxx"
            />
          </div>

          {/* Property Application Fields */}
          {isPropertyApplication && (
            <>
              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-900 mb-4 md:mb-6">Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="">Select property type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-neutral-700 mb-2">
                      Number of Bedrooms *
                    </label>
                    <select
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="">Select bedrooms</option>
                      {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                      placeholder="City, neighborhood"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="propertySize" className="block text-sm font-medium text-neutral-700 mb-2">
                      Property Size (sqm)
                    </label>
                    <input
                      type="text"
                      id="propertySize"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>

                <div className="mt-4 md:mt-6">
                  <label htmlFor="propertyDescription" className="block text-sm font-medium text-neutral-700 mb-2">
                    Property Description *
                  </label>
                  <textarea
                    id="propertyDescription"
                    name="propertyDescription"
                    value={formData.propertyDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical text-sm md:text-base"
                    placeholder="Describe your property, its unique features, amenities, and what makes it special..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                  <div>
                    <label htmlFor="currentlyRenting" className="block text-sm font-medium text-neutral-700 mb-2">
                      Currently Renting? *
                    </label>
                    <select
                      id="currentlyRenting"
                      name="currentlyRenting"
                      value={formData.currentlyRenting}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes, currently listing</option>
                      <option value="no">No, new to rental</option>
                      <option value="considering">Considering starting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="expectedRevenue" className="block text-sm font-medium text-neutral-700 mb-2">
                      Expected Monthly Revenue
                    </label>
                    <input
                      type="text"
                      id="expectedRevenue"
                      name="expectedRevenue"
                      value={formData.expectedRevenue}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., 15,000 MAD"
                    />
                  </div>
                </div>

                <div className="mt-4 md:mt-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Available Amenities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                    {availableAmenities.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.amenities?.includes(amenity) || false}
                          onChange={() => handleAmenityChange(amenity)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-xs md:text-sm text-neutral-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Subject (for non-property applications) */}
          {!isPropertyApplication && (
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                placeholder="Brief subject of your message"
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
              {isPropertyApplication ? "Additional Information" : "Message *"}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required={!isPropertyApplication}
              rows={6}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical text-sm md:text-base"
              placeholder={
                isPropertyApplication
                  ? "Any additional information about your property or questions you have..."
                  : "Tell us more about your inquiry..."
              }
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`
              w-full flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base
              ${isSubmitted
                ? "bg-green-500 text-white"
                : isSubmitting
                ? "bg-primary-400 text-white cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
              }
            `}
            whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {isPropertyApplication ? "Application Submitted!" : "Message Sent Successfully!"}
                </motion.div>
              ) : isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {isPropertyApplication ? "Submitting Application..." : "Sending Message..."}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {isPropertyApplication ? "Submit Application" : "Send Message"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </div>

      {/* Additional Info - moved to separate component props if needed */}
    </div>
  );
}
