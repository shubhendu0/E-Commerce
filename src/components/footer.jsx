import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@mui/icons-material";
import { styled, Box } from '@mui/material';
import { mobile } from "../responsive";
  

  const Container = styled(Box)`
    width: 99vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0px 0px;
    width: 30vw;
    ${mobile({ width : "99vw" })}
  `;
  
  const Desc = styled('p')`
    margin-bottom: 20px;
    font-size: 14px;
  `;
  
  const SocialContainer = styled(Box)`
    display: flex;
  `;
  
  const SocialIcon = styled(Box)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
  `;
  
  const Center = styled(Box)`
    padding: 0px;
    margin: 0;
    width: 30vw;
    ${mobile({ width : "99vw", padding : "30px" })}
  `;
  
  const Title = styled('p')`
    margin-bottom: 20px;
    font-size: 24px;
  `;
  
  const List = styled('ul')`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled('li')`
    width: 50%;
    margin-bottom: 10px;
    font-size: 14px;
  `;
  
  const Right = styled(Box)`
    padding: 0px;
    margin: 0;
    width: 30vw;
    ${mobile({ width : "99vw", padding : "30px" })}
  `;
  
  const ContactItem = styled(Box)`
    margin-bottom: 20px;
    display: flex;
    font-size: 14px;
  `;
  
  const Payment = styled('img')`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Title>About Us</Title>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px", fontSize:"18px"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            odio sem, congue quis quam eu, bibendum dapibus leo. Pellentesque
            maximus sapien ultrices fringilla feugiat.
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px", fontSize:"18px"}}/> +1 234 56 7890
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px", fontSize:"18px"}} /> contact@xyz
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;
