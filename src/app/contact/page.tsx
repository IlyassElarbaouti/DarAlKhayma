"use client";

import { useState } from "react";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Building,
  Camera,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const inquiryTypes = [
  { id: "general", label: "General Inquiry", icon: MessageCircle },
  { id: "booking", label: "Booking Support", icon: Phone },
  { id: "partnership", label: "Property Partnership", icon: Building },
  { id: "media", label: "Press & Media", icon: Camera },
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@daralkhayma.com",
    description: "Send us a message anytime"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+212 524 123 456",
    description: "Mon-Fri, 9:00 AM - 6:00 PM (GMT+1)"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Marrakech, Morocco",
    description: "Gueliz District, Avenue Mohammed VI"
  },
  {
    icon: Clock,
    title: "Response Time",
    details: "Within 24 hours",
    description: "We typically respond quickly"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
    }, 3000);
  };
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
                Get in Touch
              </h1>              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Have questions about our properties or need assistance with your booking? 
                We&apos;re here to help make your Moroccan experience unforgettable.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                      {info.title}
                    </h3>
                    <div className="text-primary-600 font-medium mb-2">
                      {info.details}
                    </div>
                    <p className="text-neutral-600 text-sm">
                      {info.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.id }))}
                            className={`
                              p-4 border rounded-lg text-left transition-colors
                              ${formData.inquiryType === type.id
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-neutral-200 hover:bg-neutral-50"
                              }
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5" />
                              <span className="text-sm font-medium">{type.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                        className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
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
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`
                      w-full flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all duration-200
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
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent Successfully!
                        </motion.div>
                      ) : isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Message...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        How do I book a property?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Browse our properties and click on the booking links to reserve through 
                        our trusted partners like Airbnb or Booking.com.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">                      <h4 className="font-semibold text-neutral-900 mb-2">
                        Can I list my property?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Yes! We&apos;re always looking for exceptional properties. Contact us with 
                        details about your property and we&apos;ll review it for inclusion.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        Do you offer local recommendations?
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Absolutely! Our local team can provide personalized recommendations 
                        for restaurants, activities, and hidden gems in each destination.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-2xl">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    For urgent booking questions or assistance, our team is available 
                    via phone during business hours.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-600">+212 524 123 456</span>
                  </div>
                </div>
              </div>
            </div>        </div>
        </div>
    </PageWithHeaderPadding>
  );
}
