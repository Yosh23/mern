import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Form from './Form'

const TodosQuery = gql `
{
  todos {
    id
    text
    complete
  }  
}
`

class App extends Component {
  render() {
    const {data: {loading, todos}} = this.props
      if (loading) {
        return null
      }

      const handleToggle = todo => () => {
          const { checked } = this.state;
          const currentIndex = checked.indexOf(todo);
          const newChecked = [...checked];

          if (currentIndex === -1) {
              newChecked.push(todo);
          } else {
              newChecked.splice(currentIndex, 1);
          }

          this.setState({
              checked: newChecked,
          });
      };


      return (
          <section style={{display: 'flex'}}>
              <section style={{margin: 'auto', width: 400}}>
                  <Paper elevation={10}>
                      <Form/>
                      <List>
                          {todos.map(todo => (
                              <ListItem
                                  key={todo.id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={handleToggle(todo)}
                              >
                                  <Checkbox
                                      checked={todo.complete}
                                      tabIndex={-1}
                                      disableRipple
                                  />
                                  <ListItemText primary={todo.text} />
                                  <ListItemSecondaryAction>
                                      <IconButton>
                                          <DeleteIcon />
                                      </IconButton>
                                  </ListItemSecondaryAction>
                              </ListItem>
                          ))}
                      </List>
                  </Paper>
              </section>
          </section>
      );
  }
}

export default compose(
    graphql(TodosQuery)
)(App);
