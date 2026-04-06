import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import AccountSection from '../components/AccountSection';
import { AuthContext } from '../context/AuthContext';

const Account = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const topCards = [
    { icon: '📦', title: 'Your Orders', description: 'Track, return, or buy things again', link: '/orders' },
    { icon: '🔐', title: 'Login & Security', description: 'Edit login, name, and mobile number', link: '/security' },
    { icon: '⭐', title: 'Prime', description: 'View benefits and payment settings', link: '/prime' },
    { icon: '📍', title: 'Your Addresses', description: 'Edit addresses for orders and gifts', link: '/addresses' },
    { icon: '🏢', title: 'Your Business Account', description: 'Business-specific settings and tools', link: '/business' },
    { icon: '💳', title: 'Payment Options', description: 'Add or edit payment methods', link: '/payments' },
    { icon: '💰', title: 'Amazon Pay Balance', description: 'Manage your Amazon Money balance', link: '/pay' },
  ];

  const sections = [
    {
      title: 'Digital content and devices',
      links: [
        { label: 'Apps and more', url: '/apps' },
        { label: 'Content and devices', url: '/content' },
        { label: 'Digital gifts you\'ve received', url: '/gifts' },
        { label: 'Digital and device forum', url: '/forum' },
      ]
    },
    {
      title: 'Email alerts, messages and ads',
      links: [
        { label: 'Advertising preferences', url: '/ads' },
        { label: 'Communication preferences', url: '/communications' },
        { label: 'SMS alert preferences', url: '/sms' },
        { label: 'Message Centre', url: '/messages' },
        { label: 'Alexa shopping notifications', url: '/alexa' },
      ]
    },
    {
      title: 'More ways to pay',
      links: [
        { label: 'Default purchase settings', url: '/default-settings' },
        { label: 'Amazon Pay', url: '/amazon-pay' },
        { label: 'Coupons', url: '/coupons' },
      ]
    },
    {
      title: 'Ordering and shopping preferences',
      links: [
        { label: 'Leave packaging feedback', url: '/packaging' },
        { label: 'Lists', url: '/lists' },
        { label: 'Manage saved IDs', url: '/saved-ids' },
        { label: 'Your shopping preferences', url: '/shopping-prefs' },
        { label: 'Your content', url: '/your-content' },
        { label: 'Language settings', url: '/language' },
      ]
    },
    {
      title: 'Other accounts',
      links: [
        { label: 'Account linking', url: '/link-account' },
        { label: 'Seller account', url: '/seller' },
        { label: 'Amazon Web Services', url: '/aws' },
      ]
    },
    {
      title: 'Shopping programs and rentals',
      links: [
        { label: 'Manage your Amazon Family', url: '/family' },
        { label: 'Subscribe & Save', url: '/subscribe' },
        { label: 'Shop the Kids\' Store by age', url: '/kids-store' },
      ]
    },
    {
      title: 'Subscriptions',
      links: [
        { label: 'Email', url: '/email-subs' },
        { label: 'Memberships & Subscriptions', url: '/memberships' },
      ]
    },
    {
      title: 'Manage your data',
      links: [
        { label: 'Request your data', url: '/request-data' },
        { label: 'Manage apps and services with data access', url: '/data-access' },
        { label: 'Close your account', url: '/close-account' },
        { label: 'Privacy notice', url: '/privacy' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Section - Cards Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Settings and shopping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topCards.map((card, index) => (
              <AccountCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                link={card.link}
              />
            ))}
          </div>
        </div>

        {/* Lower Sections - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sections.map((section, index) => (
            <AccountSection
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        {/* Sign-in Prompt */}
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">See personalized recommendations</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-8 py-2 rounded-lg transition-colors w-full sm:w-auto"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-600">
              New customer?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Start here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

