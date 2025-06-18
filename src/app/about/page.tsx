import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { Shield, Heart, Globe, Award, Users, MapPin } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Shield,
    title: "Curated Selection",
    description: "Every property is hand-picked and verified by our local team to ensure exceptional quality and authentic experiences."
  },
  {
    icon: Heart,
    title: "Local Expertise",
    description: "Our Morocco-based team provides insider knowledge and authentic recommendations to make your stay unforgettable."
  },
  {
    icon: Globe,
    title: "Trusted Partners",
    description: "We work with established platforms like Airbnb and Booking.com to ensure secure bookings and reliable service."
  },
  {
    icon: Award,
    title: "Quality Standards",
    description: "Professional photography, detailed descriptions, and verified amenities help you make informed decisions."
  }
];

const team = [
  {
    name: "Youssef El Alami",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Born and raised in Marrakech, Youssef brings 15 years of hospitality experience and deep knowledge of Moroccan culture."
  },
  {
    name: "Aicha Benali",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "With a background in interior design and local tourism, Aicha ensures every property meets our high standards for authentic luxury."
  },
  {
    name: "Omar Idrissi",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Omar coordinates with property owners and guests to ensure seamless experiences from booking to checkout."
  }
];

const stats = [
  { label: "Properties Curated", value: "150+" },
  { label: "Cities Covered", value: "12" },
  { label: "Happy Guests", value: "5,000+" },
  { label: "Years of Experience", value: "8" }
];

export default function AboutPage() {
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
              About Dar Al Khayma
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re passionate about showcasing Morocco&apos;s finest properties and helping travelers 
              discover the authentic beauty and luxury that our country has to offer.
            </p>
          </div>
        </div>
      </div>        {/* Our Story */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-neutral-700 leading-relaxed">
                  <p>
                    Founded in 2016, Dar Al Khayma began as a passion project to share Morocco&apos;s 
                    incredible hospitality and cultural richness with the world. What started as 
                    a small collection of riads in Marrakech has grown into a curated platform 
                    featuring the finest properties across Morocco.
                  </p>
                  <p>
                    Our name, &quot;Dar Al Khayma&quot; (House of the Tent), reflects our commitment to 
                    traditional Moroccan hospitality while embracing modern comfort and luxury. 
                    We believe that where you stay shapes your entire travel experience.
                  </p>
                  <p>
                    Every property in our collection is personally visited and vetted by our 
                    team. We work closely with property owners to ensure exceptional standards 
                    and authentic experiences that showcase the best of Moroccan culture.
                  </p>
                </div>
              </div>              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Traditional Moroccan riad"
                  width={2070}
                  height={1380}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-8 h-8 text-primary-600" />
                    <div>
                      <div className="font-semibold text-neutral-900">Based in Morocco</div>
                      <div className="text-sm text-neutral-600">Local expertise you can trust</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                What Sets Us Apart
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Our commitment to quality, authenticity, and exceptional service makes us 
                the trusted choice for luxury accommodations in Morocco.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Our Impact
              </h2>
              <p className="text-neutral-600">
                Numbers that reflect our commitment to excellence and growth.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                The passionate individuals behind Dar Al Khayma, dedicated to showcasing 
                the best of Moroccan hospitality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-6"
                  />
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-primary-600 font-medium mb-4">
                    {member.role}
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
              Our Mission
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">              <blockquote className="text-xl text-neutral-700 leading-relaxed italic">
                &quot;To connect travelers with Morocco&apos;s most exceptional properties while supporting 
                local communities and preserving our cultural heritage. We believe luxury travel 
                should be authentic, responsible, and transformative.&quot;
              </blockquote>
              <div className="mt-8 flex items-center justify-center space-x-3">
                <Users className="w-6 h-6 text-primary-600" />
                <span className="text-neutral-600 font-medium">The Dar Al Khayma Team</span>
              </div>
            </div>
          </div>
        </div>
    </PageWithHeaderPadding>
  );
}
