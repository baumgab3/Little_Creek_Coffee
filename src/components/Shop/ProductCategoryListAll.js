import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import ProductCategoryList from './ProductCategoryList';


const ProductCategoryListAll = () => {
    const { param1 } = useParams();

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        setSubCategories(["light", "medium", "dark", "decaf"]);
    }, []);


    return (
        <>
        {subCategories.map(sub => {
            return <ProductCategoryList key={sub} isWithParam={true} category={param1} subCategory={sub} />
        })}
          
        </>
    )
}

export default ProductCategoryListAll