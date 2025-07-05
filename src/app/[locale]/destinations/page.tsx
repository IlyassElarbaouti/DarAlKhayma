import { PageWithHeaderPadding } from "@/components/layout/PageLayout";

export default function DestinationsPage() {
  return (
    <PageWithHeaderPadding>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Discover Morocco's most beautiful destinations with our premium accommodations.
          </p>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}
