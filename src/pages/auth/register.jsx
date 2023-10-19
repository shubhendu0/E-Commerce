import react, { useState, useEffect } from 'react';
import { styled, Box } from '@mui/material';
import { mobile } from "../../responsive";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { register } from "../../redux/auth/authActions";


const Container = styled(Box)`
  width: 100vw;
  height: 90vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  width: 50%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  ${mobile({height:"480px", width: "72%" })}
`;

const Title = styled('h1')`
  font-size: 22px;
  font-weight: 500;
  color: black;
  ${mobile({ fontSize: "20px" })}
`;

const Form = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled('input')`
  flex: 1;
  min-width: 50%;
  max-width: 60%;
  margin: 20px 10px 0px 0px;
  padding: 8px;
  color: black;
`;

const Agreement = styled('span')`
  font-size: 14px;
  margin: 20px 0px;
  color: black;
  ${mobile({fontSize: "12px" })}
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
  color: black;
`;

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegister = (e) => {
      e.preventDefault(); 
      if (!name || !email || !password || !password2) {
          toast.error("All fields are required");
      }
      if (password.length < 6) {
          toast.error("Password must be up to 6 characters");
      }
      if (password !== password2) {
          toast.error("Passwords do not match");
      }     
      const userData = {
          name,
          email,
          password,
      }
      dispatch(register(userData));
  }

  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth )
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, isSuccess])

    return (
      <Container>
        <Wrapper>
          <Form>
            <Title>CREATE AN ACCOUNT</Title>
            <Input 
              placeholder="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <Input 
              placeholder="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="confirm password" 
              value={password2}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <Agreement>
                By creating an account, I consent to the processing of my personal
                data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleRegister}>REGISTER</Button>
            <Link onClick={()=>navigate("/login")}>ALREADY HAVE AN ACCOUNT? Click Here</Link>
          </Form>
        </Wrapper>
      </Container>
    );
};

export default Register;
