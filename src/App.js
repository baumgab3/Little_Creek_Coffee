import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from "./components/Home";
import Navbar from './components/Navbar/Navbar';
import ProductCategoryList from './components/ProductCategoryList';
import Sandbox from './components/Sandbox';

function App() {
  const drawerWidth = 240;

  return (
    <Router>
      <Navbar drawerWidth={drawerWidth} />
      
      <Container sx={{ flexGrow: 1, p: 15, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/home" element={ <Home/> } />
          <Route exact path="/about" element={ <About/> } />
          <Route exact path="/sandbox" element={ <Sandbox/> } />
          <Route exact path="/product-category/:category" element={ <ProductCategoryList/> } />

        </Routes>
      </Container>
    </Router>   
  );
}

export default App;
