import React from "react";
import "../App.css";
var likebtn = {
  backgroundColor: "white"
};

function images(props) {
  let likes_int = props.like_by_user
  let id_int=props.id
  console.log(id_int)
  return (
    <div className="mb-4 col-md-4  col-lg-4 offset-lg-1 col-sm-6 offset-sm-2 ">
      {/* <div className="title"><h1>{props.id}</h1></div> */}
      <div className="overbutton">
        <img
          className="imgopacity"
          src={props.imgsmallurl}
          alt="Image"
          height="400px"
          width="400px"
        />

        <p className="username">
          <img src={props.user_profile_url} />
          &nbsp;
          <strong>{props.name}</strong>
        </p>
        <div className="rounded download">
          <a href={props.download_img} rel="images" download target="_blank">
            <i class="fas fa-arrow-down " />
          </a>
        </div>
        {}
        <div style={likebtn} className="rounded btn button" data-id={id_int} onClick={()=>liked({id_int})}>
          <a href="#">
            <span class="likes">
              <i class="fas fa-heart" />
            </span>
            &nbsp;            
              <span class="like_count">{props.total_likes}</span>
            
          </a>
        </div>
      </div>
    </div>
  );
}
let count;
let id=[]

function liked(ids){
  // id.push(ids)
    console.log(ids)
console.log("HIi")
  if (count===false || count===undefined) {
  
    likebtn = {
      backgroundColor: "red"
    };
    count=true
  } else if( count===true){
    likebtn = {
      backgroundColor: "white"
    };
    count=true
    
  }
}
console.log(id)
function unliked(props) {
  return <h1>unliked</h1>;
}

export default images;
