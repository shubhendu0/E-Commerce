import react, { useState, useEffect } from "react";
import { styled, Box } from '@mui/material';
import { login, loginWithGoogle } from "../../redux/auth/authActions";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";


const Container = styled(Box)`
  width: 100vw;
  height: 90vh;
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
  z-index: 2;
  background-color: white;
  ${mobile({ width: "65%" })}
`;

const Title = styled('h1')`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  color: black;
`;

const Form = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled('input')`
  flex: 1;
  min-width: 35%;
  margin: 10px 0;
  padding: 10px;
  ${mobile({ width: "75%" })}
`;

const Button = styled('button')`
  width: 40%;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  ${mobile({width: "100px", fontSize: "16px" })}
`;

const Link = styled('a')`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({fontSize: "10px" })};
  color: black;
`;

const Error = styled('span')`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.auth);
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth )
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, isSuccess])

  const handleLogin = (e) => {
    e.preventDefault();  
    if (!email || !password) {
      return alert("All fields are required");
    } 
    const userData = {
      email,
      password
    } 
    dispatch(login(userData));
  }

  const handleGoogleLogin = async (credentialResponse) => {
    dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    )
  }


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error> Something went wrong... </Error>}
          <Link onClick={()=>navigate("/register")}> CREATE A NEW ACCOUNT </Link>
          <GoogleLogin
            padding="10px"
            onSuccess={handleGoogleLogin}
            onError={() => {
              toast.error("Login Failed");
            }}
          /> 
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
