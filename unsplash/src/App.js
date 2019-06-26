import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "react-pagination-library/build/css/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Photos from "./components/Photos";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="row">
          <div className="col-12 col-md-12 col-sm-12 col-lg-12">
            <Navbar />
            <Route path="/" exact component={Photos} />
          </div>

          {/* <Photos /> */}
          <Route path="/search" component={Search} />
          <Route path="/photos" component={Photos} />
        </div>
      </Router>
    );
  }
}

export default App;
