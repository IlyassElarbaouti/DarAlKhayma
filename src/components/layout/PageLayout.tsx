"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  headerTransparent?: boolean; // For pages that need transparent header initially
  addHeaderPadding?: boolean; // For pages that need padding to account for fixed header
}

export default function PageLayout({
  children,
  className,
  showHeader = true,
  showFooter = true,
  addHeaderPadding = false,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {showHeader && <Header />}
      
      <main className={cn(
        "relative", 
        addHeaderPadding && "pt-20 lg:pt-24", // Add padding to account for fixed header
        className
      )}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}

// Export a helper for pages that need the header padding
export function PageWithHeaderPadding({ 
  children, 
  className,
  ...props 
}: Omit<PageLayoutProps, 'addHeaderPadding'>) {
  return (
    <PageLayout 
      addHeaderPadding={true} 
      className={className}
      {...props}
    >
      {children}
    </PageLayout>
  );
}
