import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AmazonPaySidebar from '../components/AmazonPaySidebar';
import IconCard from '../components/IconCard';
import PaySection from '../components/PaySection';
import PromoBanner from '../components/PromoBanner';
import AmazonPayFooter from '../components/AmazonPayFooter';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/account');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="pt-[130px] min-h-screen bg-[#f3f3f3]"> {/* Offset for sticky navbar */}
      
      <div className="max-w-screen-2xl mx-auto px-4 py-8 lg:py-12 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-80 lg:shrink-0 hidden lg:block">
            <AmazonPaySidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Travel Section - 4 icons but spec says 3 */}
            <PaySection title="Travel">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <IconCard icon="✈️" label="Flights" />
                <IconCard icon="🚌" label="Bus Tickets" />
                <IconCard icon="🚂" label="Trains" />
              </div>
            </PaySection>

            {/* Recharges */}
            <PaySection title="Recharges">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <IconCard icon="📱" label="Mobile Recharge" />
                <IconCard icon="📦" label="App Store Code" />
                <IconCard icon="📺" label="DTH Recharge" />
                <IconCard icon="⚡" label="Google Play Recharge" />
              </div>
            </PaySection>

            {/* Bill Payments - 2 rows: Row1 7 icons, Row2 6 icons */}
            <PaySection title="Bill Payments">
              {/* Row 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                <IconCard icon="⚡" label="Electricity" />
                <IconCard icon="📱" label="Mobile Postpaid" />
                <IconCard icon="💳" label="Credit Card Bill" />
                <IconCard icon="🏛️" label="Loan Repayment" />
                <IconCard icon="💧" label="LPG" />
                <IconCard icon="🛡️" label="Insurance Premium" />
                <IconCard icon="📍" label="Piped Gas" />
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <IconCard icon="💧" label="Water Bill" />
                <IconCard icon="📞" label="Landline" />
                <IconCard icon="📶" label="Broadband" />
                <IconCard icon="🏛️" label="Municipal Tax" />
                <IconCard icon="📺" label="Cable TV" />
                <IconCard icon="📚" label="Education Fees" />
              </div>
            </PaySection>

            {/* Daily Transit */}
            <PaySection title="Daily Transit">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <IconCard icon="🛡️" label="Amazon Pay ICICI FASTag" />
                <IconCard icon="🏷️" label="FASTag Recharge" />
                <IconCard icon="🗺️" label="Metro Recharge" />
              </div>
            </PaySection>

            {/* Insurance */}
            <PaySection title="Insurance">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <IconCard icon="🚗" label="Car Insurance" />
                <IconCard icon="🏍️" label="Bike Insurance" />
              </div>
            </PaySection>

            {/* Gift Cards and Vouchers - 7 icons */}
            <PaySection title="Gift Cards and Vouchers">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <IconCard icon="🎁" label="Add Gift Card" />
                <IconCard icon="🎁" label="Gift Cards" />
                <IconCard icon="🏷️" label="Amazon Vouchers" />
                <IconCard icon="⭐" label="Brand Vouchers" />
                <IconCard icon="💝" label="Birthday Giftcards" />
                <IconCard icon="💝" label="Wedding Giftcards" />
                <IconCard icon="💼" label="Corporate Gifting" />
              </div>
            </PaySection>

            {/* Manage - 8 icons */}
            <PaySection title="Manage">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <IconCard icon="📄" label="Your Transactions" />
                <IconCard icon="🏆" label="Your Rewards" />
                <IconCard icon="💖" label="COVID-19 Donation" />
                <IconCard icon="💳" label="EMI" />
                <IconCard icon="💳" label="Your Saved Cards" />
                <IconCard icon="📄" label="Help and FAQs" />
                <IconCard icon="📄" label="Lodge a complaint" />
                <IconCard icon="📄" label="Complaint History" />
              </div>
            </PaySection>

            {/* Promotional Banners - 5 banners */}
            <PromoBanner 
              title="Pay anyone, anywhere" 
              description="Send money to friends and family instantly" 
            />
            <PromoBanner 
              title="Pay bills or recharge" 
              description="Pay all your bills and recharge mobile, DTH, FASTag" 
            />
            <PromoBanner 
              title="Order food, medicines & more" 
              description="Pay online with Amazon Pay for food delivery and pharmacy" 
            />
            <PromoBanner 
              title="Book train tickets" 
              description="(Zero payment gateway charges)" 
            />
            <PromoBanner 
              title="Buy vehicle insurance" 
              description="(as easy as recharge)" 
            />

            {/* Logout */}
            <div className="text-center mt-12">
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </main>
        </div>
      </div>

      <AmazonPayFooter />
    </div>
  );
};

export default Dashboard;

