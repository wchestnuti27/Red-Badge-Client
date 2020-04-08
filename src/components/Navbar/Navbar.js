import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Auth from '../auth/Auth'

// icons
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';

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
      style={{ width: "400px" }}
      role="presentation"
    // onClick={this.toggleDrawer(anchor, false)}
    // onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon><VpnKeyIcon /></ListItemIcon>
          <ListItemText primary='Login' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary='My Account' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText primary='Feed' />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon><SentimentVeryDissatisfiedIcon /></ListItemIcon>
          <ListItemText>Will</ListItemText>
        </ListItem>

        <ListItem button>
          <ListItemIcon><FastfoodOutlinedIcon /></ListItemIcon>
          <ListItemText>Nathan</ListItemText>
        </ListItem>

        <ListItem button>
          <ListItemIcon><HelpOutlineOutlinedIcon /></ListItemIcon>
          <ListItemText>Dan</ListItemText>
        </ListItem>
      </List>

      <Auth updateToken={this.props.updateToken.bind(this)}/>

      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </div>
  );



  render() {
    return (
      <div style={{ backgroundColor: 'lightblue' }}>
        {
          ['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              {/* 
              {props.sessionToken ? 
              <Button onClick={this.toggleDrawer(anchor, true)}><MenuOutlinedIcon /></Button>} 
              : <button that routes you to auth comp>
              }*/}
              <Button onClick={this.toggleDrawer(anchor, true)}><MenuOutlinedIcon /></Button>
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

