import React, { useState } from 'react';
import Footer from '../components/Footer';

// Pricing Table Component
const PricingTable = () => {
  const plans = [
    {
      name: 'Prime Shopping',
      price: '₹399/year',
      features: [
        { text: 'Fast, free delivery', included: true },
        { text: 'Eligible for Prime delivery', included: true },
        { text: 'Earn unlimited 5% back', included: true },
        { text: 'Get 10% back on electronics', included: false },
        { text: 'Early access to sales', included: false },
        { text: 'Unlimited ad-free movies & TV shows', included: false },
        { text: 'Ad-free music streaming', included: false },
        { text: 'Free games & in-game content', included: false },
      ]
    },
    {
      name: 'Prime Lite',
      price: '₹799/year',
      features: [
        { text: 'Fast, free delivery', included: true },
        { text: 'Eligible for Prime delivery', included: true },
        { text: 'Earn unlimited 5% back', included: true },
        { text: 'Get 10% back on electronics', included: true },
        { text: 'Early access to sales', included: true },
        { text: 'Unlimited ad-free movies & TV shows', included: false },
        { text: 'Ad-free music streaming', included: false },
        { text: 'Free games & in-game content', included: false },
      ]
    },
    {
      name: 'Prime',
      price: '₹299/month\nor ₹1,499/year',
      features: [
        { text: 'Fast, free delivery', included: true },
        { text: 'Eligible for Prime delivery', included: true },
        { text: 'Earn unlimited 5% back', included: true },
        { text: 'Get 10% back on electronics', included: true },
        { text: 'Early access to sales', included: true },
        { text: 'Unlimited ad-free movies & TV shows', included: true },
        { text: 'Ad-free music streaming', included: true },
        { text: 'Free games & in-game content', included: true },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left pb-4 w-1/4"></th>
            {plans.map((plan, index) => (
              <th key={index} className="pb-4 text-center">
                <div className="text-lg font-bold text-gray-900">{plan.name}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line mt-1">{plan.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans[0].features.map((feature, featureIndex) => (
            <tr key={featureIndex} className="border-t border-gray-200">
              <td className="py-3 pr-4 text-sm text-gray-700">{feature.text}</td>
              {plans.map((plan, planIndex) => (
                <td key={planIndex} className="text-center py-3">
                  {plan.features[featureIndex].included ? (
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// FAQ Accordion Component
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What happens if I join a plan and later realize I want other benefits also and want to switch to another plan?",
      answer: "You can switch to any other Prime plan at any time. The price difference will be adjusted accordingly, and you'll have access to all the benefits of the new plan immediately."
    },
    {
      question: "How do I buy Prime Video ad-free?",
      answer: "Prime Video ad-free is included with Prime membership. Simply log in to primevideo.com or use the Prime Video app to start watching without ads."
    },
    {
      question: "How do I cancel my plan?",
      answer: "You can cancel your Prime membership anytime by visiting Your Account settings. Go to Manage Your Prime Membership and follow the instructions to cancel."
    },
    {
      question: "How many devices can be used simultaneously on a Prime subscription?",
      answer: "You can stream up to three different titles at the same time using the same account. For Prime Video, you can watch on up to three devices simultaneously."
    },
    {
      question: "Can I turn off/on auto-renewal during the course of my membership?",
      answer: "Yes, you can manage your auto-renewal settings at any time from Your Account. Go to Manage Your Prime Membership to toggle auto-renewal on or off."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Benefits Card Component
const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
    <div className="text-blue-600 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// More Benefits Card Component
const MoreBenefitCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
    <div className="text-blue-600 mb-3">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Main Prime Page Component
const PrimePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Blue Gradient */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and CTA */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Prime</h1>
              <p className="text-xl md:text-2xl mb-6">One membership, many benefits</p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors">
                Become a member today
              </button>
            </div>
            
            {/* Right Side - Pricing Table */}
            <div>
              <PricingTable />
            </div>
          </div>
        </div>
      </div>

      {/* Plan Selector Floating Card */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl p-6 w-72 z-50 border border-gray-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Choose your plan</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="font-semibold text-gray-900">Prime Shopping</div>
            <div className="text-blue-600 font-bold">₹399/year</div>
          </button>
          <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
            <div className="font-semibold text-gray-900">Prime Lite</div>
            <div className="text-gray-600">₹799/year</div>
          </button>
          <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
            <div className="font-semibold text-gray-900">Prime</div>
            <div className="text-gray-600">₹299/month or ₹1,499/year</div>
          </button>
        </div>
        <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors">
          Join Prime Shopping Edition
        </button>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Check out what's included with Prime:</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard 
              icon={
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Fast, free delivery"
              description="Get free fast delivery on millions of eligible items"
            />
            <BenefitCard 
              icon={
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              title="Popular movies & shows"
              description="Stream thousands of popular movies and TV episodes"
            />
            <BenefitCard 
              icon={
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Exclusive deals & savings"
              description="Get exclusive deals and early access to sales"
            />
          </div>
        </div>
      </div>

      {/* More Prime Benefits Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Prime benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <MoreBenefitCard 
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              }
              title="Prime Music"
              description="Get the largest catalog of music & top podcasts ad-free"
            />
            <MoreBenefitCard 
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              }
              title="Prime Gaming"
              description="Get games, a Twitch channel subscription & in-game content"
            />
            <MoreBenefitCard 
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="Prime Reading"
              description="Read as much as you want from hundreds of eligible ebooks"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <FAQAccordion />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrimePage;

