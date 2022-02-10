import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Subcategory = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get(`https://localhost:44399/api/products/GetProductsBySubcategoryId/${props.id}`)
            .then((res) => res.data)
            .then((d) => setProducts(d))
    }

    return (
        <div className="container products mt-5">

            <h5 className="product-header">{props.name}</h5>
            <div className="row">
                {products.map((item) =>
                    <div className="product-body item col-md-3 pt-3">
                        <div className="container">
                            <div className="row">
                                <div className="card">
                                    <img
                                        src={`https://localhost:44399/wwwroot/images/${item.Image}`}
                                        className="post-img"
                                    />
                                    <span className="category">{item.SubcategoryName}</span>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <a href="#">{item.Name}</a>
                                        </h5>
                                        <p className="card-text">{item.Description}</p>
                                        <div className="product-meta">
                                            <p className="product-author">
                                                <a href="#">{item.CompanyName}</a>
                                                <span> tərəfindən</span>
                                            </p>
                                        </div>
                                        <div className="post-meta">
                                            <ul>
                                                <li className="price">{item.Price} $</li>
                                                <li className="add-to-card">
                                                    <i className="fas fa-cart-plus">Səbətə at</i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                )}
            </div>
        </div>
    )
}
export default Subcategory;