import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import {
  Paper,
  List, ListItem, ListItemSecondaryAction, ListItemText,
  Checkbox,
  IconButton,
  Grid, AppBar, Toolbar, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Form from './component/Form';
import logo from './logo.svg';
import './App.css'



//graphql queries 
const TodosQuery = gql`
{
  todos {
    id
    text
    complete
  }
}
`;
const UpdateMutation = gql`
mutation($id: ID!, $complete: Boolean!){
  updateTodo(id: $id, complete: $complete)
}
`;
const RemoveMutation = gql`
mutation($id: ID!){
  removeTodo(id: $id)
}
`;

const CreateMutation = gql`
mutation($text: String!) {
  createTodo(text: $text) {
    id
    text
    complete
  }
}
`;


class App extends Component {
  //update
  updateTodo = async todo => {
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      },
      refetchQueries: [{ query: TodosQuery }]
    });
  };
  //delete
  removeTodo = async todo => {
    await this.props.removeTodo({
      variables: {
        id: todo.id
      },
      optimisticResponse: true,
      update: cache => {
        const existingTodos = cache.readQuery({ query: TodosQuery });
        const newTodos = existingTodos.todos.filter(t => (t.id !== todo.id));
        cache.writeQuery({
          query: TodosQuery,
          data: { todos: newTodos }
        });
      }
    })
  };
  //create
  createTodo = async text => {
    await this.props.createTodo({
      variables: {
        text
      },
      update: (store, { data: { createTodo } }) => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos.unshift(createTodo);
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };


  render() {
    const {
      data: { loading, todos }
    } = this.props;
    if (loading) {
      return null
    }
    return (
      <div className="container" style={{ display: "flex" }}>
        <div className="wrapper" style={{ margin: "auto", width: 400 }}>
          <Grid item xs={12}>
            <AppBar className="appbar" position="absolute">
              <Toolbar className="topbar">
                <Typography className="text" variant="h3" color="inherit">
                  <img src={logo} className="App-logo" alt="logo" />
                  Your to-do list
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Paper elevation={3} className="paper">
            <Form submit={this.createTodo} />
            <List>
              {todos.map(todo => (
                <ListItem
                  key={todo.id}
                  role={undefined}
                  dense
                  button
                  onClick={() => this.updateTodo(todo)}
                >
                  <Checkbox
                    checked={todo.complete}
                    defaultChecked
                    color="primary"
                    inputProps={{
                      'aria-label': 'secondary checkbox'
                    }}
                  />
                  <ListItemText primary={todo.text} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.removeTodo(todo)} >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </div >
    );
  }
}

//graphql export component
export default compose(
  graphql(CreateMutation, { name: "createTodo" }),
  graphql(RemoveMutation, { name: "removeTodo" }),
  graphql(UpdateMutation, { name: "updateTodo" }),
  graphql(TodosQuery)
)(App);