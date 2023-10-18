import { Send } from "@mui/icons-material";
import { styled, Box } from '@mui/material';
import { mobile } from "../responsive";

const Container = styled(Box)`
  height: 50vh;
  width: 99vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  ${mobile({ height: "30vh" })}
`;

const Title = styled('p')`
  font-size: 40px;
  margin-bottom: 0px;
  ${mobile({ fontSize: "35px" })}
`;

const Desc = styled('p')`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled(Box)`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled('input')`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled('button')`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;