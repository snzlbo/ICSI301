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
      user: this.props.match.params.userId,
      items: [],
    };
    fetchModel(`http://localhost:3000/user/${props.match.params.userId}`)
    .then(response => {
      this.setState({ items: response.data });
    });
  }

  componentDidUpdate(prevProps) {
    let prevId = prevProps.match.params.userId;
    let currId = this.props.match.params.userId;
    if (prevId !== currId) {
      this.state.userId = currId;
      // Problem 1
      // let userDetail1 = window.cs142models.userModel(currId);
      // this.setState({ userDetail: userDetail1 });
      fetchModel("user/" + this.state.userId).then((res) =>
        this.setState({ items: res.data })
      );
    }
  }

  render() {
    return (
      <div className="card">
        <Typography variant="h5" className = "first" >
          First name: {this.state.items.first_name}
        </Typography>
        <Typography variant="h5" className = "list" >
          Last name: {this.state.items.last_name}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Description of photos: {this.state.items.description}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Occupation: {this.state.items.occupation}
        </Typography>
        <Typography variant="subtitle2" className="list">
          Location: {this.state.items.location}
        </Typography>
        <Link to={"/photos/" + this.state.user}>
          <Button variant="contained" color="primary" className = "button">
            Click for pictures
          </Button>
        </Link>
      </div>


/*
      <Grid container
      justify="space-evenly"
      alignItems="center"
      >
        <Grid xs={6} item>
          <Typography variant="h3">
          {`${this.state.user.first_name} ${this.state.user.last_name}`}
        </Typography>
        <Typography variant="h5">
          {this.state.user.occupation} <br />
          based in {this.state.user.location}
        </Typography>
        <Typography variant="body1">{this.state.user.description}</Typography>
        </Grid>
        <Grid xs={4} item>
          <Button variant="contained" size="large">
          <Link to={`/photos/${this.state.user._id}`}>See photos</Link>
        </Button>
        </Grid>
        
      </Grid>*/
    );
  }
}

export default UserDetail;
