import axios from "axios";
import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";
import "./userList.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    axios
      .get("/user/list")
      .then((res) => this.setState({ items: res.data }));
  }
  render() {
    return (
      // <div>
      <List component="nav" className="userList">
        <Typography variant="h5" align="center">
          User list:
        </Typography>
        {this.state.items.map((el) => {
          return (
            <React.Fragment key={el._id}>
              <Link to={"/users/" + el._id}>
                <ListItem>
                  <ListItemText>
                    {el.first_name + "  "}
                    {el.last_name}
                  </ListItemText>
                </ListItem>
              </Link>
            </React.Fragment>
          );
        })}
      </List>
      // </div>
    );
  }
}

export default UserList;
