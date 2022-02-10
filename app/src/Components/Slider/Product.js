import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../css/index.css";
import axios from "axios";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper/core";
import { number } from "prop-types";
SwiperCore.use([Pagination]);

const Product = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(props.categoryId);
  }, []);

  const fetchData = (categoryId) => {
    axios
      .get(`https://localhost:44399/api/Home/Products/${categoryId}`)
      .then((res) => res.data)
      .then((d) => setData(d));
  };

  const getProductCategoryName = () => {
    let categoryName = ``;
    if (data.length > 0) {
      categoryName = props.categoryName;
    }
    return categoryName;
  }

  return (

    <div className="container products mt-5">
      
      <h5 className="product-header">{getProductCategoryName()}</h5>
      <>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.CategoryId}>
              <div className="product-body item">
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
            
              </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Product;
