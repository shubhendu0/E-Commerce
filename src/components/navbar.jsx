import Sidebar from "./sidebar";
import { ShoppingCartOutlined, FavoriteBorder, Menu } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { styled, Box, AppBar, IconButton, Badge} from '@mui/material';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWishlist } from "../redux/wishlist/wishlistActions";
import { getCart } from "../redux/cart/cartActions";
import logo from "../assets/logo4.jpg"
import Search from "./searchBar";

const Container = styled(AppBar)`
  height: 60px;
  width: 100vw;  
  z-index: 3;
  position: sticky;
  background-color: white;
  ${mobile({ height: "50px", width: "98" })}
`;

const Wrapper = styled(Box)`
  height: 60px;
  width: 100%;
  padding: 10px 0px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ height: "50px", padding: "0px 10px" })}
`;

const Left = styled(Box)`
  padding: 5px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Center = styled(Box)`
  width: 30vw;
  text-align: center;
  align-items: center;
  ${mobile({ width:"61vw", position: "absolute", right:"0px" })}
`;

const Logo = styled('img')`
  height: 50px;
  width: 100px;
  cursor: pointer;
  ${mobile({ height: "40px" })}
`

const Right = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ visibility: "hidden" })}
`;

const MenuItem = styled(Box)`
  font-size: 14px;
  padding: 0px 0px;
  margin-left: 10px;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoggedIn} = useSelector((state) => state.auth);
  const wishlist = useSelector(state => state.wishlist.wishlist) || [];
  const cart = useSelector(state => state.cart.cart) || [];
  const mode = useSelector((state) => state.theme.mode);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userName = user?.name || "";
  const userId = user?._id || "";
  const [ wishlistQuantity, setWishlistQuantity ] = useState(0);
  const [ cartQuantity, setCartQuantity] = useState(0);

  const handleWishlistRoute = () => {
    navigate("/wishlist")
  }

  const handleCartRoute = () => {
    navigate("/cart")
  }

  useEffect(()=>{
    if(user && isLoggedIn){
      dispatch(getWishlist(`?id=${userId}&sortOrder=1`));
    }
  },[user])

  useEffect(()=>{
    if(user && isLoggedIn){
      dispatch(getCart(`${userId}`));
    }
  },[user])

  useEffect(() => {
    setWishlistQuantity(wishlist.length)
  },[wishlist, user])

  useEffect(() => {
    setCartQuantity(cart.length)
  },[cart, user])


  return (
    <Container sx={{ backgroundColor: `${ mode === "light" ? "white" : "black"}`}}>
      <Wrapper>
        <Left>
          <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr : 1 }}
          onClick={() => setIsDrawerOpen(true)}
          >
            <Menu style={{ fontSize: 22 }}/>
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
          <Sidebar
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
          />
          </Box>
          <Logo src={logo} onClick={() => navigate('/')}/>
         </Left>
         <Center>
           <Search/>
         </Center>
         <Right>
           {
            isLoggedIn ? 
            <MenuItem onClick={() => navigate('/profile')}> {userName} </MenuItem>
            :
            <MenuItem onClick={() => navigate('/login')}> LOGIN </MenuItem>
           }
           <MenuItem onClick={handleWishlistRoute}>
            <Badge badgeContent={wishlistQuantity} color="success">
              <FavoriteBorder style={{ fontSize: 18 }}/>
            </Badge>
           </MenuItem>          
           <MenuItem onClick={handleCartRoute}>
            <Badge badgeContent={cartQuantity} color="success" >
              <ShoppingCartOutlined style={{ fontSize: 18 }}/>
            </Badge>            
           </MenuItem>
         </Right>
       </Wrapper>
    </Container>
  );
};

export default Navbar;
