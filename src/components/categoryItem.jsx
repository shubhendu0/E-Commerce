import { useNavigate } from "react-router-dom";
import { styled, Box } from '@mui/material';
import { mobile } from "../responsive";
import { resetProducts } from "../redux/products/productSlice";
import { useDispatch } from "react-redux";


const Container = styled(Box)`
  flex: 1;
  width: 190px;
  height: 280px;
  position: relative;
  align-items: center;
  border: none;
  cursor: pointer;
  ${mobile({ height: "24vh" })}
`;

const Image = styled('img')`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.15s ease-in-out;
  ${mobile({ height: "24vh" })}
`;

const Info = styled(Box)`
  position: absolute;
  top: 0;
  left: 40;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none,;
`;

const Title = styled('h1')`
    color:white;
    font-size:20px;
    text-align: center;
`;

const Button = styled('button')`
    border:none;
    padding: 5px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('category', item.cat);
    newSearchParams.set('brand', "all");
    newSearchParams.set('minPrice', "0");
    newSearchParams.set('maxPrice', "50000");
    newSearchParams.set('sortBy', "title");
    newSearchParams.set('sortOrder', "1");
    dispatch(resetProducts());
    navigate(`/products?${newSearchParams.toString()}`);
  }

  return (
    <Container onClick={handleNavigation}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
    </Container>
  );
};

export default CategoryItem;
