import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { Heart, Award, Users, MapPin, Star, Building } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Heart,
    title: "AN EXPERIENCE FOR VACATION OR WORK",
    description: "Discover different ways of living the same place. We attend in a personalized way the needs of our clients, fulfilling expectations, where our aspiration is to provide exceptional service. At Dar Al Khayma we renovate and design every corner of each space taking care of every detail to offer a unique and genuine experience."
  },
  {
    icon: Building,
    title: "A STORY TO TELL ABOUT US",
    description: "Dar Al Khayma was created 4 years ago to offer a different approach to the management of vacation, monthly or annual rentals. We consider the owner as a strategic ally in order to share with him all that his property has to offer through our experience and contacts in this sector."
  },
  {
    icon: Star,
    title: "MORE THAN YOU CAN AFFORD OR IMAGINE",
    description: "We are the rental service that allows you to enjoy an exceptional life. We select and design the most authentic properties. All our designer properties have been carefully selected by our team. Our apartments are located in the center of the cities and in the most avant-garde neighborhoods."
  },
  {
    icon: Award,
    title: "ONE COMPANY INNOVATIVE AND MOTIVATED",
    description: "Since the acquisition and renovation of the first apartments, the company has experienced rapid growth. Our properties are located in the most prestigious areas. We want to give the maximum value to each property by having a team specialized in each activity."
  }
];

const team = [
  {
    name: "Ahmed Khalil Azakoun",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "I was born in Agadir, but my passion for hospitality started early when I began managing guest stays and refining every part of the experience. After launching Dar Al Khayma, I now lead the company across Multiple Cities in Morocco making sure both guests and property owners receive a seamless, high-level service every time.",
    tip: "I love walking through the old medina of Marrakech at sunset, it's full of energy, colors, and little hidden cafés that feel like a world of their own.",
    destination: "The Moroccan coast, from Agadir to Essaouira. There's something about the mix of ocean, culture, and calm that's unforgettable.",
    items: ["My phone", "sunglasses", "a notebook"],
    itemsDescription: "I'm always planning the next move."
  },
  {
    name: "Youssef Gouhmid",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "I was born and raised in Casablanca, a city that blends energy, design, and culture on every corner. I've always been drawn to visual storytelling, which led me to take on the artistic direction at Dar Al Khayma. From branding to photography, I shape how our properties and our identity come to life.",
    tip: "The rooftop at La Sqala for a calm lunch away from the city buzz, classic Casablanca atmosphere and great views.",
    destination: "The Atlas Mountains, there's something honest and inspiring about the raw landscapes and quiet villages.",
    items: ["My camera", "sketchbook", "a playlist for every mood"],
    itemsDescription: ""
  },
  {
    name: "Abdelwali",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "I was born in Agadir, a city where hospitality is second nature. Growing up here taught me how much the little things matter. At Dar Al Khayma, I handle customer experience on the ground making sure each guest feels welcome, supported, and at ease throughout their stay.",
    tip: "Visit the marina in the early morning. It's quiet, fresh, and the perfect place to start the day with a coffee and ocean breeze.",
    destination: "The Draa Valley it's a completely different side of Morocco. Peaceful, wild, and full of history.",
    items: ["My charger", "shirt", "my favorite watch"],
    itemsDescription: ""
  }
];

const stats = [
  { label: "Stays Handpicked with Care", value: "100+" },
  { label: "Cities Across Morocco", value: "8" },
  { label: "Guests Welcomed with Heart", value: "1000+" },
  { label: "Years of Real-World Hosting Experience", value: "4" },
  { label: "Properties Curated", value: "5+" }
];

export default function AboutPage() {
  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
              About Us
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Since our Start in 2022, Dar Al Khayma has established itself as a leading real estate company 
              committed to providing innovative and high quality real estate solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Who we are
              </h2>
              <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                  Since our Start in 2022, Dar Al Khayma has established itself as a leading real estate company 
                  committed to providing innovative and high quality real estate solutions. Our mission is to not 
                  only meet, but exceed our clients' expectations, helping them find and secure the best opportunities 
                  in the marketplace.
                </p>
                <p>
                  Dar Al Khayma prides itself on being a company that combines tradition and modernity, while 
                  maintaining a strong commitment to integrity, transparency and innovation. Join us on this journey 
                  and discover how we can help you achieve your real estate goals.
                </p>
                <p>
                  At Dar Al Khayma, we don't just manage homes, we care for them like they're our own. 
                  Every stay is personal. Every detail matters. Every guest and every owner feels the difference.
                </p>
              </div>
            </div>
            <div className="relative">
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

      {/* What Sets Us Apart */}
      <div className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              At Dar Al Khayma, we don't just manage homes, we care for them like they're our own.
              Every stay is personal. Every detail matters. Every guest and every owner feels the difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
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

      {/* Our Impact */}
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
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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
              The People Behind Dar Al Khayma. Built in Morocco, trusted by travelers and owners worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 text-center">
                  {member.name}
                </h3>
                <div className="text-primary-600 font-medium mb-4 text-center">
                  {member.role}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-neutral-900">Top local tip: </span>
                    <span className="text-neutral-600">{member.tip}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900">Bucket list destination: </span>
                    <span className="text-neutral-600">{member.destination}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900">Always packs: </span>
                    <span className="text-neutral-600">{member.items.join(", ")} {member.itemsDescription && `— ${member.itemsDescription}`}</span>
                  </div>
                </div>
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
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
            <blockquote className="text-xl text-neutral-700 leading-relaxed italic">
              &quot;To create seamless, human centered stays that reflect the true spirit of Moroccan hospitality. 
              We care for every home like it's our own, and treat every guest like family — with intention, 
              respect, and precision.&quot;
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
