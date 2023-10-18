import React, { useEffect, useState } from 'react';
import { styled, Box } from '@mui/material';
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser, updateUser } from '../../redux/user/userActions';

const Container = styled(Box)`
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrapper = styled(Box)`
  width: 50%;
  padding: 0px;
  z-index: 2;
  ${mobile({ width: "95%" })}
`;

const Title = styled('p')`
  width: 100%;
  margin-top: 10px;
  font-size: 26px;
  text-align: center;
  font-family: Arial;
  letter-spacing : 5px;
`;

const Form = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormItem = styled(Box)`
  width: 70%;
  display: flex;
  margin: 0px;
  padding: 0px 5px;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "95%" })}
`

const Text = styled('p')`
  font-size: 18px;
  ${mobile({ fontSize : "16px" })}
`

const InputField = styled('input')`
  padding: 10px;
  width: 60%;
  border: 1px solid gray;
  border-radius: 5px;
  ${mobile({ width: "60%" })}
`

const Button = styled('button')`
  width: 200px;
  margin: 20px;
  border: none;
  border-radius: 7px;
  padding: 20px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  ${mobile({width: "200px", fontSize: "18px" })}
`;

const Profile = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user._id)
    const user = useSelector(state => state.user.user)
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();    
    const [phone1, setPhone1] = useState(user?.phone1 || 91);
    const [phone2, setPhone2] = useState(user?.phone2 || 91);
    const [address1, setAddress1] = useState(user?.address?.address1 || "");
    const [address2, setAddress2] = useState(user?.address?.address2 || "");
    const [city, setCity] = useState(user?.address?.city || "");
    const [pincode, setPincode] = useState(user?.address?.pincode || "");
    const [state, setState] = useState(user?.address?.state || "");
    const [country, setCountry] = useState(user?.address?.country || "");

    useEffect(() => {
      dispatch(getUser(userId));
    },[])

    useEffect(() => {
      setPhone1(user?.phone1 || 91)
      setAddress1(user?.address?.address1 || "")
    },[])

    const handleUpdate = (e) => {
      e.preventDefault(); 
      if(!name || !password || !phone1 || !address1 || !city || !pincode || !state || !country){
        return toast.error("Please fill the necessary fields.");
      }
      else if(password!== password2){
        return toast.error("Password does not match.");
      }
      const userData = {
        name: name,
        password: password,
        phone1: phone1,
        phone2: phone2,
        address: {
          address1: address1,
          address2: address2,
          city: city,
          pincode: pincode,
          state: state,
          country: country
        }
      }
      dispatch(updateUser({userId, userData}))
    }

  return (
    <Container>
        <Title> Edit Profile </Title>
        <Wrapper>
            <Form>
              <FormItem>
                <Text> Name </Text>
                <InputField
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  required
                />
              </FormItem>
              <FormItem>
                <Text> Email </Text>
                <InputField
                  value={email}
                  disabled
                />
              </FormItem>
              <FormItem>
                <Text> Password </Text>
                <InputField
                  type='password'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                />
              </FormItem>
              <FormItem>
                <Text> Confirm Password </Text>
                <InputField
                  type='password'
                  value={password2}
                  onChange={(e)=> setPassword2(e.target.value)}
                  required
                />
              </FormItem> 
              <FormItem>
                <Text> Phone No.1 </Text>
                <InputField
                  value={phone1}
                  onChange={(e)=> setPhone1(e.target.value)}
                  required
                />
              </FormItem> 
              <FormItem>
                <Text> Phone No.2 </Text>
                <InputField
                  value={phone2}
                  onChange={(e)=> setPhone2(e.target.value)}
                />
              </FormItem>              
            </Form>           
        </Wrapper>
        <Wrapper>
            <Form>
            <FormItem>
                <Text> Address 1 </Text>
                <InputField
                  value={address1}
                  onChange={(e)=> setAddress1(e.target.value)}
                  required
                />
              </FormItem>        
              <FormItem>
                <Text> Address 2 </Text>
                <InputField
                  value={address2}
                  onChange={(e)=> setAddress2(e.target.value)}
                />
              </FormItem>   
              <FormItem>
                <Text> City </Text>
                <InputField
                  value={city}
                  onChange={(e)=> setCity(e.target.value)}
                  required
                />
              </FormItem>   
              <FormItem>
                <Text> Pin-code </Text>
                <InputField
                  value={pincode}
                  onChange={(e)=> setPincode(e.target.value)}
                  required
                />
              </FormItem> 
              <FormItem>
                <Text> State </Text>
                <InputField
                  value={state}
                  onChange={(e)=> setState(e.target.value)}
                  required
                />
              </FormItem>  
              <FormItem>
                <Text> Country </Text>
                <InputField
                  value={country}
                  onChange={(e)=> setCountry(e.target.value)}
                  required
                />
              </FormItem> 
            </Form>
        </Wrapper>
        <Button onClick={handleUpdate}> Update Profile </Button>
    </Container>
  )
}

export default Profile