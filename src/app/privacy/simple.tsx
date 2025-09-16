"use client";

import { PageWithHeaderPadding } from "@/components/layout/PageLayout";

export default function PrivacyPolicyPage() {
  return (
    <PageWithHeaderPadding>
      <div className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-8">Privacy Policy</h1>
          <p className="text-neutral-600 leading-relaxed">
            This is a simplified privacy policy page to test routing.
            If you can see this page, then the routing is working correctly.
          </p>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}