"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { useDestinations } from "@/hooks/useDestinations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const pathname = usePathname();
  const { destinations, loading } = useDestinations();

  const navigation = [
    { name: "List Your Home", href: "/join-us" },
    { name: "About Us", href: "/about" },
    { name: "Companies", href: "/corporate" },
    { name: "Owners", href: "/join-us" },
    { name: "Contact", href: "/contact" },
  ];

  // Determine if we're on the homepage
  const isHomepage = pathname === '/';

  // Handle scroll effect with proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Determine header styling based on context
  const getHeaderStyling = () => {
    if (isHomepage) {
      // Homepage with hero background - use transparent/white transition
      return {
        background: isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100/20"
          : "bg-transparent",
        logoVariant: isScrolled ? "black" : "white",
        textColor: isScrolled ? "text-neutral-700" : "text-white/90",
        mobileButtonColor: isScrolled
          ? "text-neutral-600 hover:bg-neutral-100"
          : "text-white hover:bg-white/10"
      };
    } else {
      // Other pages - always use solid white background
      return {
        background: "bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100/20",
        logoVariant: "black",
        textColor: "text-neutral-700",
        mobileButtonColor: "text-neutral-600 hover:bg-neutral-100"
      };
    }
  };

  const headerStyle = getHeaderStyling();
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        headerStyle.background
      )}
    >      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10 flex-shrink-0">
            <Logo 
              variant={headerStyle.logoVariant as "black" | "white"} 
              size="md"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {/* Destinations Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDestinationsOpen(true)}
                onMouseLeave={() => setIsDestinationsOpen(false)}
              >
                <Link
                  href="/destinations"
                  className={cn(
                    "font-medium transition-all duration-300 hover:text-primary-600 relative flex items-center gap-1",
                    headerStyle.textColor,
                    pathname.startsWith('/destinations') && "text-primary-600 font-semibold"
                  )}
                >
                  Destinations
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isDestinationsOpen && "rotate-180"
                    )} 
                  />
                  {/* Active indicator */}
                  {pathname.startsWith('/destinations') && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDestinationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50"
                    >
                      <div className="p-4">
                        <div className="text-sm font-semibold text-neutral-600 mb-3 uppercase tracking-wide">
                          Explore Our Destinations
                        </div>
                        
                        {loading ? (
                          <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="animate-pulse">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                                  <div className="flex-1">
                                    <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                                    <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : destinations.length > 0 ? (
                          <div className="space-y-1">
                            {destinations.map((destination) => (
                              <Link
                                key={destination.id}
                                href={`/destinations/${destination.slug}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 group"
                                onClick={() => setIsDestinationsOpen(false)}
                              >
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                                  {destination.image ? (
                                    <Image
                                      src={destination.image}
                                      alt={destination.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <MapPin className="w-6 h-6 text-neutral-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
                                    {destination.name}
                                  </div>
                                  <div className="text-sm text-neutral-500 truncate">
                                    {destination.region}
                                  </div>
                                  {destination.propertyCount && (
                                    <div className="text-xs text-primary-600 font-medium">
                                      {destination.propertyCount} properties
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-neutral-500">
                            <MapPin className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                            <div className="text-sm">No destinations available</div>
                          </div>
                        )}
                        
                        <div className="border-t border-neutral-100 mt-4 pt-3">
                          <Link
                            href="/destinations"
                            className="block text-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                            onClick={() => setIsDestinationsOpen(false)}
                          >
                            View All Destinations →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-medium transition-all duration-300 hover:text-primary-600 relative",
                    headerStyle.textColor,
                    pathname === item.href && "text-primary-600 font-semibold"
                  )}
                >
                  {item.name}
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-all duration-300 z-10 flex-shrink-0",
              headerStyle.mobileButtonColor
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-primary-100 bg-white/95 backdrop-blur-lg shadow-lg"
            >
              <div className="py-6 space-y-1">
                {/* Destinations in Mobile */}
                <div className="px-6 pb-2">
                  <div className="text-sm font-semibold text-neutral-600 mb-3 uppercase tracking-wide">
                    Destinations
                  </div>
                  {loading ? (
                    <div className="text-sm text-neutral-500 pl-4">Loading destinations...</div>
                  ) : destinations.length > 0 ? (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {destinations.map((destination) => (
                        <Link
                          key={destination.id}
                          href={`/destinations/${destination.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-neutral-100">
                            {destination.image ? (
                              <Image
                                src={destination.image}
                                alt={destination.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-neutral-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-neutral-800">
                              {destination.name}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {destination.propertyCount} properties
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-500 pl-4">No destinations available</div>
                  )}
                  <Link
                    href="/destinations"
                    className="block mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Destinations →
                  </Link>
                </div>

                {/* Other Navigation Items */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-6 py-3 text-neutral-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 border-l-4 border-transparent hover:border-primary-500",
                      pathname === item.href && "bg-primary-50 text-primary-700 border-primary-500 font-semibold"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
