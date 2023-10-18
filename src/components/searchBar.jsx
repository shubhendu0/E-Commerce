import { mobile } from "../responsive";
import { InputBase, Box, List, ListItem, styled } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchedProducts } from "../redux/products/productActions";

const SearchContainer = styled(Box)`
  width: 400px;
  height: 80%;
  padding: 0px 5px;
  border-radius: 5px;
  border: 0.5px solid white;
  color: black;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  ${mobile({ width:"100%", marginRight: "3px" })}
`

const InputSearchBase = styled(InputBase)`
  paddingLeft: 10px;
  width: 100%;
  color: black;
`

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 3px;
  display: flex;
  color: black;
`;

const ListWrapper = styled(List)`
  width: 100%;
  position: absolute;
  left: 35%;
  color: black;
  background: white;
  padding: 10px;
  margin-top: 50px;
  max-height: 500px;
  overflow-Y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ width:"100%", left: "0px"  })}
`;

const SearchedItem = styled(ListItem)`
   background-color: inherit;
   text-decoration: none;
   color: black;
   ${mobile({ width:"100%", left: "0px"  })}
`

const ItemInfo = styled(Box)`
    display: flex;
    flex-direction: row;
    justifyContent: center;
    align-items: center;
`

const Image = styled('img')`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    ${mobile({ width:"40px", height: "40px"  })}
`

const Title = styled('p')`
    font-size: 16px;
    ${mobile({ fontSize: "12px" })}
`

const SearchBar = () => {
  const [text, setText] = useState("");
  const searchedProducts  = useSelector((state) => state.product.searchedProducts) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedProducts(`?search=${text}`));
  }, [text]);

  const getText = (text) => {
    setText(text);
  };

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />
      {
        !text 
        ?
        <SearchIconWrapper>
          <Search/>
        </SearchIconWrapper>
        :
        <SearchIconWrapper>
          <Close onClick={() => setText("")} style={{ cursor: "pointer"}}/>
        </SearchIconWrapper>
      }

      {text && (
        <ListWrapper style={{ width: "inherit" }}>
        {
            searchedProducts
            .filter((product) =>
              product.title.toLowerCase().includes(text.toLowerCase())
            )
            .map((product) => (
              <SearchedItem>
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "black" }}
                >
                    <ItemInfo>
                        <Image src={product.img}/>
                        <Title> {product.title} </Title>
                    </ItemInfo>
                </Link>
              </SearchedItem>
            ))
        }
        </ListWrapper>
      )}
    </SearchContainer>
  );
};
export default SearchBar;