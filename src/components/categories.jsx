import { styled, Box, Card } from '@mui/material';
import { categories } from "../assets/data";
import { mobile } from "../responsive";
import CategoryItem from "./categoryItem";

const Container = styled(Box)`
  width: 99vw;
  display: flex;
  padding: 0px;
  margin: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  margin-top: 0px;
  flex-direction: row;
  justify-content: center;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "0px",
  margin: "20px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.15s ease-in-out",
  border: "none",
  "&:hover": { transform: "scale3d(1.1, 1.1, 3)", filter: 'grayscale(100%)' },
}))

const Title = styled('h1')`
  font-size: 30px;
  font-family: Raleway;
  ${mobile({ fontSize: "20px" })}
`;

const Categories = () => {
  return (
    <Container>
      <Title>  SHOP BY CATEGORY  </Title>
      <Wrapper>          
        {categories.map((item) => (
          <StyledCard key={item.id} >
            <CategoryItem item={item} key={item.id} />
          </StyledCard>
        ))}
      </Wrapper> 
    </Container>
  );
};

export default Categories;
