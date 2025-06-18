"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Facebook, Instagram, MessageCircle, Linkedin } from "lucide-react";
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
                    <span>Agadir, Morocco</span>
                  </div>
                  <div className="flex items-center text-neutral-400">
                    <Mail className="w-5 h-5 mr-3 text-primary-400" />
                    <span>hello@daralkhayma.com</span>
                  </div>
                  <div className="flex items-center text-neutral-400">
                    <Phone className="w-5 h-5 mr-3 text-primary-400" />
                    <span>+212774214018</span>
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
          <div className="flex flex-col md:flex-row justify-between items-center">            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-neutral-400">Follow us:</span>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61574009624167" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/dar_alkhayma/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://fr.pinterest.com/DarAlKhayma/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="Pinterest"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://api.whatsapp.com/send/?phone=774214018&text&type=phone_number&app_absent=0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/dar-al-khayma/?viewAsMember=true" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
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
