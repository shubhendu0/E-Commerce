import { createTheme, ThemeProvider, CssBaseline, styled, Box } from '@mui/material';
import { useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import Footer from "./components/footer";
import Newsletter from "./components/newsletter";
import ProtectedRoute from './components/protected';
import Home from "./pages/home/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Product from "./components/product";
import Profile from "./pages/profile/profile";
import Products from "./pages/products/products";
import Wishlist from "./pages/wishlist/wishlist";
import Cart from "./pages/cart/cart";
import Success from "./pages/cart/success";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { themeSettings } from './redux/theme/themePalette';
import NotFound from './components/notFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from './redux/auth/authActions';
import { GoogleOAuthProvider } from "@react-oauth/google";


axios.defaults.withCredentials = true;

const Container = styled(Box)`
  width: 100vw;
  height: auto;
  margin: 0px;
  display: flex;
  z-index: 3;
  ${'' /* transition: all 0.2s ease; */}
`;

const App = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn} = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  useEffect(()=>{
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    } 
  }, [isLoggedIn, user])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
      <ToastContainer 
          position='top-right'
          autoClose={500}
          newestOnTop
          pauseOnHover
          closeOnClick
          theme="dark"
          limit={2}
      />
      
        <Router>      
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Container>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/*" element={<NotFound/>}/>                  
              <Route path="/products/" element={<Products/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route element={<ProtectedRoute/>} >
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/success" element={<Success/>}/>
              </Route> 
            </Routes>
            <Newsletter/>
            <Footer/>
            </Container>
          </GoogleOAuthProvider>        
        </Router>
      
    </ThemeProvider>
  );
};

export default App;
