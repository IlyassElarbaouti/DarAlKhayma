"use client";

import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { 
  Home,
  TrendingUp,
  Shield,
  Users,
  Camera,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Send,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    icon: TrendingUp,
    title: "Flexibility",
    description: "Our hosts enjoy their home whenever they like, but make income from it when it suits them best by taking bookings ranging from three days to three months or more ."
  },
  {
    icon: Shield,
    title: "Tailored care",
    description: "We take a personal approach to partnering with our hosts. TheBenefits of Partnering with Us."
  },
  {
    icon: Users,
    title: "Peace-of-mind",
    description: "We are hospitality professionals who ensure the short term rental experience is as simple and rewarding as possible. We attract the most discerning guests, people who choose Dar Al Khayma  because they want to stay somewhere comfortable with style, character and service. We have a support team available 24/7. We know the homes inside and out which means we match each guest to the perfect home for their needs."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Global Reach Access to international markets through our partnerships with Airbnb, Booking.com, and premium travel networks."
  }
];

const managementServices = [
  {
    icon: Camera,
    title: "Professional Photography & Virtual Tours",
    description: "High-quality photography and 360° virtual tours to showcase your property's unique features and increase visibility.",
    features: ["Ultra HD 4K Photos – Premium quality that attracts high-paying guests instantly.", "Wide-Angle Professional Lens – Makes your property look bigger, brighter, and more luxurious.", "Lifestyle & Detail Shots – We capture emotion, not just spaces — this is what makes people book.", "Optimized for Airbnb & Booking Algorithms – More views, more clicks, more bookings — guaranteed."]
  },
  {
    icon: Globe,
    title: "Check-In / Check-Out",
    description: "Complete digital marketing strategy across multiple platforms to maximize your property's exposure.",
    features: ["100% Automated Smart Locks – No keys, no delays. Guests enter with secure digital codes.", "Separate Cleaning Staff Access – Unique codes for housekeeping teams to enter after checkout, keeping everything secure and efficient.", "Real-Time Notifications – We track every check-in and check-out in real time — you’re always informed, always in control.", "Stress-Free Guest Experience – No waiting, no confusion. Guests arrive smoothly, and leave on time — boosting reviews and preventing damage."]
  },
  {
    icon: Users,
    title: "Listing Creation",
    description: "24/7 multilingual guest support and concierge services to ensure exceptional guest experiences.",
    features: ["24/7 guest support", "Check-in/check-out services", "Concierge recommendations", "Issue resolution"]
  },
  {
    icon: Shield,
    title: "Maintenance & Cleaning",
    description: "Regular maintenance and professional cleaning services to keep your property in pristine condition.",
    features: ["Professional cleaning", "Preventive maintenance", "Emergency repairs", "Inventory management"]
  }
];

const requirements = [
  {
    title: "Property Standards",
    items: [
      "High-quality furnishing and decor",
      "Modern amenities and appliances",
      "Professional cleanliness standards",
      "Unique character or architectural features"
    ]
  },
  {
    title: "Location Criteria",
    items: [
      "Prime locations in major Moroccan cities",
      "Safe and accessible neighborhoods",
      "Close to attractions or business districts",
      "Good transport connections"
    ]
  },
  {
    title: "Owner Commitment",
    items: [
      "Flexible availability for bookings",
      "Responsive to maintenance needs",
      "Commitment to guest satisfaction",
      "Professional service standards"
    ]
  }
];

const process = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete our property assessment form with photos and details about your property.",
    icon: Upload
  },
  {
    step: 2,
    title: "Property Evaluation",
    description: "Our team conducts a comprehensive evaluation of your property and location.",
    icon: Home
  },
  {
    step: 3,
    title: "Professional Photography",
    description: "We arrange professional photography and create compelling property descriptions.",
    icon: Camera
  },
  {
    step: 4,
    title: "Go Live",
    description: "Your property is listed on our platform and partner networks to start receiving bookings.",
    icon: Star
  }
];

