import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { logout } from "../redux/auth/authActions";
import { 
    styled,
    Box, 
    Drawer, 
    IconButton,
    List, 
    ListItem,
    ListItemButton,
    Divider,
    ListItemIcon,
    ListItemText,
    Badge
} from '@mui/material';
import { 
    MenuOpen,
    Home,
    Person,
    Login,
    Logout,
    DarkMode,
    ShoppingCartOutlined, 
    FavoriteBorder,
    Settings
} from "@mui/icons-material";
import { setMode } from '../redux/theme/themeSlice';
import { reset as resetCart } from '../redux/cart/cartSlice';
import { reset as resetWishlist } from '../redux/wishlist/wishlistSlice';



const Container = styled(Box)`
  height: auto;
  margin-bottom: 15px;
  z-index: 5;
  opacity: 1;
`;

const Wrapper = styled(Box)`
    width: 180px; 
    role: presentation; 
    align-items: center;
    text-align: center;
    ${mobile({ width: "170px" })}
`;

const Sidebar = ({isDrawerOpen, setIsDrawerOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlist = useSelector(state => state.wishlist.wishlist) || [];
    const [wishlistQuantity, setWishlistQuantity] = useState(0);
    const cart = useSelector(state => state.cart.cart) || []
    const [ cartQuantity, setCartQuantity] = useState(0)

    useEffect(() => {
        setIsDrawerOpen(isDrawerOpen);
    })

    useEffect(() => {
        setWishlistQuantity(wishlist.length)
    },[wishlist])

    useEffect(() => {
        setCartQuantity(cart.length)
    },[cart])

    const {isLoggedIn, user} = useSelector((state) => state.auth);

    const navigateHome = async () => {
        navigate("/");
        setIsDrawerOpen(false);
    }

    const navigateLogin = async () => {
        navigate("/login");
        setIsDrawerOpen(false);
    }

    const handleWishlistRoute = () => {
        if(user && isLoggedIn){
          navigate("/wishlist")
          setIsDrawerOpen(false)
        }
        else{
          navigate("/login")
          setIsDrawerOpen(false)
        }
    }
    
    const handleCartRoute = () => {
        if(user && isLoggedIn){
          navigate("/cart")
          setIsDrawerOpen(false)
        }
        else{
          navigate("/login")
          setIsDrawerOpen(false)
        }
    }

    const navigateProfile = () => {
        navigate("/profile");
        setIsDrawerOpen(false);     
    }

    const logoutUser = async () => {
        dispatch(logout());
        dispatch(resetCart());
        dispatch(resetWishlist())
        navigate("/");
        setIsDrawerOpen(false);
    }

    const handleTheme = async () => {
        dispatch(setMode())
        setIsDrawerOpen(false);
    }

    const navigateSettings = async () => {
        navigate("/settings");
        setIsDrawerOpen(false);
    }

    return (
        <>
            <Container>
                <Drawer
                anchor='left'
                variant="persistent"
                open={isDrawerOpen}
                >
                    <Wrapper>
                        <IconButton onClick={() => setIsDrawerOpen(false)}>
                            <MenuOpen style={{ fontSize: 24 }}/> 
                        </IconButton> 
                        
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={navigateHome}>
                                    <ListItemIcon>
                                        <Home style={{ fontSize: 24 }}/>
                                    </ListItemIcon>                             
                                    <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Home"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={handleWishlistRoute}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Badge badgeContent={wishlistQuantity} color="success" padding="0px">
                                            <FavoriteBorder style={{ fontSize: 22 }}/>
                                        </Badge>
                                    </ListItemIcon>                             
                                    <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Wishlist"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={handleCartRoute}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Badge badgeContent={cartQuantity} color="success" padding="0px">
                                            <ShoppingCartOutlined style={{ fontSize: 22 }}/>
                                        </Badge> 
                                    </ListItemIcon>                             
                                    <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Cart"/>
                                </ListItemButton>
                            </ListItem>
                            {
                                isLoggedIn 
                                ?
                                (
                                    <>
                                        <ListItem disablePadding >
                                            <ListItemButton onClick={navigateProfile}>
                                                <ListItemIcon>
                                                    <Person style={{ fontSize: 24 }}/>
                                                </ListItemIcon>                             
                                                <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Profile"/>
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton onClick={logoutUser}>
                                                <ListItemIcon>
                                                    <Logout style={{ fontSize: 22 }}/>
                                                </ListItemIcon>                             
                                                <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Logout"/>
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                                :
                                <ListItem disablePadding>
                                        <ListItemButton onClick={navigateLogin}>
                                            <ListItemIcon>
                                                <Login style={{ fontSize: 22 }}/>
                                            </ListItemIcon>                             
                                            <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Login"/>
                                        </ListItemButton>
                                </ListItem>
                            }                       
                        </List>
                        <Divider/>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleTheme}>
                                    <ListItemIcon>
                                        <DarkMode style={{ fontSize: 22 }}/>
                                    </ListItemIcon>                             
                                    <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Mode"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={navigateSettings}>
                                    <ListItemIcon>
                                        <Settings style={{ fontSize: 22 }}/>
                                    </ListItemIcon>                             
                                    <ListItemText primaryTypographyProps={{fontSize: '16px'}}  primary="Settings"/>
                                </ListItemButton>
                            </ListItem>                            
                        </List>
                    </Wrapper>
                </Drawer>
            </Container>
            
        </>
    )
}

export default Sidebar;