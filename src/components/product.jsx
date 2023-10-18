import { Add, Remove } from "@mui/icons-material";
import { styled, Box } from '@mui/material';
import { mobile } from "../responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/products/productActions";
import { addToCart } from "../redux/cart/cartActions";
import { toast } from "react-toastify";

const Container = styled(Box)``;

const Wrapper = styled(Box)`
  padding: 40px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled(Box)`
  flex: 1;
  height: 80vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Image = styled('img')`
  width: 70%;
  height: 90%;
  object-fit: cover;
  ${mobile({ height: "50vh" })}
`;

const InfoContainer = styled(Box)`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled('h2')`
  font-weight: 200;
  margin: 0;
  font-family: Lucida Console;
  letter-spacing : 1px;
`;

const Price = styled('p')`
  font-weight: 100;
  font-size: 20px;
  font-family: Lucida Console;
  letter-spacing : 1px;
`;

const Desc = styled('p')`
  font-size: 16px;
  font-weight: 100;
  font-family: Lucida Console;
  letter-spacing : 1px;
`

const FilterContainer = styled(Box)`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled(Box)`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled('span')`
  font-size: 20px;
  font-weight: 200;
  font-family: Lucida Console;
  letter-spacing : 1px;
`;

const FilterColor = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled('select')`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled('option')``;

const AddContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({ width: "100%"})}
`;

const AmountContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

const Amount = styled('span')`
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 25px;
  font-family: Lucida Console;
  letter-spacing : 1px;
`;

const TotalPrice = styled('p')`
  width: 100%;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  font-family: Lucida Console;
  letter-spacing : 1px;
`;

const ButtonWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`

const AddButton = styled('button')`
  width: 50%;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  &:hover {
    background-color: #bdbdbd;
  }
`;

const NavigateButton = styled('button')`
  width: 50%;
  padding: 15px;
  border: 2px solid teal;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  &:hover {
    background-color: #26a69a;
  }
`;

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = useSelector(state => state.product.product) || {};
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const userId = user?._id || "651febd99e2c18bf877e4129"
  const [product, setProduct] = useState(item);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(()=>{
    dispatch(getProduct(`?userId=${userId}&productId=${params.id}`));
  },[])

  useEffect(()=>{
    setProduct(item)
  },[item])

  useEffect(()=>{
    if(product){
      setPrice(product.price);
      setColor(product.color[0]);
      setSize(product.size[0]);
    }
  },[product])

  useEffect(()=>{
    setTotalPrice(price * quantity)
  },[product, quantity])

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } 
    else {
      setQuantity(quantity + 1);
    }
  };


  const sendToCart = () => {
    if(user && isLoggedIn && color && size){
      const userId = user._id
      const data = {
        product : item._id,
        quantity: quantity,
        color : color,
        size : size
      }
      dispatch(addToCart({userId, data}));
      navigate("/cart");
    }
    else{
      toast.error("You are not logged in or missing preferences",{
        toastId : "error"
      });
    }
  }

  const goToCart = () => {
    if(user && isLoggedIn){
      navigate("/cart");
    }
    else{
      toast.error("You are not logged in.",{
        toastId : "error"
      });
    }
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Price>Rs. {product.price}</Price>
          <Desc> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            odio sem, congue quis quam eu, bibendum dapibus leo. Pellentesque
            maximus sapien ultrices fringilla feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            odio sem, congue quis quam eu, bibendum dapibus leo. Pellentesque
            maximus sapien ultrices fringilla feugiat.
          </Desc>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color : </FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}> {s} </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount> {quantity} </Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <TotalPrice> Payable Amount : Rs.{totalPrice}</TotalPrice>
            <ButtonWrapper>
            {
              product.isInCart
              ?
              <NavigateButton onClick={goToCart}> GO TO CART</NavigateButton>
              :
              <AddButton onClick={sendToCart}>ADD TO CART</AddButton>
            }
            </ButtonWrapper>
        </AddContainer>
        </InfoContainer>        
      </Wrapper>
    </Container>
  );
};

export default Product;