const testimonials = [
  {
    name: "Fatima Al-Zahra",
    location: "Marrakech",
    property: "Traditional Riad",
    content: "Joining Dar Al Khayma was the best decision for my riad. The professional service and premium guests have exceeded my expectations.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    revenue: "+65% increase in revenue"
  },
  {
    name: "Hassan Benali",
    location: "Casablanca",
    property: "Modern Villa",
    content: "The team's attention to detail and guest care has been exceptional. My property is always well-maintained and guests leave glowing reviews.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    revenue: "+80% occupancy rate"
  }
];

const stats = [
  { label: "Full Flexibility", value: "100%" },
  { label: "Guest Satisfaction Rate", value: "90%" },
  { label: "Tailored Care", value: "100%" },
  { label: "Cities Covered", value: "6" }
];

export default function JoinUsPage() {
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2175&q=80"
            alt="Luxury property management"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 to-primary-800/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Property
              <span className="block text-accent-400">Management</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              We simplify your life. At Dar Al Khayma, we create personalized profitability plans adapted to each 
              property, maximizing your returns while ensuring exceptional guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">              <Link
                href="#apply"
                className="group px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Start Managing
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#benefits"
                className="group px-10 py-5 border-2 border-white hover:bg-white hover:text-primary-900 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                Learn More
                <CheckCircle className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>
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
      </section>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Why Property Owners Choose Us
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
      </div>      {/* Benefits Section */}
      <section id="benefits" className="py-32 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Benefits of Partnering
              <span className="text-primary-600"> with Us</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              There are many unique benefits to our one-of-a-kind service. Our hosts tell us that they particularly enjoy.

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
      </section>      {/* Management Services Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
            alt="Premium property management"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Complete Property Management
              <span className="text-accent-400"> Services</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We handle every aspect of your property management so you can focus on what matters most. 
              From professional photography to guest services, we've got you covered.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {managementServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2"
                >                  <div className="bg-gradient-to-r from-accent-600 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-accent-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white">                        <CheckCircle className="w-5 h-5 text-accent-400 mr-3 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Property Requirements
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We maintain high standards to ensure exceptional experiences for our guests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((requirement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
                  {requirement.title}
                </h3>
                <ul className="space-y-3">
                  {requirement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our simple 4-step process gets your property listed and earning revenue quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Success Stories
            </h2>
            <p className="text-neutral-600">
              Hear from property owners who have transformed their business with us.
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
                <div className="flex items-center justify-between">                  <div className="flex items-center">
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
                        {testimonial.property} in {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {testimonial.revenue}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>      {/* Application Call-to-Action */}
      <div id="apply" className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-neutral-600">
              Join our network of premium property partners and start earning more from your property.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="mb-8">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Apply Through Our Contact Form
              </h3>
              <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Complete our comprehensive contact form with your property details and we'll get back 
                to you within 24 hours to discuss your property and answer any questions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?type=property-application"
                className="group inline-flex items-center px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Apply Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:partners@daralkhayma.com"
                className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Send className="w-5 h-5 mr-2" />
                Email Partners Team
              </a>
            </div>
          </div>        </div>
      </div>

      {/* Why Choose Dar Al Khayma Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Why Choose
                <span className="text-primary-600"> Dar Al Khayma</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Premium Property Standards</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Every property in our portfolio is carefully selected and designed with high standards 
                      of quality and design to ensure a unique stay in any property and destination.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">24/7 Premium Service</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      We welcome guests to our cities, receive them at their accommodation and offer 
                      everything they need to feel comfortable during their stay, no matter the time or day.
                    </p>
                  </div>
                </div>
                  <div className="flex items-start space-x-4">
                  <div className="bg-secondary-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Maximized Revenue</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Our proven strategies and premium positioning ensure your property reaches 
                      the highest-paying guests while maintaining exceptional occupancy rates.
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >                <Link
                  href="#apply"
                  className="group inline-flex items-center px-10 py-5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Join Our Network
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                  alt="Luxury property interior designed by Dar Al Khayma"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>
              
              {/* Floating achievement cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-primary-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Home className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">150+</div>
                    <div className="text-sm text-neutral-600">Premium Properties</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl border border-accent-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-600">4.9</div>
                    <div className="text-sm text-neutral-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWithHeaderPadding>
  );
}
