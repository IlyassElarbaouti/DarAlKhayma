"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Users, 
  Sun,
  ArrowLeft,
  ExternalLink,
  Car,
  Plane,
  Train
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyCard from "@/components/property/PropertyCard";
import { SanityDestination, Property } from "@/types/sanity";

interface DestinationClientProps {
  destination: SanityDestination;
  properties: Property[];
}

export default function DestinationClient({ destination, properties }: DestinationClientProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'attractions' | 'properties'>('overview');
  // Create gallery array from destination image (for now, just use the main image)
  // In future, you might want to add a gallery field to the destination schema
  const gallery = destination.image ? [destination.image.url] : [];

  return (
    <>
      {/* Hero Gallery Section */}
      <div className="relative h-96 lg:h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"          style={{
            backgroundImage: gallery.length > 0 ? `url('${gallery[0]}')` : 'none',
            backgroundColor: gallery.length === 0 ? '#f3f4f6' : 'transparent'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Back Button */}
          <div className="pt-8">
            <Link href="/destinations">
              <Button variant="outline" className="bg-white/90 hover:bg-white text-neutral-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Destinations
              </Button>
            </Link>
          </div>

          {/* Hero Content */}
          <div className="flex items-end h-full pb-12">
            <div>
              <Badge className="mb-4 bg-primary-600">{destination.region}</Badge>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
              >
                {destination.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl"
              >
                {destination.description}
              </motion.p>
              
              <div className="flex items-center mt-6 space-x-6 text-white/90">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{destination.propertyCount || properties.length} properties</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination.region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'attractions', label: 'Attractions' },
              { id: 'properties', label: 'Properties' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'overview' | 'attractions' | 'properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                  About {destination.name}
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {destination.shortDescription || destination.description}
                </p>
              </div>

              {/* Activities */}
              {destination.activities && destination.activities.length > 0 && (
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    Things to Do
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {destination.activities.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 bg-neutral-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
                        <span className="text-neutral-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transportation */}
              {destination.transportation && (
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    Getting There
                  </h3>
                  <div className="space-y-4">
                    {destination.transportation.airport && (
                      <div className="flex items-start">
                        <Plane className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium text-neutral-900">By Air</p>
                          <p className="text-neutral-600">{destination.transportation.airport}</p>
                        </div>
                      </div>
                    )}
                    {destination.transportation.trainStation && (
                      <div className="flex items-start">
                        <Train className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium text-neutral-900">By Train</p>
                          <p className="text-neutral-600">{destination.transportation.trainStation}</p>
                        </div>
                      </div>
                    )}
                    {destination.transportation.carRental && (
                      <div className="flex items-start">
                        <Car className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium text-neutral-900">Car Rental</p>
                          <p className="text-neutral-600">{destination.transportation.carRental}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather & Best Time */}
              {destination.weather && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sun className="h-5 w-5 mr-2" />
                      Weather & Climate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {destination.weather.averageTemp && (
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-600">Average Temperature</span>
                        <span className="font-medium">{destination.weather.averageTemp}</span>
                      </div>
                    )}
                    {destination.weather.bestTimeToVisit && (
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-600">Best Time to Visit</span>
                        <span className="font-medium">{destination.weather.bestTimeToVisit}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Properties Available</span>
                    <span className="font-medium">{destination.propertyCount || properties.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'attractions' && (
          <div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">
              Top Attractions in {destination.name}
            </h2>
            {destination.attractions && destination.attractions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.attractions.map((attraction, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{attraction.name}</CardTitle>
                        {attraction.type && (
                          <Badge variant="outline">{attraction.type}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600">{attraction.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">No attractions information available yet.</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-900">
                Properties in {destination.name}
              </h2>
              <Link href={`/properties?destination=${destination.slug?.current}`}>
                <Button className="bg-primary-600 hover:bg-primary-700">
                  View All Properties
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {properties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">No properties available in this destination yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
