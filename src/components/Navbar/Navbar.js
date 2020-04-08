import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Auth from '../auth/Auth'


export default class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      right: false
    }
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ anchor: open });
  };

  list = (anchor) => (
    <div
      style={{ width: 800 }}
      role="presentation"
      // onClick={this.toggleDrawer(anchor, false)}
      // onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {['Login', 'My Memes', 'Feed'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Auth updateToken={this.props.updateToken.bind(this)}/>

      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );



  render() {
    return (
      <div style={{ backgroundColor: 'lightblue' }}>
        {
          ['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={this.toggleDrawer(anchor, true)}>LOGIN</Button>
              <SwipeableDrawer
                anchor={anchor}
                open={this.state.anchor}
                onClose={this.toggleDrawer(anchor, false)}
                onOpen={this.toggleDrawer(anchor, true)}
              >
                {this.list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))
        }
      </div >
    );
  }
}

