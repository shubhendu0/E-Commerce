import { useNavigate } from "react-router-dom";
import { styled, Box } from '@mui/material';
import { mobile } from "../../responsive";
import { Delete, Remove, Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeProduct, updateCart } from "../../redux/cart/cartActions";

const Container = styled(Box)`
  min-width: 52vw;
  height: 150px;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  border: none;
  ${mobile({ width:"79vw", height:"150px", margin:"0px"})}
`;

const ImageContainer = styled(Box)`
  width: 30%;
  height: 100%;
  align-items: center;
  cursor: pointer;
  ${mobile({width: "30%" , height: "100%" })}
`

const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ })}
`;

const Wrapper = styled('Box')`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    ${mobile({ flexDirection : "column"  })}
`;

const InfoContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${mobile({width: "90%" , height: "70%" })}
`;

const Info = styled(Box)`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  ${mobile({  })}
`;

const DeleteButton = styled(Delete)`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  top: 0;
  padding: 0px;
  margin: 5px;
  cursor: pointer;
  ${mobile({ margin: "2px" })}
`

const Title = styled('p')`
    font-size: 16px;
    font-weight: 550;
    text-align: left;
    text-overflow: hidden;
    font-family: Lucida Console;
    letter-spacing : 1px;
    ${mobile({ fontSize: "12px" })}
`;

const Price = styled('p')`
    font-size: 13px;
    font-family: Georgia;
    margin: 0;
    text-align: left;
    letter-spacing : 2px;
    ${mobile({ fontSize: "10px" })}
`;

const Color = styled('p')`
    font-size: 13px;
    font-family: Georgia;
    margin: 0;
    text-align: left;
    letter-spacing : 2px;
    ${mobile({ fontSize: "10px" })}
`;

const Size = styled('p')`
    font-size: 13px;
    font-family: Georgia;
    margin: 0;
    text-align: left;
    letter-spacing : 2px;
    ${mobile({ fontSize: "10px" })}
`;

const Total = styled('Box')`
    width: 30%;
    padding: 10px;
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    justify-content: center;
    ${mobile({ width: "100%", marginTop: "5px", flexDirection : "row" , justifyContent: "space-around" })}
`;

const QuantityContainer = styled('Box')`
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${mobile({ height: "16px" })}
`;

const DecreaseButton = styled(Remove)`
  cursor: pointer;
`

const IncreaseButton = styled(Add)`
  cursor: pointer;
`

const Quantity = styled('p')`
  width: 30px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-family: Georgia;
  ${mobile({ fontSize: "16px" })}
`

const AmountContainer = styled('Box')`
    height: 50px;
    padding: 5px;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    ${mobile({ height:"15px"})}
`;

const Amount = styled('p')`
    font-size: 18px;
    font-family: Georgia;
    ${mobile({ height:"15px", fontSize: "14px" })}
`


const CartCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState( item.product.price)
  const {user} = useSelector(state=> state.auth)

  const handleClick = ()=>{
    navigate(`/product/${item._id}`)
  }

  useEffect(()=>{
    setTotal(item.product.price * quantity);
  },[quantity])

  const handleRemove = () => {
    if(quantity > 1){
      setQuantity(quantity-1);
      const query = `?userId=${user._id}`
      const productData = {
        product : item._id,
        quantity: quantity-1,
        size: item.size,
        color: item.color
      }
      const data = { query, productData}
      dispatch(updateCart(data))
    }
    else{
      return;
    }
  }

  const handleAdd = () => {
    if(quantity < 10){
      setQuantity(quantity+1);
      const query = `?userId=${user._id}`
      const productData = {
        product : item._id,
        quantity: quantity+1,
        size: item.size,
        color: item.color
      }
      const data = { query, productData}
      dispatch(updateCart(data))
    }
    else{
      return;
    }
  }

  const handleDelete = () => {
    if(user && item){
      dispatch(removeProduct(`?userId=${user._id}&product=${item.product._id}`))
    }
  }

  return (
    <>
      { 
        item ?
        (
          <Container>
            <ImageContainer onClick={() => navigate(`/product/${item.product._id}`)}>
              <Image src={item.product.img}  onClick={handleClick}/>
            </ImageContainer>
            <Wrapper>
              <InfoContainer>
                <Info>                
                  <Title>{item.product.title}</Title>
                  <Price> Price : Rs. {item.product.price}</Price>
                  <Color> Color : {item.color} </Color>
                  <Size> Size : {item.size} </Size>
                </Info>
              </InfoContainer>                         
              <Total>
                <QuantityContainer>
                  <DecreaseButton onClick={handleRemove} style={{ fontSize: 24 }}/>
                  <Quantity> {quantity} </Quantity>
                  <IncreaseButton onClick={handleAdd} style={{ fontSize: 24 }}/>
                </QuantityContainer>
                <AmountContainer> 
                  <Amount> Rs. {total} </Amount>
                </AmountContainer>
              </Total>            
            </Wrapper>
            <DeleteButton onClick={handleDelete} style={{ fontSize: 20 }}/>
          </Container>
        )
        :
        null
      }
    </>
  );
};

export default CartCard;