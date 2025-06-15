"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Before Booking",
    icon: "📌",
    items: [
      {
        question: "How can I book a property?",
        answer: "You can book directly via Airbnb, Booking.com, or by contacting us. We recommend booking at least 3 days in advance for the best availability. For urgent last-minute bookings, contact our reservations team on WhatsApp."
      },
      {
        question: "Can I rent the apartment for a longer stay or for business?",
        answer: "Yes. For stays longer than 28 days, we offer monthly corporate rental packages with exclusive pricing. Utilities are included up to a limit. Contact us for tailored rates and additional services like weekly cleaning or laundry."
      },
      {
        question: "Is a pre-reservation possible while I decide?",
        answer: "Yes. We can block dates for up to 24 hours while you confirm with your family or travel partners."
      },
      {
        question: "Can I arrange a visit to the apartment before booking?",
        answer: "In some cases, yes. If the apartment is available and you're in the area, we can schedule a showing."
      },
      {
        question: "Do I need a marriage certificate to book as a Moroccan couple?",
        answer: "Yes, per Moroccan law, a marriage certificate is required for Moroccan couples staying together."
      }
    ]
  },
  {
    title: "Arrival & Check-in",
    icon: "🛬",
    items: [
      {
        question: "What time is check-in?",
        answer: "Check-in is from 15:00 (3 PM). Early check-in may be possible depending on availability — please contact us the day before your arrival."
      },
      {
        question: "Can I check in late?",
        answer: "Yes. Late check-ins are possible 24/7 using a secure digital code. Instructions will be sent by message before arrival."
      },
      {
        question: "Can someone pick me up at the airport?",
        answer: "Yes. We offer private airport transfer with bilingual driver. Book via WhatsApp in advance."
      },
      {
        question: "Can I store my luggage if I arrive early?",
        answer: "Yes, in most cases we can arrange an early drop-off of luggage."
      },
      {
        question: "Who will welcome me?",
        answer: "You'll either receive a digital check-in code or be welcomed by a member of our team, depending on the apartment and your arrival time."
      }
    ]
  },
  {
    title: "During Your Stay",
    icon: "🏠",
    items: [
      {
        question: "Is cleaning included?",
        answer: "A full cleaning is included before check-in. Mid-stay cleanings can be arranged upon request."
      },
      {
        question: "Do you offer a private chef?",
        answer: "Yes. You can book a private Moroccan chef experience directly via WhatsApp. We offer couscous, tajines, traditional salads, and mint tea service prepared onsite."
      },
      {
        question: "Can I rent a car or book a chauffeur?",
        answer: "Absolutely. We offer car rentals, airport transfers, and full-day chauffeur service across Marrakech, Agadir, Casablanca, and Essaouira."
      },
      {
        question: "Is there Wi-Fi?",
        answer: "Yes. All apartments include high-speed fiber optic Wi-Fi. Access details are provided in your welcome message."
      },
      {
        question: "Is the apartment child-friendly?",
        answer: "Yes, and baby items like highchairs or cribs can be arranged with advance notice."
      },
      {
        question: "What size are the beds?",
        answer: "Most apartments feature queen or king beds. Check your specific listing for full layout."
      },
      {
        question: "Can I request extra towels or linen?",
        answer: "Yes. Just message us and we'll arrange a delivery or mid-stay replacement."
      }
    ]
  },
  {
    title: "Payments, Changes & Cancellations",
    icon: "🧾",
    items: [
      {
        question: "How can I pay?",
        answer: "Payments are processed via the platform (Airbnb or Booking.com). For direct bookings, we accept bank transfer or secure link payments."
      },
      {
        question: "Can I modify or extend my stay?",
        answer: "Yes — subject to availability. Contact us as early as possible to confirm new dates."
      },
      {
        question: "What is your cancellation policy?",
        answer: "We follow the cancellation policies shown on your booking platform. Please refer to your reservation confirmation."
      }
    ]
  },
  {
    title: "Technical Help & Emergencies",
    icon: "🔧",
    items: [
      {
        question: "Who do I contact if something breaks?",
        answer: "WhatsApp us right away. We'll dispatch maintenance as quickly as possible."
      },
      {
        question: "Is there emergency support?",
        answer: "Yes. For serious issues (e.g., water leak, no power), contact our 24/7 support line via WhatsApp."
      }
    ]
  },
  {
    title: "Check-Out",
    icon: "🚪",
    items: [
      {
        question: "What time is check-out?",
        answer: "Check-out is at 11:00 AM. Late check-out may be available depending on bookings."
      },
      {
        question: "Can I leave my luggage after check-out?",
        answer: "In most cases, yes. Please let us know in advance."
      }
    ]
  }
];

const houseRules = [
  "No smoking indoors",
  "No parties or loud noise after 22:00 (10 PM)",
  "Respect for neighbors is essential",
  "Unregistered guests are not allowed to stay overnight"
];

const checkoutInstructions = [
  "Turn off all appliances and AC",
  "Leave keys on the dining table",
  "Close the door securely behind you"
];

const FAQAccordionItem = ({ item, isOpen, onToggle }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => (
  <motion.div 
    className="border border-neutral-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <button
      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors duration-200"
      onClick={onToggle}
    >      <span className="font-medium text-neutral-800 pr-4">{item.question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0 transition-transform duration-200" />
      ) : (
        <ChevronDown className="h-5 w-5 text-primary-600 flex-shrink-0 transition-transform duration-200" />
      )}
    </button>
    {isOpen && (
      <motion.div 
        className="px-6 pb-5"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
      </motion.div>
    )}
  </motion.div>
);

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Frequently Asked
            <span className="block text-primary-600">Questions</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to Dar Al Khayma. We've crafted this FAQ to answer every question you might have — 
            before you even ask — with the clarity and care of a 5-star experience.
          </p>
        </motion.div>        {/* FAQ Categories */}
        <div className="space-y-16">
          {faqData.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-neutral-800">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <FAQAccordionItem
                    key={itemIndex}
                    item={item}
                    isOpen={openItems[`${categoryIndex}-${itemIndex}`] || false}
                    onToggle={() => toggleItem(categoryIndex, itemIndex)}
                  />
                ))}
              </div>
            </motion.div>
          ))}          {/* House Rules */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-neutral-800">House Rules</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              {houseRules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                  <span className="text-neutral-700 leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-800 font-medium">
                Violation of house rules may result in immediate cancellation of your stay without refund.
              </p>
            </div>
          </motion.div>

          {/* Check-out Instructions */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-xl md:text-2xl font-bold text-neutral-800 mb-6">What do I need to do before leaving?</h4>
            <div className="space-y-4 mb-8">
              {checkoutInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                  <span className="text-neutral-700 leading-relaxed">{instruction}</span>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-primary-50 rounded-xl border border-primary-200">
              <h5 className="font-semibold text-primary-800 mb-2">Forgot something?</h5>
              <p className="text-primary-700">
                Contact us and we'll help recover and return your item. Shipping costs apply.
              </p>
            </div>
          </motion.div>
        </div>        {/* Contact CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl p-8 md:p-12 border border-accent-300">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="font-display text-2xl md:text-3xl font-bold text-neutral-800">
                Still have questions?
              </h3>
            </div>            <p className="text-neutral-700 mb-8 text-lg max-w-2xl mx-auto">
              Our team is here to help you 24/7. Don't hesitate to reach out for personalized assistance!
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
