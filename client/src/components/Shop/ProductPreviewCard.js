import React, { useContext, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Link, Modal } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { slugify } from '../../util/AdminUtil';
import { useNavigate } from "react-router-dom";
import ProductHighlight from '../ProductHighlight';
import ProductImage from '../ProductImage';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const ProductPreviewCard = (props) => {

    const modalStyle = {
        position: 'absolute',
        top: {sm:'80%', md: '50%'},
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {sm: "95%", md: "800px"},
        bgcolor: 'background.paper',
        boxShadow: 24,
        minHeight: '600px'
    };

    const product = props.product;
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const [modalProduct, setModalProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleShowQuickView = (action) => {

        if (openModal) {
            return;
        }
        
        const elm = document.getElementById(`${slugify(product.name)}`);

        if (action === "open") {
            elm.style.width = "100%";
            elm.style.height = "35px";
            elm.style.backgroundColor = "#1976d2";
            elm.style.transition = "height .22s";
            elm.style.opacity = ".8";
        } else {
            elm.style.height = "0px";
        }
        
    }

    const handleQuickViewHighlight = (action) => {
        const elm = document.getElementById(`${slugify(product.name)}`);

        if (action === "mouse-in") {
            elm.style.opacity = "1";
            elm.style.fontWeight = "bold";
        } else {
            elm.style.opacity = ".8";
            elm.style.fontWeight = "normal";
        }
    }

    const handleOpenQuickViewModal = () => {
        setOpenModal(true);

        const url = `http://localhost:8081/product/quick-veiw/${product.id}`;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setModalProduct(data);
                setIsLoaded(true);

            }, err => {
                console.log(err);
                // setErr(err);
                setIsLoaded(false);
            })

            handleShowQuickView("close");
    }


    return (
        <Box
        sx={{ maxWidth: 345 }}
        align="center"
        mb={3}
        onMouseEnter={() => handleShowQuickView("open")}
        onMouseLeave={() => handleShowQuickView("close")}
        >
            <CardActionArea>
            <Box>
                <ProductImage product={product} />
            </Box>

            <Box
            id={`${slugify(product.name)}`}
            sx={{height: '0px', color: 'white', width: '100%', position: 'absolute', bottom: '0px', display: {xs: "none", sm: "block"} }}
            onMouseEnter={() => handleQuickViewHighlight("mouse-in")}
            onMouseLeave={() => handleQuickViewHighlight("mouse-out")}
            onClick={() => handleOpenQuickViewModal()}
            >
                <Box sx={{marginTop: '7px'}}>
                    QUICK VIEW
                </Box>
            </Box>

            </CardActionArea>

            <CardContent sx={{"&:hover" : {color: "primary.main", cursor: "pointer"}}} onClick={() => navigate(`/product/${slugify(product.name)}`)} >
                <Typography>
                    {product.name.toUpperCase()}
                </Typography>
            </CardContent>

            <Typography sx={{fontWeight: 'bold'}}>
                {product.priceRange.includes("-") ? product.priceRange: (product.priceOptions ? product.priceOptions[0].price : product.priceRange)}
            </Typography>

            <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: {xs: "none", sm: "block"}, overflow: 'scroll', bottom: {sm: '40px', md: '0px'}}}
            >
            <Box sx={modalStyle}>
                {isLoaded &&
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                        <ProductImage isModal={true} product={product} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <Box p={2}>
                         <ProductHighlight setOpenModal={setOpenModal} showDivider={true} product={modalProduct} />
                        </Box>
                    </Grid>
                </Grid>
                }
            </Box>
            </Modal>
            
        </Box>
    )
}

export default ProductPreviewCard