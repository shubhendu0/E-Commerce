import { styled, Box } from '@mui/material';
import { mobile } from "../responsive";

const Container = styled(Box)`
  width: 99vw;
  height: 85vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  min-width: 30%;
  padding: 20px;
  background-color: white;
  text-align: center;
  ${mobile({ width: "40%" })}
`;

const Title = styled('h1')`
  font-size: 34px;
  font-weight: 300;
  letter-spacing: 3px;
  color: black;
`;


const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <Title> Page Not Found. </Title>
      </Wrapper>
    </Container>
  );
};

export default NotFound;