import React, { Component } from "react";
import Header from "./Components/Header";
import Products from "./Components/Slider/Products";
import { BrowserRouter, Switch, Route } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        
      </div>
    )
  }
}

export default App;