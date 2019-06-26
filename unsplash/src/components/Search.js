import React, { Component } from "react";
import axios from "axios";
import Images from "./images";
import "../App.css";
import Pagination from "react-pagination-library";
import Select from "react-select";
import "react-pagination-library/build/css/index.css";
const options = [
  { value: "5", label: "5 Images Show" },
  { value: "10", label: "10 Images Show" },
  { value: "15", label: "15 Images Show" },
  { value: "20", label: "20 Images Show" },
  { value: "25", label: "25 Images Show" },
  { value: "30", label: "30 Images Show" }
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      total_pages: null,
      data: [],
      results: [],
      imgurls: [],
      error: [],
      currentPage: 1,
      query: null,
      loading: true,
      selectOption: null,
    };
  }

  getApi() {
    // let that=this
    let page = this.state.currentPage;
    let per_page;
    if (this.state.selectOption === null) {
      per_page = 10;
    } else {
      console.log("per  pages");
      per_page = this.state.selectOption.value;
    }
    const access_key =
      "c61208281b89cd6f0e0c7cebbd60a00f12c6d24d4f9d1572fdc68e1981d55782";

    if (this.state.query != null) {
      let query = this.state.query;
      axios
        .get(
          `https://api.unsplash.com/search/photos/?per_page=${per_page}&query=${query}&page=${page}&client_id=${access_key}`
        )
        .then(res => {
          if (res.data.total === 0) {
            alert("No data found");
            this.setState({ loading: false });
          } else {
            this.setState({
              data: res.data.results,
              total_pages: res.data.total_pages,
              loading: false
            });
          }
        });
    } else {
      axios
        .get(
          `https://api.unsplash.com/search/photos/?per_page=${per_page}&query=india&page=${page}&client_id=${access_key}`
        )
        .then(res => {
          this.setState({
            data: res.data.results,
            total_pages: res.data.total_pages,
            loading: false
          });
        });
    }
  }

  componentDidMount() {
    this.getApi();
  }
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage, loading: true });
    this.getApi();
  
  };
  handleChange = async selectOption => {
    // alert("Display " + selectOption.value + "Photos ");
    await this.setState({ selectOption, loading: true });
    this.getApi();
  
  };

  searchResult = async queryresult => {
    if (queryresult.key === "Enter") {
      await this.setState({ query: queryresult.target.value,loading: true  });
      this.getApi();
    }
  };

  render() {
    const { selectOption } = this.state;
    if (this.state.loading) {
      return <div className="loader" />;
    } else {
      return (
        <div className="container">
          <div className=" row">
            <div className="col-sm-12 col-md-6">
              <Pagination
                className="text-center"
                onClick={this.state.currentPage}
                currentPage={this.state.currentPage}
                totalPages={this.state.total_pages}
                changeCurrentPage={this.changeCurrentPage}
                theme="square-fill"
              />
            </div>
            <div className="mb-1 col-sm-12 col-md-6">
              <Select
                className="text-center"
                placeholder="How many images you want to show?"
                value={selectOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-5">
              {/* <form class="form-inline "> */}
              <input
                class="form-control mr-sm-2"
                type="search"
                onKeyPress={this.searchResult}
                placeholder="Search Wallpapers"
                aria-label="Search"
              />
              {/* </form> */}
            </div>
          </div>
          <div className="row">
            {this.state.data.map((i, map) => {
              return (
                <Images
                pgname="search"
                  id={i.id}
                  user_profile_url={i.user.profile_image.small}
                  imgsmallurl={i.urls.small}
                  total_likes={i.likes}
                  name={i.user.name}
                  download_img={i.links.download + "?force=true"}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Search;
