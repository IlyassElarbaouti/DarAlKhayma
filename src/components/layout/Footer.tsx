"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <Logo variant="white" size="md" />
                </div>
                <p className="text-neutral-400 mb-6 max-w-md leading-relaxed">
                  Discover Morocco&apos;s finest properties. From traditional riads to luxury villas, 
                  we curate exceptional accommodations for unforgettable experiences across Morocco&apos;s 
                  most enchanting destinations.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-neutral-400">
                    <MapPin className="w-5 h-5 mr-3 text-primary-400" />
                    <span>Marrakech, Morocco</span>
                  </div>
                  <div className="flex items-center text-neutral-400">
                    <Mail className="w-5 h-5 mr-3 text-primary-400" />
                    <span>hello@daralkhayma.com</span>
                  </div>
                  <div className="flex items-center text-neutral-400">
                    <Phone className="w-5 h-5 mr-3 text-primary-400" />
                    <span>+212 524 123 456</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Corporate Rentals
                  </Link>
                </li>
                <li>
                  <Link href="/join-us" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    List Your Property
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-6">Popular Destinations</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/destinations/marrakech" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Marrakech
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/casablanca" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Casablanca
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/fez" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Fez
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/essaouira" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Essaouira
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/rabat" className="text-neutral-400 hover:text-white transition-colors duration-200">
                    Rabat
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="py-8 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-neutral-400">Follow us:</span>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center md:text-right">
              <p className="text-neutral-400 text-sm mb-2">
                Subscribe to our newsletter for exclusive offers
              </p>
              <Link 
                href="#newsletter" 
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
              >
                Join Newsletter →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-6 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Dar Al Khayma. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
