import React, { Component } from 'react'
import '../css/layout.css';
import { Link } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Subcategory from "./Subcategory";
import Category from "./Category";
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      linkId: 1
    };
  }


  componentDidMount() {
    fetch("https://localhost:44399/api/Menu/GetAllCategories")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }
  render() {
    var { isLoaded, items, linkId } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <header>
          <div className="top-header">
            <div className="container">
              <div className="row">
                <div className="logo col-md-2">
                  <a href="index.html"><img className="logo-img" src="https://localhost:44399/wwwroot/images/logo.svg" alt="logo" /></a>
                </div>
                <div className="search col-md-7">
                  <div className="col-md-12">
                    <div className="row">
                      <select id="search_category" className="search-category col-md-3">
                        {items.map(category =>
                          <option className="search-category-line" value={category.CategoryId}>{category.CategoryName}</option>
                        )}
                      </select>
                      <input id="search_input" className="search-input col-md-8" placeholder="Axtar..." type="text" />
                      <button id="btn_search" className="btn-search col-md-1">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="btn-login col-md-2">
                  <button>Giriş</button>
                </div>
                <div className="cart col-md-1">
                  <i className="fas fa-cart-plus"></i>
                  <sub>7</sub>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-header">
            <div className="container">
              <nav>
                <ul className="categories row" id="categories">
                  <BrowserRouter>
                    {items.map(category =>
                      <li key={category.Id} className="category-item col-md-2"><Link to={`/${category.CategoryName}`}><span>{category.CategoryName}</span></Link>
                        <ul className="subcategories">
                          {category.SubCategories.map(subCtg =>
                            <li key={subCtg.id} className="category-sub-item"><Link to={`/${category.CategoryName}/${subCtg.Name}`}>{subCtg.Name}</Link> </li>
                          )}
                        </ul>
                      </li>
                    )}
                    <Switch>
                      {items.map(category =>
                        category.SubCategories.map(subCtg =>
                          <Route path={`/${category.CategoryName}/${subCtg.Name}`} component={() => <Subcategory id={`${subCtg.ID}`} name={`${subCtg.Name}`} />} />
                        )
                      )}
                      {items.map(category =>
                        <Route path={`/${category.CategoryName}`} component={() => <Category id={`${category.CategoryId}`} name={`${category.CategoryName}`} />} />
                      )}
                    </Switch>
                  </BrowserRouter>
                </ul>
              </nav>
            </div>
          </div>

        </header>

      )
    }
  }
}
export default Header;