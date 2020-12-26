import React from "react";
import { Typography, Button } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

const DETAILS = "Info about ";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.userId,
      userDetail: [],
    };
    axios
      .get("/user/" + this.props.match.params.userId)
      .then((res) => this.setState({ userDetail: res.data }));
  }
  componentDidUpdate(prevProps) {
    let prevId = prevProps.match.params.userId;
    let currId = this.props.match.params.userId;
    if (prevId !== currId) {
      this.state.userId = currId;

      axios
        .get("/user/" + this.state.userId)
        .then((res) => this.setState({ userDetail: res.data }));
    }
  }

  render() {
    return (
      <div className="card">
        <Typography variant="h5" className = "first" >
          First name: {this.state.userDetail.first_name}
        </Typography>
        <Typography variant="h5" className = "list" >
          Last name: {this.state.userDetail.last_name}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Description of photos: {this.state.userDetail.description}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Occupation: {this.state.userDetail.occupation}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Location: {this.state.userDetail.location}
        </Typography>
        <Link to={"/photos/" + this.state.userId}>
          <Button variant="contained" color="primary" className = "button">
            Click for pictures
          </Button>
        </Link>
      </div>
    );
  }
}

export default UserDetail;