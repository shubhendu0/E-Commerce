import { useEffect, useState } from "react";
import { mobile } from "../../responsive";
import { styled, AppBar, Box, Grid, Card, Pagination, PaginationItem } from '@mui/material/';
import { ArrowBack, ArrowForward, FilterAlt, Cancel, Favorite, FavoriteBorder, AddShoppingCart, ShoppingCart, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard";
import { addFavorite, updateWishlist } from "../../redux/wishlist/wishlistActions";
import { addToCart } from "../../redux/cart/cartActions";
import { toast } from "react-toastify";
import FilterBar from "../../components/filterBar";
import { getProducts } from "../../redux/products/productActions";


const Container = styled(Box)`
  width: 99vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${mobile({ padding: "0px", flexDirection:"column", alignItems:"center" })}
`;

const FilterWrapper = styled(AppBar)`
  display: flex;
  width: 18%;
  width: 240px;
  position: sticky;
  left: 0px;
  top: 70px;
  height: 65vh;
  min-height: 350px;
  margin: 0;
  align-items: center;
  border: none;
  background-color: #eeeeee;
  z-index: 2;
  transition: 0.5 all;
  ${mobile({ display: "none", position:"fixed", top: "100px", left:"15vw", width: "70vw", height: "350px"})}
`;

const CloseFilter = styled(Cancel)`
  font-size: 30px;
  position: absolute;
  top: 0;
  right: 0;
  color: #2196f3;
  cursor: pointer;
`

const FilterButton = styled(AppBar)`
  width: 140px;
  position: sticky;
  bottom: 10px;
  left: 0%;
  padding: 10px;
  margin: auto 0px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 7px;
  background-color: #2196f3;
  cursor: pointer;
  z-index: 1;
  letter-spacing: 2px;
  transition: transform 0.15s ease-in-out;
    :hover {
        transform: scale3d(1.1, 1.1, 3);
        background-color: #64b5f6;;
    }
  ${mobile({ display: "flex", flexDirection: "row", justifyContent: "center"})}
`

const ProductWrapper = styled(Box)`
  display: flex;
  width: 82%;
  flex-direction: column;
  margin: 0px 0px;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%"})}
`;

const StyledCard = styled(Card)`
  width: 180px;
  margin: 15px auto;
  padding: 0px;
  display: flex;
  alignItems: center;
  flex-direction: column;
  justify-content: center;
  border: none;
  ${mobile({ })}
`

const ButtonWrapper = styled(Box)`
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

const AddButton = styled(FavoriteBorder)`
  color: gray;
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

const Products = () => {
  const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const qCategory = queryParams.get('category');
    const qBrand = queryParams.get('brand');
    const qMinPrice = queryParams.get('minPrice');
    const qMaxPrice = queryParams.get('maxPrice');
    const qSortBy = queryParams.get('sortBy');
    const qSortOrder = queryParams.get('sortOrder');
  const {user, isLoggedIn} = useSelector(state=> state.auth);
  const productsArr = useSelector(state=> state.product.products) || [];
  const wishlist = useSelector(state=> state.wishlist.wishlist) || [];
  const cart = useSelector(state=> state.cart.cart) || [];
  const [userId, setUserId] = useState("651febd99e2c18bf877e4129");
  const [products, setProducts] = useState(productsArr);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if(user && isLoggedIn){
      setUserId(user._id)
    }
  },[user])
  
  useEffect(()=>{
    setCurrentPage(1);
    dispatch(getProducts(`?userId=${userId}&category=${qCategory}&brand=${qBrand}&minPrice=${qMinPrice}&maxPrice=${qMaxPrice}&sortBy=${qSortBy}&sortOrder=${qSortOrder}&page=${currentPage}&limit=16`));
  },[userId, qCategory, qBrand, qMinPrice, qMaxPrice, qSortBy, qSortOrder])

  useEffect(() => {
    setProducts(productsArr);
  }, [productsArr]);

  useEffect(() => {
    dispatch(getProducts(`?userId=${userId}&category=${qCategory}&brand=${qBrand}&minPrice=${qMinPrice}&maxPrice=${qMaxPrice}&sortBy=${qSortBy}&sortOrder=${qSortOrder}&page=${currentPage}&limit=16`));
  },[currentPage, wishlist, cart ])

  const handleRemove = (item) => {
    if(user._id && item._id){
      dispatch(updateWishlist(`?userId=${user._id}&product=${item._id}`))
    }
    else{
      toast.error("Something went wrong",{
        toastId : "error"
      });
    }
  }

  const addToWishlist = (item) => {
    if(user && isLoggedIn){
      const data = {
        userId : user._id,
        product : item._id
      }
      dispatch(addFavorite(data));
    }
    else{
      toast.error("You are not logged in.",{
        toastId : "error"
      });
    }
  };

  const sendToCart = (item) => {
    if(user && isLoggedIn){
      const userId = user._id
      const data = {
        product : item._id,
        color : item.color[0],
        size : item.size[0]
      }
      dispatch(addToCart({userId, data}));
    }
    else{
      toast.error("You are not logged in.",{
        toastId : "error"
      });
    }
  }

  const goToCart = () => {
    if(user && isLoggedIn){
      navigate("/cart")
    }
    else{
      toast.error("You are not logged in.",{
        toastId : "error"
      });
    }
  }

  return (
    <Container>    
      <FilterWrapper style={{display: filterOpen ? 'block' : 'none'}}>
        <FilterBar/>
        {
          filterOpen
          ? <CloseFilter onClick={() => setFilterOpen(false)}/>
          : null
        }
      </FilterWrapper>

      <ProductWrapper>
          <Grid container spacing={2}>
          {
            products.map((item) => (
            <Grid item xs={6} sm={4} md={4} lg={3} xl={1} key={item._id}> 
            <StyledCard key={item._id}>
              <ProductCard item={item} key={item._id} />
              <ButtonWrapper>
                  {
                    item.isInWishlist
                    ?
                    <RemoveButton 
                    style={{ fontSize: 18 }}
                    onClick={() => handleRemove(item)}
                    />
                    :
                    <AddButton
                      style={{ fontSize: 18 }}
                      onClick={() => addToWishlist(item)}
                    />
                  }
                  {
                    item.isInCart
                    ?
                    <OpenCart 
                    style={{ fontSize: 18 }}
                    onClick={goToCart}  
                    />
                    :
                    <AddCart 
                    style={{ fontSize: 18 }}
                    onClick={() => sendToCart(item)}  
                    />             
                  }
                </ButtonWrapper>
            </StyledCard>
            </Grid>
          ))}
          </Grid>
          {
            !filterOpen
            ? <FilterButton onClick={() => setFilterOpen(!filterOpen)}> Filter <FilterAlt/> </FilterButton>
            : null
          }
        <Pagination 
        sx={{
          marginTop : "70px"
        }}
        count={10}        
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
        />     
      </ProductWrapper>   
    </Container>
  );
};

export default Products;
