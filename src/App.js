import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  { useAuth } from './components/AuthProvider';
import Contact from './components/AboutUs/Contact';
import Home from "./components/Home/Home";
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import OurStory from './components/AboutUs/OurStory';
import ProductCategoryList from './components/ProductCategoryList';
import Sandbox from './components/Sandbox';
import UserDashboard from './components/UserDashboard.js';
import BrewingChange from './components/AboutUs/BrewingChange';


function App() {
  const drawerWidth = 240;
  const {auth} = useAuth();

  return (
    <Router>
      <Navbar drawerWidth={drawerWidth} />
      
      <Box>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/home" element={ <Home/> } />
          {!auth ? <Route exact path="/my-account" element={ <Login/> } /> : <Route exact path="/my-account" element={ <UserDashboard/> } /> }

          {/* About Us */}
          <Route exact path="/contact" element={ <Contact/> } />
          <Route exact path="/our-story" element={ <OurStory/> } />
          <Route exact path="/brewing-change" element={ <BrewingChange/> } />


          {/* Sandbox */}
          <Route exact path="/sandbox" element={ <Sandbox/> } />
          <Route exact path="/product-category/:category" element={ <ProductCategoryList/> } />
        </Routes>
      </Box>

    </Router>   
  );
}

export default App;
