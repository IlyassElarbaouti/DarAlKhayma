import { PageWithHeaderPadding } from "@/components/layout/PageLayout";

export default function JoinUsPage() {
  return (
    <PageWithHeaderPadding>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Join Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Partner with us to list your property or join our team.
          </p>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}
