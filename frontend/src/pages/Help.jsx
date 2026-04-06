import React from 'react';
import Navbar from '../components/Navbar';
import AlertBanner from '../components/AlertBanner';
import HelpCard from '../components/HelpCard';
import HelpTopicList from '../components/HelpTopicList';
import AmazonPayFooter from '../components/AmazonPayFooter';

const Help = () => {
  const helpCards = [
    {
      icon: '📦',
      title: 'Your Orders',
      description: 'Track packages\nEdit or cancel orders',
      link: '#'
    },
    {
      icon: '↩️',
      title: 'Returns and Refunds',
      description: 'Return or exchange items\nPrint return mailing labels',
      link: '#'
    },
    {
      icon: '📍',
      title: 'Manage Addresses',
      description: 'Update your addresses\nAdd address, landmark details',
      link: '#'
    },
    {
      icon: '👑',
      title: 'Manage Prime',
      description: 'View your benefits\nMembership details',
      link: '#'
    },
    {
      icon: '💳',
      title: 'Payment Settings',
      description: 'Add or edit payment methods\nChange expired debit or credit card',
      link: '#'
    },
    {
      icon: '⚙️',
      title: 'Account Settings',
      description: 'Change your email or password\nUpdate login information',
      link: '#'
    },
    {
      icon: '📱',
      title: 'Digital Services and Device Support',
      description: 'Find device help and support\nTroubleshoot device issues',
      link: '#'
    }
  ];

  const leftTopics = [
    'Shipping & Delivery',
    'Returns, Refunds, Replacement',
    'Ordering',
    'Managing Your Account',
    'Amazon Prime',
    'Payments & Pricing',
    'Amazon Pay',
    'Product Troubleshooting',
    'Amazon Bazaar',
    'Devices & Digital Services (D2S)',
    'More Help (D2S)',
    'Amazon Business',
    'Other Topics & More Help',
    'Self Service'
  ];

  const middleTopics = [
    'Tracking your Package',
    'Shipping and Delivery',
    'Undeliverable Packages',
    'Damaged and Defective Products - FAQ',
    'Accepted Payment Methods',
    'Amazon Pay Gift Cards',
    'Returns, Replacements and Refunds',
    'More Support Options'
  ];

  const rightTopics = [
    'Manage Your Returns',
    'Check the Status of your Refund',
    'Change Your Language Preference',
    'Sign Up for Amazon Prime',
    'View Amazon Pay Transactions',
    'Manage Your Payment Methods',
    'Product Troubleshooting – All Help Topics',
    'Self-Service Video Library'
  ];

  return (
    <div className="pt-[130px] min-h-screen bg-[#f3f3f3]">
      
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        {/* Alert Banners */}
        <div className="max-w-4xl mx-auto mb-12">
          <AlertBanner>
            You can view the content of this page in your preferred language, by clicking here. For detailed steps on how to change your language settings, see our Help page.
          </AlertBanner>
          
          <AlertBanner>
            For information on our live sale events, including promotions, deals, cashbacks, and quick solutions, refer to our Help page on Sale Events.
          </AlertBanner>
          
          <AlertBanner>
            For support during your shopping journey, refer to the Customer Service - Frequently Asked Questions Help page.
          </AlertBanner>
        </div>

        {/* Main Title */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello. What can we help you with?</h1>
        </div>

        {/* Quick Help Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto">Some things you can do here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {helpCards.map((card, index) => (
              <HelpCard key={index} {...card} />
            ))}
          </div>
        </section>

        {/* Search Help */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find more solutions</h2>
          <p className="text-gray-600 mb-6 text-lg">Type something like, "question about a charge"</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for help" 
              className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Browse Help Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 max-w-6xl mx-auto">Browse Help Topics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <HelpTopicList title="Recommended Topics" topics={leftTopics} />
            </div>
            <div className="lg:col-span-1">
              <HelpTopicList title="Learn how to..." topics={middleTopics} />
            </div>
            <div className="lg:col-span-1">
              <HelpTopicList title="Try it Yourself" topics={rightTopics} />
            </div>
          </div>
        </section>

        {/* Back to Top */}
        <div className="text-center mb-16">
          <a href="#top" className="inline-block bg-white px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors">
            Back to top
          </a>
        </div>
      </div>

      <AmazonPayFooter />
    </div>
  );
};

export default Help;

