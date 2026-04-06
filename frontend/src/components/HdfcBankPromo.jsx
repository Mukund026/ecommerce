const HdfcBankPromo = () => {
  return (
    <section className="mb-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src="/src/assets/hdfc-bank-logo.png"
            alt="HDFC Bank"
            className="w-32 h-12 object-contain mb-6"
/>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Up to <span className="text-yellow-300">₹4500</span> Instant Discount
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            On Credit Card and EMI Transactions
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-all shadow-lg">
            Shop Now
          </button>
        </div>
        <div className="text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                💳
              </div>
              <p className="font-bold text-sm">Credit Cards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                📱
              </div>
              <p className="font-bold text-sm">EMI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                ⚡
              </div>
              <p className="font-bold text-sm">Instant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HdfcBankPromo;
