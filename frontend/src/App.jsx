import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Fresh from "./pages/Fresh/Fresh";
import SellOnMarket from "./pages/SellOnMarket";
import Bestsellers from "./pages/Bestsellers";
import BestsellerCategory from "./pages/BestsellerCategory";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import SellerDashboard from "./pages/SellerDashboard";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import SmartphoneDealsPage from "./pages/SmartphoneDealsPage";
import SmartphonesListPage from "./pages/SmartphonesListPage";
import PrimePage from "./pages/PrimePage";
import BooksBazaar from "./pages/BooksBazaar";
import ComputerAccessories from "./pages/ComputerAccessories";
import Toys from "./pages/Toys";
import ToysCategory from "./pages/ToysCategory";
import HomeKitchen from "./pages/HomeKitchen";
import HotNewReleases from "./pages/HotNewReleases";
import AmazonFashion from "./pages/amazon-fashion";
import Electronics from "./pages/electronics";
import Help from "./pages/Help";
import AttaRiceGrains from "./pages/Fresh/AttaRiceGrains.jsx";
import RiceProducts from "./pages/Fresh/RiceProducts.jsx";
import WholeGrains from "./pages/Fresh/WholeGrains.jsx";
import Poha from "./pages/Fresh/Poha.jsx";
import DynamicFreshSubcategory from "./pages/Fresh/DynamicFreshSubcategory.jsx";
import Millets from "./pages/Fresh/Millets.jsx";
import AccessoriesPage from "./pages/AccessoriesPage.jsx";
import LimitedAccessoriesDeals from "./pages/LimitedAccessoriesDeals.jsx";
import FashionCategory from "./pages/FashionCategory.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import LocationProvider from "./context/LocationContext.jsx";

function App() {

  return (
    <BrowserRouter>
<AuthProvider>
        <LocationProvider>
          <Navbar/>
          <Routes>

        <Route path="/" element={<Home/>}/>
<Route path="/books" element={<BooksBazaar/>}/>
        <Route path="/books/:id" element={<ProductDetails/>}/>
        <Route path="/smartphones" element={<SmartphoneDealsPage />} />
        <Route path="/smartphones/budget" element={<SmartphonesListPage isBudget={true} />} />
        <Route path="/smartphones/accessories" element={<AccessoriesPage />} />
        <Route path="/smartphones/accessories-deals" element={<LimitedAccessoriesDeals />} />

        <Route path="/smartphones/more" element={<SmartphonesListPage />} />
        <Route path="/smartphones/hotdeals" element={<SmartphonesListPage />} />
        <Route path="/computers" element={<ComputerAccessories/>}/>
        <Route path="/prime" element={<PrimePage/>}/>
        <Route path="/fresh" element={<Fresh/>}/>\n        <Route path="/fresh/:subcategory" element={<DynamicFreshSubcategory />} />\n        <Route path="/fresh/atta-rice-grains" element={<AttaRiceGrains/>}/>
        <Route path="/fresh/atta-flours" element={<AttaRiceGrains/>}/>
        <Route path="/fresh/rice" element={<RiceProducts/>}/>
        <Route path="/fresh/poha" element={<Poha/>}/>
        <Route path="/fresh/millets" element={<Millets/>}/>
        <Route path="/fresh/whole grains" element={<WholeGrains/>}/>
        <Route path="/sell" element={<SellOnMarket/>}/>
<Route path="/bestsellers" element={<Bestsellers/>}/>
        <Route path="/bestsellers/:category" element={<BestsellerCategory />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>\n        <Route path="/smartphones/:id" element={<ProductDetails/>}/>\n        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/toys/:category" element={<ToysCategory />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/home-kitchen" element={<HomeKitchen />} />
        <Route path="/hot-new-releases" element={<HotNewReleases />} />
        <Route path="/fashion" element={<AmazonFashion />} />
<Route path="/electronics" element={<Electronics />} />
        <Route path="/help" element={<Help />} />
        
        {/* Fashion Category Routes */}
        <Route path="/fashion/women" element={<FashionCategory />} />
        <Route path="/fashion/women-accessories" element={<FashionCategory />} />
        <Route path="/fashion/women-clothing" element={<FashionCategory />} />
        <Route path="/fashion/women-handbags" element={<FashionCategory />} />
        <Route path="/fashion/women-health" element={<FashionCategory />} />
        <Route path="/fashion/women-jewelry" element={<FashionCategory />} />
        <Route path="/fashion/women-shoes" element={<FashionCategory />} />
        <Route path="/fashion/women-watches" element={<FashionCategory />} />
        <Route path="/fashion/men" element={<FashionCategory />} />
        <Route path="/fashion/men-accessories" element={<FashionCategory />} />
        <Route path="/fashion/men-clothing" element={<FashionCategory />} />
        <Route path="/fashion/men-jewelry" element={<FashionCategory />} />
        <Route path="/fashion/men-shoes" element={<FashionCategory />} />
        <Route path="/fashion/men-watches" element={<FashionCategory />} />
        <Route path="/fashion/sporting-apparel" element={<FashionCategory />} />
        <Route path="/fashion/sport-clothing" element={<FashionCategory />} />
        <Route path="/fashion/shaving-hair-removal" element={<FashionCategory />} />
        <Route path="/fashion/shelf-brackets" element={<FashionCategory />} />
<Route path="/fashion/jewelry-accessories" element={<FashionCategory />} />
        <Route path="/fashion/perfume" element={<FashionCategory />} />
        <Route path="/fashion/kids" element={<FashionCategory />} />
        <Route path="/fashion/bags-luggage" element={<FashionCategory />} />
        <Route path="/fashion/deals" element={<FashionCategory />} />
      </Routes>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

