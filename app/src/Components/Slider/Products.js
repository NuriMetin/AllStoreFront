import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

const Products = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        axios
            .get("https://localhost:44399/api/Menu/GetAllCategories")
            .then((res) => res.data)
            .then((d) => setCategories(d))
    };


    return (
        <div>
            {categories.map((category) => (
                <Product categoryId={category.CategoryId} categoryName={category.CategoryName} />
            ))}
        </div>
    )
}
export default Products;