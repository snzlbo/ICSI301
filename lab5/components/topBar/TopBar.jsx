import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import "./TopBar.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      items: [],
    }
  }

  render() {
    var name;

    if(window.location.href.slice(40, 45) === "users"){
      fetch('http://localhost:3000/user/'+window.location.href.slice(46, 70))
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
      name = "User detail of " + this.state.items.first_name;
    }else if(window.location.href.slice(40, 46) === "photos"){
      fetch('http://localhost:3000/user/'+window.location.href.slice(47, 71))
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
      name ="Photos of " + this.state.items.first_name;
    }
    else{
      name = "Username";
    }


    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar className = "Topbar">
          <Typography variant="h5" color="inherit">
            Sainzolboo
          </Typography>
          <Typography variant="h5" position="inherit">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
