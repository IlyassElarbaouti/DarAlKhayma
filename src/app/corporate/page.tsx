"use client";

import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { 
  Building, 
  Users, 
  Calendar, 
  Shield, 
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    icon: Building,
    title: "Extended Stay Solutions",
    description: "Fully furnished properties perfect for long-term business assignments, relocations, and project teams. Complete housing solutions from 1 week to permanent relocations."
  },
  {
    icon: Users,
    title: "Team Accommodations",
    description: "Multi-room properties and adjacent units to house entire teams while maintaining privacy and comfort. Ideal for corporate training programs and project teams."
  },
  {
    icon: Calendar,
    title: "Flexible Terms",
    description: "Weekly, monthly, and custom lease terms with negotiable rates for extended bookings. Adaptable contracts that meet your business timeline and budget requirements."
  },
  {
    icon: Shield,
    title: "Business Services",
    description: "High-speed internet, dedicated workspace areas, meeting facilities, and professional cleaning services. 24/7 multilingual support for all your corporate needs."
  }
];

const services = [
  {
    title: "Relocation Support",
    description: "Complete assistance for employee relocations, from property selection to settling-in services.",
    features: ["Property search assistance", "Documentation support", "Local area orientation", "Settling-in services"]
  },
  {
    title: "Business Travel Solutions",
    description: "Premium accommodations for short-term business trips with all necessary amenities.",
    features: ["Airport transfers", "Mobile workspace setup", "Concierge services", "Expense reporting"]
  },
  {
    title: "Project Housing",
    description: "Long-term housing solutions for project teams and extended business assignments.",
    features: ["Team coordination", "Group discounts", "Flexible booking terms", "On-site support"]
  },
  {
    title: "Executive Suites",
    description: "Luxury accommodations for C-level executives and VIP business guests.",
    features: ["Premium locations", "Private chef options", "Personal assistance", "Security services"]
  }
];

const packages = [
  {
    title: "Business Essential",
    description: "Perfect for individual business travelers",
    features: [
      "Luxury accommodations",
      "High-speed WiFi",
      "Workspace setup",
      "24/7 support",
      "Airport transfers"
    ],
    duration: "1-7 days",
    priceRange: "From €150/night"
  },
  {
    title: "Extended Stay",
    description: "Ideal for longer business assignments",
    features: [
      "All Essential features",
      "Weekly housekeeping",
      "Local phone line",
      "Laundry services",
      "Grocery shopping"
    ],
    duration: "1-12 weeks",
    priceRange: "From €120/night",
    popular: true
  },
  {
    title: "Corporate Housing",
    description: "Complete relocation solutions",
    features: [
      "All Extended Stay features",
      "Furniture & utilities",
      "Pet-friendly options",
      "Storage solutions",
      "Relocation assistance"
    ],
    duration: "3+ months",
    priceRange: "Custom pricing"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechGlobal Inc.",
    role: "HR Director",
    content: "Dar Al Khayma provided exceptional accommodations for our 6-month project in Casablanca. The team was professional and the properties exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Marcus Weber",
    company: "Consulting Partners",
    role: "Managing Partner",
    content: "The flexibility and quality of service made our extended stay in Marrakech seamless. Highly recommended for any corporate housing needs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const stats = [
  { label: "Corporate Clients", value: "200+" },
  { label: "Average Stay", value: "45 days" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Cities Available", value: "12" }
];

export default function CorporatePage() {
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Luxury corporate accommodation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Corporate Rental
              <span className="block text-accent-400">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Stress-free corporate relocations and business travel accommodations in Morocco's most exclusive properties. 
              We simplify your corporate housing needs with premium service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">              <Link 
                href="/properties"
                className="group px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                View Properties
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="mailto:corporate@daralkhayma.com"
                className="group px-10 py-5 border-2 border-white hover:bg-white hover:text-primary-900 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                Get Quote
                <Mail className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Why Choose Our Corporate
              <span className="text-primary-600"> Solutions</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We understand the unique needs of business travelers and provide 
              tailored solutions that exceed corporate accommodation standards.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-accent-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="bg-gradient-to-r from-primary-100 to-accent-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6 group-hover:text-primary-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>        </div>
      </section>

      {/* Services Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-accent-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Corporate Services
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We offer complete solutions for all your business accommodation needs, 
              from individual travelers to entire teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>        </div>
      </div>      {/* What We Offer Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80"
            alt="Luxury business environment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                What We 
                <span className="text-accent-400"> Offer</span>
              </h2>
              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <p>
                  Dar Al Khayma offers added value to companies with employees who travel frequently or need 
                  longer stays, providing a carefully curated portfolio of properties. Although corporate 
                  rental typically involves monthly leases, at Dar Al Khayma we adapt to your needs.
                </p>
                <p>
                  We create solutions while staying true to our main mission of providing hospitality and 
                  privacy in accommodation without sacrificing many services compared to a hotel, making 
                  the world of business travel easier.
                </p>
                <p>
                  Definitely, a service tailored to your needs with premium locations across Morocco's 
                  most strategic business districts and cultural centers.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >                <Link
                  href="#contact"
                  className="group inline-flex items-center px-10 py-5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Feature Cards */}
              <div className="space-y-6">                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-accent-400 mb-2">200+</div>
                  <div className="text-white font-medium">Corporate Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-accent-400 mb-2">98%</div>
                  <div className="text-white font-medium">Satisfaction Rate</div>
                </div>
              </div>
              <div className="space-y-6 mt-12">                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-accent-400 mb-2">45</div>
                  <div className="text-white font-medium">Average Stay (Days)</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-accent-400 mb-2">24/7</div>
                  <div className="text-white font-medium">Premium Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-neutral-600">
              Our track record speaks for itself.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>      {/* Packages Section */}
      <div id="packages" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Corporate Packages
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Choose the package that best fits your business needs. All packages 
              include our premium service and quality guarantee.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                  pkg.popular ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {pkg.description}
                  </p>
                  <div className="text-lg font-semibold text-primary-600 mb-2">
                    {pkg.priceRange}
                  </div>
                  <div className="text-sm text-neutral-500">
                    Duration: {pkg.duration}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-br from-neutral-50 to-accent-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              What Our Corporate Clients Say
            </h2>
            <p className="text-neutral-600">
              Real feedback from businesses that trust us with their accommodation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>      {/* Contact Section */}
      <div id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
              Ready to Discuss Your Corporate Needs?
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our corporate team is ready to create a customized solution for your business. 
              Contact us for a personalized quote and consultation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-neutral-900">Email</div>
                  <div className="text-neutral-600">corporate@daralkhayma.com</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-neutral-900">Phone</div>
                  <div className="text-neutral-600">+212 524 123 500</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="mailto:corporate@daralkhayma.com"
                className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}
