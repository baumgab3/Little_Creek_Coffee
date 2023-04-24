import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import ProductCategoryList from './ProductCategoryList';


const ProductCategoryListAll = () => {
    const { param1 } = useParams();

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {

        if (param1 === "roast") {
            setSubCategories(["light", "medium", "dark", "decaf"]);
        } else if (param1 === "region") {
            setSubCategories(["africa", "central-america", "south-america", "compositions"]);
        } else if (param1 === "merchandise") {
            setSubCategories(["brewing-tools", "clothing", "drinkware", "other-merc", "posters-and-print"]);
        } else {
            setSubCategories([]);
        }


    }, [param1]);


    return (
        <>
        {subCategories.map(sub => {
            return <ProductCategoryList key={sub} category={param1} subCategory={sub} />
        })}
        </>
    )
}

export default ProductCategoryListAll