import { useEffect, useState } from "react";
import { mobile } from "../../responsive";
import { styled, Box, Grid, Card, FormControl, InputLabel, Select, MenuItem,} from '@mui/material/';
import { Favorite, ShoppingCart, AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/productCard";
import { getWishlist, updateWishlist } from "../../redux/wishlist/wishlistActions";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cart/cartActions";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  width: 99vw;
  margin-top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Bar = styled(Box)`
  width: 100%;
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width:"99vw", padding: "7px 19px", flexDirection:"column"  })}
`;


const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  ${mobile({ justifyContent:"center" })}
`;

const StyledCard = styled(Card)`
  width: 180px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  alignItems: center;
  justify-content: center;
  ${mobile({})}
`

const Title = styled('h1')`
  font-size: 35px;
  font-family: Raleway;
  ${mobile({ fontSize: "25px" })}
`;

const ButtonWrapper = styled('Box')`
    width: auto;
    margin: 0;
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RemoveButton = styled(Favorite)`
  color: red;
  margin-top: 0px;
  cursor: pointer;
`

const AddCart = styled(AddShoppingCart)`
  color: gray;
  margin-top: 0px;
  cursor: pointer;
`

const OpenCart = styled(ShoppingCart)`
  color: green;
  margin-top: 0px;
  cursor: pointer;
`

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=> state.auth.user)
  const wishlist = useSelector(state=> state.wishlist.wishlist) || [];
  const cart = useSelector(state=> state.cart.cart) || [];
  const [products, setProducts] = useState(wishlist);
  const [sortValue, setSortValue] = useState(1);

  useEffect(()=>{
    dispatch(getWishlist(`?id=${user._id}&sortOrder=${sortValue}`));
  },[sortValue])


  useEffect(() => {
    setProducts(wishlist);
  }, [wishlist]);

  const handleRemove = (item) => {
    if(user && item){
      dispatch(updateWishlist(`?userId=${user._id}&product=${item.product._id}`))
    }
    else{
      toast.error("Something went wrong",{
        toastId : "error"
      });
    }
  }

  const sendToCart = (item) => {
      const userId = user._id
      const data = {
        product : item._id,
        color : item.color[0],
        size : item.size[0]
      }
      dispatch(addToCart({userId, data}));
    }

  const goToCart = () => {
    navigate("/cart")
  }

  return (
    <Container>     
      <Bar>
        <Box>
          <Title> Wishlist </Title>
        </Box>
        <Box>     
          <FormControl sx={{ m: 0, minWidth: 150 }} size="small" >
            <InputLabel id="select"> Sort-By </InputLabel>
            <Select
            autoWidth
            value={sortValue}
            label="Sorted"
            labelId="select"
            onChange={(e)=> setSortValue(e.target.value)}
            >
              <MenuItem value={1}> Older First </MenuItem>
              <MenuItem value={-1}> Recently Added </MenuItem>
            </Select>
          </FormControl> 
        </Box>       
      </Bar>             
        {
          products.length > 0
          ?
          (
            <Wrapper>  
              <Grid container spacing={2}>
                {products.map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
                    <StyledCard>
                      <ProductCard item={item.product} key={item._id}/>
                      <ButtonWrapper>
                        <RemoveButton 
                        onClick={() => handleRemove(item)}
                        style={{ fontSize: 18 }}
                        />
                        {
                          cart.some(cartItem => cartItem.product._id === item.product._id)
                          ?
                          <OpenCart 
                          style={{ fontSize: 18 }}
                          onClick={goToCart}  
                          />
                          :
                          <AddCart 
                          style={{ fontSize: 18 }}
                          onClick={() => sendToCart(item.product)}  
                          /> 
                        }
                    </ButtonWrapper>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Wrapper> 
          )
          :
          null
        }      
    </Container>
  );
};

export default Wishlist;