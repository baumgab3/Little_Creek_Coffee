import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './components/AboutUs/Contact';
import Home from "./components/Home/Home";
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import OurStory from './components/AboutUs/OurStory';
import Sandbox from './components/Sandbox';
import BrewingChange from './components/AboutUs/BrewingChange';
import InsideLittleCreek from './components/AboutUs/InsideLittleCreek';
import ShopContainer from './components/Shop/ShopContainer';
import ProductShowcase from './components/Shop/ProductShowcase';
import Cart from './components/Checkout/Cart';
import { CartProvider } from './components/context/CartContext';
import CreateAccount from './components/CreateAccount';
import { UserProvider } from './components/context/UserContext';
import PastOrder from './components/Orders/PastOrder';
import UserOrders from './components/Orders/UserOrders';
import UserAddress from './components/User/UserAddress';
import UserAccountDetails from './components/Orders/UserAccountDetails';
import Dashboard from './components/Dashboard';
import AddressForm from './components/User/AddressForm';
import Footer from './components/Footer/Footer';
import SearchResults from './components/SearchResults';
import Checkout from './components/Checkout/Checkout';
import VisitCafe from './components/Cafes/VisitCafe';

function App() {
  const drawerWidth = 240;

  return (
    <>
    <Router>
    <UserProvider>
    <CartProvider>
      <Navbar drawerWidth={drawerWidth} />
      
      <Box>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/home" element={ <Home/> } />

          {/* Accounts */}
          <Route exact path="/login" element={ <Login/> } /> 
          <Route exact path="/create-account" element={ <CreateAccount /> } /> 
          <Route exact path="/my-account" element={ <Dashboard/> } />
          <Route exact path="/my-orders" element={ <UserOrders /> } />
          <Route exact path="/my-orders/:orderId" element={ <PastOrder /> } />
          <Route exact path="/my-account/edit-address" element={ <UserAddress /> } />
          <Route exact path="/my-account/edit-account" element={ <UserAccountDetails /> } />
          <Route exact path="/my-account/edit-address/:addressType" element={ <AddressForm /> } />

          

          {/* Shop */}
          <Route exact path="/product-category/:param1/:param2?" element={ <ShopContainer /> } /> 
          <Route exact path="/product/:param1" element={ <ProductShowcase /> } /> 
          <Route exact path="/product/:param1/:args" element={ <ProductShowcase /> } /> 

          {/* Search */}
          <Route exact path="/search/:params?" element={ <SearchResults /> } /> 


          {/* CAFES */}
          <Route exact path="/cafes" element={ <VisitCafe/> } />


          {/* About Us */}
          <Route exact path="/contact" element={ <Contact/> } />
          <Route exact path="/our-story" element={ <OurStory/> } />
          <Route exact path="/brewing-change" element={ <BrewingChange/> } />
          <Route exact path="/abc-corporation" element={ <InsideLittleCreek/> } />

          {/* Checkout */}
          <Route exact path="/cart" element={ <Cart/> } />
          <Route exact path="/checkout" element={ <Checkout/> } />

          {/* Sandbox */}
          <Route exact path="/sandbox" element={ <Sandbox/> } />

        </Routes>
      </Box>

    {/*  */}
      <Footer /> 

    </CartProvider>
    </UserProvider>
    </Router>

    </>
  );
}

export default App;
