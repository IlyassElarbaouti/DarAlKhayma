"use client";

import { motion } from "framer-motion";
import { Mail, Shield, Gift, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle newsletter subscription
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      setEmail("");    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1570026517541-a9e832bdd2ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Morocco landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Discover Morocco&apos;s
              <span className="block text-accent-400">Hidden Gems</span>
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Stay updated with new luxury properties, insider travel tips, and seasonal guides. 
              Be the first to discover exclusive accommodations across Morocco&apos;s most enchanting destinations.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-white">
                <Gift className="w-5 h-5 mr-3 text-accent-400" />
                <span>Exclusive property previews and early access</span>
              </div>
              <div className="flex items-center text-white">
                <Mail className="w-5 h-5 mr-3 text-accent-400" />
                <span>Curated travel tips and local insights</span>
              </div>
              <div className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-3 text-accent-400" />
                <span>Seasonal offers and special promotions</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-neutral-800 mb-2">
                Join Our Community
              </h3>              <p className="text-neutral-600">
                Get exclusive access to Morocco&apos;s finest properties
              </p>
            </div>            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-neutral-800 mb-2">Welcome Aboard!</h4>
                <p className="text-neutral-600">You&apos;ll receive our next newsletter with exclusive Morocco insights.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    className="w-full"
                  />
                  {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe to Newsletter"
                  )}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  We respect your privacy. Unsubscribe at any time. No spam, ever.
                </p>
              </form>
            )}

            {/* Social Proof */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-center space-x-4 text-sm text-neutral-600">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="ml-3">Join 2,500+ travelers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
