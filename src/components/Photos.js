import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import "../App.css";
import Images from "./images";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

const options = [
  { value: "5", label: "5 Images Show" },
  { value: "10", label: "10 Images Show" },
  { value: "15", label: "15 Images Show" },
  { value: "20", label: "20 Images Show" },
  { value: "25", label: "25 Images Show" },
  { value: "30", label: "30 Images Show" }
];

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      results: [],
      imgurls: [],
      error: null,
      currentPage: 1,
      selectOption: null,
      loading: true
    };
  }
  getApi() {
    let page = this.state.currentPage;
    let per_page;
    if (this.state.selectOption === null) {
      per_page = 10;
    } else {
      per_page = this.state.selectOption.value;
    }
    const access_key =
      "2cb417863c5ef65548958a48457f30ce0c309799ef57426923a3479651bd6246";
    const filter = "popular";
    axios
      .get(
        `https://api.unsplash.com/photos/?per_page=${per_page}&page=${page}&order_by=${filter}&client_id=${access_key}`
      )
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: "please check api call" });
      });
  }

  componentDidMount() {
    this.getApi();
  }
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage,loading:true });
    this.getApi()
  };
  handleChange = selectOption => {
    // alert("Display " + selectOption.value + "Photos ");
    this.setState({ selectOption,loading:true });
    this.getApi()
    // console.log(`option selected :`, selectOption.value);
  };
  render() {
    const { selectOption } = this.state;
    if (this.state.loading) {
      return <div className="loader" ></div>;
    } else {
        if (this.state.error) {
          return (
            <div className="container">
              <div className="row">
                <h1>
                  <div className="text-center text-danger">
                    {this.state.error}
                  </div>
                </h1>
              </div>
            </div>
          );
        } else {
          return (
            <div className="container">
              <div className=" row">
                <div className="col-sm-12 col-md-6">
                  <Pagination
                    className="text-center"
                    onClick={this.changeCurrentPage}
                    currentPage={this.state.currentPage}
                    totalPages={200}
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
                {this.state.data.map((i, keys) => {
                  return (
                    <Images
                      pgname="photos"
                      like_by_user={i.liked_by_user}
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
}

export default Photos;
