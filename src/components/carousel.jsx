import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";

function CarouselSlider(props)
{
    const theme = useTheme();
    var items = [
        {
            name: "SUMMER SALE",
            description: "Upto 60% discount on selected brands.",
            bgimage: "https://wallpaperswide.com/download/summer_floral_prints_clothing_models_sky-wallpaper-1920x1080.jpg",
            bgposition: "top center",
            bgsize: "cover",
            bgattach: "local",
            background: "#CCCCCC",
            fontcolor: "white"
        },
        {
            name: "SPRING COLLECTION",
            description: "Upto 60% discount on selected brands.",
            bgimage: "https://www.instyle.com/thmb/ssi8HkpzI-IlFXhzFmybge_kRPk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/springsweatersrecirc-fed93e1c8bf9465898b801292aadeda5.png",
            bgposition: "top center",
            bgsize: "cover",
            bgattach: "local",
            background: "#6EEEFF",
            fontcolor: "gray"
        },
        {
            name: "PARTY WEAR",
            description: "Upto 60% discount on selected brands.",
            bgimage: "https://assets.vogue.in/photos/5ce458604a30b3bfc8130dd7/16:9/w_1920,h_1080,c_limit/3-party-girls-give-us-to-dos-and-donts-of-dressing-for-a-night-out.jpg",
            bgposition: "top center",
            bgsize: "cover",
            bgattach: "local",
            background: "#00FF00",
            fontcolor: "black"
        },
        {
            name: "KIDS SECTION",
            description: "Upto 60% discount on selected brands.",
            bgimage: "https://images.bauerhosting.com/affiliates/sites/12/motherandbaby/legacy/root/halloween-baby-with-dog.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=undefined&q=80",
            bgposition: "bottom center",
            bgsize: "cover",
            bgattach: "local",
            background: "#00FF00",
            fontcolor: "white"
        },
        {
            name: "ACCESSORIES",
            description: "Upto 60% discount on selected brands.",
            bgimage: "https://media.vanityfair.com/photos/61b108383ef1e755f5abb238/16:9/w_2580,c_limit/best-accessories-of-2021-ecomm-lede.jpg",
            bgposition: "center center",
            bgsize: "cover",
            bgattach: "local",
            background: "#00FF00",
            fontcolor: "white"
        }
    ]

    return (
        <Carousel
            sx={{
                width: '99vw'
            }}
            interval={2000}
            autoplay={true}
            stopAutoPlayOnHover={true}
            indicators={true}
            swipe={true}
            indicatorIconButtonProps={{
                style: {
                    color: theme.palette.primary.secondary
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: theme.palette.primary
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '0rem',
                }    
            }}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Box sx={{ 
            bgcolor: `${props.item.background}`,
            backgroundImage: `url('${props.item.bgimage}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${props.item.bgposition}`,
            backgroundSize: `${props.item.bgsize}`,
            backgroundAttachment: `${props.item.bgattach}`,
            height: '400px',
            width: '99vw',
            padding: '0px',
            margin: '0px 0px',
            p: '3.5rem',
            }}>
            <h2 style={{ textShadow: '1px 1.5px 3px rgba(0, 0, 0, 0.4)' , color:`${props.item.fontcolor}` }}> {props.item.name}</h2>
            <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)' , color:`${props.item.fontcolor}`}} >{props.item.description}</p>

            <Button className="CheckButton" variant="contained">
                Check it out!
            </Button>
        </Box>
    )
}

export default CarouselSlider;