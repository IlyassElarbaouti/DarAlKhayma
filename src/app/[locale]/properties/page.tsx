import { PageWithHeaderPadding } from "@/components/layout/PageLayout";

export default function PropertiesPage() {
  return (
    <PageWithHeaderPadding>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Properties
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Browse our collection of premium properties across Morocco.
          </p>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}
