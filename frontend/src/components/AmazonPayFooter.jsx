import React from 'react';

const AmazonPayFooter = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Get to Know Us */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Get to Know Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:underline transition-colors">About Amazon</a></li>
              <li><a href="#" className="hover:underline transition-colors">Careers</a></li>
              <li><a href="#" className="hover:underline transition-colors">Press Releases</a></li>
              <li><a href="#" className="hover:underline transition-colors">Amazon Science</a></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Connect with Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:underline transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:underline transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:underline transition-colors">Instagram</a></li>
            </ul>
          </div>

          {/* Make Money With Us */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Make Money With Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:underline transition-colors">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline transition-colors">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:underline transition-colors">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:underline transition-colors">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:underline transition-colors">Supply to Amazon</a></li>
              <li><a href="#" className="hover:underline transition-colors">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline transition-colors">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:underline transition-colors">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline transition-colors">Amazon Pay on Merchants</a></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Let Us Help You</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:underline transition-colors">Your Account</a></li>
              <li><a href="#" className="hover:underline transition-colors">Returns Centre</a></li>
              <li><a href="#" className="hover:underline transition-colors">Recalls and Product Safety Alerts</a></li>
              <li><a href="#" className="hover:underline transition-colors">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:underline transition-colors">Amazon App Download</a></li>
              <li><a href="#" className="hover:underline transition-colors">Help</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 pb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 lg:mb-0">
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none">
                <option>English</option>
              </select>
              <span>|</span>
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none">
                <option>India</option>
              </select>
            </div>
            <div className="text-xs text-gray-400">
              © 2024 Amazon.com, Inc. or its affiliates
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AmazonPayFooter;

