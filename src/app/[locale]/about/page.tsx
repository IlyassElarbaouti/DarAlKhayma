import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { Shield, Heart, Globe, Award, Users, MapPin } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Award,
    title: "QUALITY",
    description: "Each property at Dar Al Khayma is selected, designed, executed and cared for with great dedication and professionalism. We continually strive to ensure that the furnishings are as shown in the photographs and that the inventory is fully complete, which is why we have a team dedicated exclusively to this. All our houses are selected and meet minimum standards in quality, features and area."
  },
  {
    icon: Shield,
    title: "24/7 SERVICE",
    description: "We welcome you to our cities, we receive you in your accommodation and we offer you everything you need to make you feel comfortable during your stay. If you need additional services, no matter the time or day, let us know and we will make it happen. We want your stay to be unforgettable, so you can complete your experience with our additional services."
  },
  {
    icon: Heart,
    title: "EQUIPMENT",
    description: "All our houses are provided with high quality, high thread count cotton sheets and towels, as well as a set of bathroom amenities courtesy of Dar Al Khayma. In addition, the kitchens of our apartments come with a complete inventory with everything you need to have a stay without the need to purchase any additional utensils."
  },
  {
    icon: Globe,
    title: "PROPERTIES WITH SIGNATURE",
    description: "Each of our houses bears the Dar Al Khayma stamp and style, that is, it has been designed by our team of interior designers. They all follow the same line, but each one has its own personality. In this way, we ensure that the quality and aesthetics from one apartment to another is very similar so you can book any property without lowering the design or quality."
  },
  {
    icon: MapPin,
    title: "UNIQUE LOCATIONS",
    description: "We offer you the best destinations, urban and in the best locations, either to enjoy a vacation or to rest in a fully equipped stay when traveling for work, as we also offer corporate rentals for short or long stays."
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

export default function AboutPage() {
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            About <span className="text-accent-400">Dar Al Khayma</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your gateway to authentic Moroccan hospitality and unforgettable experiences
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Founded with a passion for sharing Morocco's rich cultural heritage, Dar Al Khayma began as a vision to create authentic, luxury accommodations that honor traditional Moroccan hospitality while meeting modern comfort standards.
                </p>
                <p>
                  Our name, which means "The Tent" in Arabic, reflects our commitment to providing a home away from home – a place where travelers can experience the warmth and generosity that Morocco is famous for.
                </p>
                <p>
                  Today, we curate a collection of exceptional properties across Morocco's most beautiful destinations, each carefully selected and thoughtfully designed to offer guests an unforgettable journey into Moroccan culture and luxury.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Traditional Moroccan architecture"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-400 rounded-full opacity-20" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-200 rounded-full opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These principles guide everything we do, from property selection to guest experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
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
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              The passionate people behind Dar Al Khayma's exceptional experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent-400 rounded-full opacity-80" />
                </div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              To provide travelers with authentic, luxury accommodations that celebrate Morocco's rich heritage while delivering exceptional modern comfort and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex-1 max-w-sm">
                <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">5+ Premium Properties</h3>
                <p className="text-white/80">Carefully curated collection</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex-1 max-w-sm">
                <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Guest Satisfaction</h3>
                <p className="text-white/80">Committed to excellence</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex-1 max-w-sm">
                <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Local Support</h3>
                <p className="text-white/80">Always here for you</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWithHeaderPadding>
  );
}
