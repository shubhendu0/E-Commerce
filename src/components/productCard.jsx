import { mobile } from "../responsive";
import { styled, Box } from '@mui/material/';
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  width: 180px;
  height: 280px;
  margin: 0;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  ${mobile({ width:"180px", height:"230px", margin:"0px"})}
`;

const Image = styled('img')`
  width: 180px;
  height: 230px;
  object-fit: cover;
  ${mobile({ width: "180px", height: "190px" })}
`;

const Info = styled(Box)`
  width: 180px;
  height: 50px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding : 0px 8px;
`;

const Title = styled('p')`
    margin: 0;
    font-size: 14px;
    font-weight: 540;
    text-align: left;
    letter-spacing : 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${mobile({ fontSize: "11px" })}
`;

const Price = styled('p')`
    font-size: 12px;
    font-family: Arial;
    margin-bottom: 0px;
    text-align: left;
    letter-spacing : 2px;
    ${mobile({ fontSize: "9px" })}
`;


const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  
  const handleClick = ()=>{
    navigate(`/product/${item._id}`)
  }

  return (
    <>
      { 
        item ?
        (
          <Container>
            <Image src={item.img}  onClick={handleClick}/>
            <Info>
              <Title>{item.title}</Title>
              <Price> Rs. {item.price}</Price>              
            </Info>
          </Container>
        )
        :
        null
      }
    </>
  );
};

export default ProductCard;