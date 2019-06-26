import React, { Component } from "react";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Image Gen
        </a>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/photos">Photos</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/search">Search Images</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Random Image
          </li>
        </ol>
      </nav>
    );
  }
}

export default Navbar;
