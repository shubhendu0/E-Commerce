import { useEffect, useState } from "react";
import { mobile } from "../../responsive";
import { styled, Box } from '@mui/material/';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCard from "./cartCard";
import { toast } from "react-toastify";
import { getCart } from "../../redux/cart/cartActions";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Container = styled(Box)`
  width: 99vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Bar = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${mobile({ width:"99vw", padding: "7px 19px", flexDirection:"column"  })}
`;

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  margin-bottom: 0px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  ${mobile({ width:"90%", padding: "0px 0px", justifyContent:"center" })}
`;

const ProductList = styled(Box)`
  width: 60vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${mobile({ width:"90%", padding: "0px 0px", justifyContent:"center" })}
`;

const StyledCard = styled(Box)`
  padding-bottom: 20px;
  margin: 10px 50px;
  display: flex;
  flex-direction: column;
  alignItems: center;
  border: none;
  ${mobile({ width: "100%", margin:"10px 5px"})}
`

const Title = styled('p')`
  font-size: 25px;
  font-family: Lucida Console;
  letter-spacing: 2px;
  ${mobile({ fontSize: "20px" })}
`;

const BillContainer = styled(Box)`
  min-width: 280px;
  height: 350px;
  padding: 5px;
  position: sticky;
  top: 80px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 0.5px solid;
  border-radius: 10px;
  ${mobile({ width:"60vw",height:"340px", position: "relative", top: "10px",  margin:"0px"})}
`;

const BillTitle = styled('p')`
  font-size: 24px;
  font-weight: 200;
  font-family: Lucida Console;
  letter-spacing: 2px;
  margin: 0;
`

const BillWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`

const BillRow = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BillItem = styled('p')`
  font-size: 16px;
  font-family: Lucida Console;
`

const BillTotal = styled('p')`
  font-size: 20px;
  font-weight: 200;
  font-family: Lucida Console;
`

const BillButton = styled('button')`
  width: 180px;
  padding: 10px;
  border: none;
  border-radius: 2px;
  background-color: #f50057;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=> state.auth.user)
  const cart = useSelector(state=> state.cart.cart) || [];
  const [products, setProducts] = useState(cart);
  const [grandTotal, setGrandTotal] = useState();
  const [stripeToken, setStripeToken] = useState(null);
  
  useEffect(()=>{
    dispatch(getCart(`${user._id}`));
  },[])

  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  useEffect(() => {
    const t = products.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    },0)
    setGrandTotal(t);
  },[products])

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: grandTotal - 500 + 50,
        });
        navigate("/success", {
          stripeData: res.data,
          cart: cart, 
        });
      } 
      catch {
        toast.error("Order Failed",{
          toastId : "error"
        });
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);


  return (
    <Container>     
      <Bar>
          <Title> Your Cart </Title>    
      </Bar>             
        {
          products.length > 0
          ?
          (
            <>
            <Wrapper>  
              <ProductList>
                {products.map((item) => (
                  <StyledCard>
                    <CartCard item={item} key={item._id}/>
                  </StyledCard>
                ))}
              </ProductList>
              <BillContainer>
                <BillTitle> ORDER SUMMARY </BillTitle>
                <BillWrapper>
                  <BillRow>
                    <BillItem>
                      Total MRP
                    </BillItem>
                    <BillItem>
                      Rs. {grandTotal}
                    </BillItem>
                  </BillRow>
                  <BillRow>
                    <BillItem>
                      Total Discounts
                    </BillItem>
                    <BillItem>
                      - Rs. 500
                    </BillItem>
                  </BillRow>
                  <BillRow>
                    <BillItem>
                      Shipping Charges
                    </BillItem>
                    <BillItem>
                      Rs. 50
                    </BillItem>
                  </BillRow>
                  <BillRow>
                    <BillTotal>
                      Total
                    </BillTotal>
                    <BillTotal>
                      Rs. {grandTotal - 500 + 50}
                    </BillTotal>
                  </BillRow>
                </BillWrapper>
                
                <StripeCheckout
                  name="FASHION SHOP"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is Rs. ${grandTotal - 500 + 50}`}
                  amount={grandTotal - 500 + 50}
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                  <BillButton> PROCEED TO PAY </BillButton>
                </StripeCheckout>
              </BillContainer>
            </Wrapper> 
            </>
          )
          :
          null
        }      

    </Container>
  );
};

export default Wishlist;
