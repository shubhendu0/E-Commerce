import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { styled, Box, Slider } from '@mui/material/';
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';

const Container = styled(Box)`
    width: 95%;
    height: auto;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled(Box)`
    width: 100%;
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    ${mobile({ width: "90%", })}
`

const SelectHeading = styled('p')`
    width: 25%;
    font-size: 12px;
    margin-left: 10px;
`

const SelectOptions = styled(Select)`
    width: 60%;
    padding: 0;
    font-size: 12px;
`
const PriceSlider = styled(Slider)`
    width: 52%;
    color: #2196f3;
    margin-right: 10px;
`

const ButtonWrapper = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ApplyButton = styled('button')`
    width: 200px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    align-items: center;
    cursor: pointer;
    color: white;
    background-color: #2196f3;
    border: none;
    border-radius: 5px;
    transition: transform 0.15s ease-in-out;
    :hover {
        transform: scale3d(1.1, 1.1, 3);
        background-color: #64b5f6;
    }
`

const FilterBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const qCategory = queryParams.get('category');
    const qBrand = queryParams.get('brand');
    const [category, setCategory] = useState(qCategory);
    const [brand, setBrand] = useState(qBrand);
    const [price, setPrice] = useState([0, 10000]);
    const [sortValue, setSortValue] = useState(3);
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);

    const categoryOptions = [
        { value: 'all', label: 'All' },
        { value: 'shirts', label: 'Shirts' },
        { value: 't-shirts', label: 'T-Shirts' },
        { value: 'denims', label: 'Denims' },
        { value: 'shorts', label: 'Shorts' },
        { value: 'outerwear', label: 'Outerwear' },
        { value: 'footwear', label: 'Footwear' },
    ];

    const brandOptions = [
        { value: 'all', label: 'All' },
        { value: 'roadster', label: 'Roadster' },
        { value: 'blackberry', label: 'Blackberry' },
        { value: 'pepe jeans', label: 'Pepe Jeans' },
        { value: 'US polo', label: 'US Polo' },
        { value: 'adidas', label: 'Adidas' },
        { value: 'nike', label: 'Nike' },
        { value: 'puma', label: 'Puma' },
    ];

    const sortOptions = [
        { value: '1', label: 'Price - Low to High'},
        { value: '2', label: 'Price - High to Low'},
        { value: '3', label: 'Title - A to Z'},
        { value: '4', label: 'Title - Z to A'},
    ]

    useEffect(()=>{
        if(sortValue == 1){
          setSortBy("price");
          setSortOrder(1);
        }
        else if(sortValue == 2){
          setSortBy("price");
          setSortOrder(-1);
        }
        else if(sortValue == 3){
          setSortBy("title");
          setSortOrder(1);
        }
        else if(sortValue == 4){
          setSortBy("title");
          setSortOrder(-1);
        }
      },[sortValue])

    const handleFilter = () => {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('category', category);
        newSearchParams.set('brand', brand);
        newSearchParams.set('minPrice', price[0]);
        newSearchParams.set('maxPrice', price[1]);
        newSearchParams.set('sortBy', sortBy);
        newSearchParams.set('sortOrder', sortOrder);
        navigate(`/products?${newSearchParams.toString()}`);
    }

    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    }

    return (
        <Container>
            <Wrapper>
                <SelectHeading> Category </SelectHeading> 
                <SelectOptions
                options={categoryOptions}
                onChange={(category) => setCategory(category.value)}
                />
            </Wrapper>
            <Wrapper>
                <SelectHeading> Brand </SelectHeading>
                <SelectOptions
                options={brandOptions}
                onChange={(brand) => setBrand(brand.value)}
                />
            </Wrapper>
            <Wrapper>
                <SelectHeading> Price </SelectHeading>
                <PriceSlider
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay='auto'
                min={500}
                max={10000}   
                disableSwap
                />
            </Wrapper>
            <Wrapper>
                <SelectHeading> Sort </SelectHeading>
                <SelectOptions
                    options={sortOptions}
                    defaultValue={sortOptions[2]}
                    onChange={(sortValue) => setSortValue(sortValue.value)}
                />
            </Wrapper>
            <ButtonWrapper>
                <ApplyButton onClick={handleFilter}> Apply Filter</ApplyButton>
            </ButtonWrapper>
        </Container>
    )
}

export default FilterBar;