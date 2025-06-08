"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPropertyBySlug } from "@/lib/sanityService";
import { Property } from "@/types";
import Image from "next/image";
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Star,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,  ChevronRight
} from "lucide-react";

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
    const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [_isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      if (!slug) return;
      
      try {
        const propertyData = await getPropertyBySlug(slug);
        if (!propertyData) {
          notFound();
          return;
        }
        setProperty(propertyData);
      } catch (error) {
        console.error('Error loading property:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [slug]);

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-300 rounded w-1/2 mb-4"></div>
              <div className="h-96 bg-neutral-300 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-4 bg-neutral-300 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-300 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <div className="h-8 bg-neutral-300 rounded mb-4"></div>
                  <div className="h-12 bg-neutral-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* Property Title & Actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-neutral-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {property.location.neighborhood && `${property.location.neighborhood}, `}
                  {property.location.city}, {property.location.region}
                </span>
              </div>
              {property.rating && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{property.rating.average}</span>
                  <span className="text-neutral-600 ml-1">
                    ({property.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg border transition-colors ${ 
                  isLiked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-200 mb-8">
            <div className="aspect-[16/9] relative">
              {property.images.length > 0 && (
                <>
                  <Image
                    src={property.images[currentImageIndex].url}
                    alt={property.images[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Gallery Controls */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>
            
            {/* View All Photos Button */}
            {property.images.length > 1 && (
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="absolute bottom-4 left-4 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
              >
                View all {property.images.length} photos
              </button>
            )}
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Details */}
              <div className="bg-white rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {property.category} in {property.location.city}
                    </h3>
                    <div className="flex items-center space-x-6 text-neutral-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{property.specifications.guests} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.specifications.bedrooms} bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.specifications.bathrooms} bathrooms</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-6">
                    What this place offers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <div className="w-6 h-6 mr-3 text-neutral-600">
                          {/* You can add icons for different amenities here */}
                          <Wifi className="w-5 h-5" />
                        </div>
                        <span className="text-neutral-700">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-neutral-800">
                      {property.price.amount} {property.price.currency}
                    </span>
                    <span className="text-neutral-600 ml-2">/ {property.price.period}</span>
                  </div>
                </div>

                {/* Booking Links */}
                {property.bookingLinks.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-neutral-800 mb-3">
                      Book this property
                    </h4>
                    {property.bookingLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                      >
                        <span className="font-medium text-neutral-800">
                          Book on {link.platform}
                        </span>
                        <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-600" />
                      </a>
                    ))}
                  </div>
                )}

                {property.bookingLinks.length === 0 && (
                  <div className="text-center text-neutral-600 py-4">
                    <p>Contact us for booking information</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
