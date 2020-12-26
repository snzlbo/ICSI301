import React from "react";
import { Typography, Divider } from "@material-ui/core";
import "./userPhotos.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

const Card = (props) => {
  const [flag, setFlag] = React.useState(false);
  return (
    <div>
      <div className="photoContainer">
        <div className="date">{props.data.date_time}</div>
        <img src={"./../../images/" + props.data.file_name}/>
        <div>
          <div onClick={() => setFlag(!flag)} className = "commentClick">
            <p>See comments...</p>
          </div>
          {!props.data.comments ? (
            <div style={{ display: flag ? "block" : "none" }}>
              <p className = "comment">No one written any comment</p>
            </div>
          ) : (
            props.data.comments.map((el, ind) => {
              return (
                <div
                  className="comment"
                  key={ind}
                  style={{ display: flag ? "block" : "none" }}
                >
                  <div className="commentContainer">
                    <span>
                      <Link to={"/users/" + el.user._id}>
                        {el.user.first_name} {el.user.last_name} written:
                      </Link>
                    </span>
                    <span>{el.date_time}</span>
                  </div>
                  <div className="comm">{el.comment}</div>
                  <Divider variant = "middle"/>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    axios
      .get("/PhotosOfUser/" + this.props.match.params.userId)
      .then((res) => this.setState({ photos: res.data }));
    this.state = {
      photos: [],
    };
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.photos.map((el) => {
          return <Card key={el._id} data={el} />;
        })}
      </div>
    );
  }
}

export default UserPhotos;
