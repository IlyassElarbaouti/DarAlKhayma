"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

const navigation = [
  { name: "Properties", href: "/properties" },
  { name: "Destinations", href: "/destinations" },
  { name: "Corporate", href: "/corporate" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        actionColor: isScrolled
          ? "text-neutral-600 hover:bg-neutral-100"
          : "text-white/90 hover:bg-white/10",
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
        actionColor: "text-neutral-600 hover:bg-neutral-100",
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
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <Logo 
              variant={headerStyle.logoVariant as "black" | "white"} 
              size="md"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-medium transition-all duration-300 hover:text-primary-600 relative",
                  headerStyle.textColor,
                  // Add active state styling
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                headerStyle.actionColor
              )}
              title="Search properties"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                headerStyle.actionColor
              )}
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-all duration-300 z-10",
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
                <div className="border-t border-primary-100 pt-4 mt-4">
                  <button 
                    className="w-full px-6 py-3 text-left text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Search className="w-4 h-4" />
                    Search Properties
                  </button>
                  <button 
                    className="w-full px-6 py-3 text-left text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Account
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
