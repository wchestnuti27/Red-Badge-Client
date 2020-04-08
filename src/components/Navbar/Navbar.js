import React from 'react';
<<<<<<< HEAD
import clsx from 'clsx';
import Auth from '../auth/Auth';
=======

>>>>>>> a590ef5d760d55152c135b799d9b313d716c0c0a
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

<<<<<<< HEAD
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
=======
    this.state = {
      right: false
    }
  }

  toggleDrawer = (anchor, open) => (event) => {
>>>>>>> a590ef5d760d55152c135b799d9b313d716c0c0a
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

<<<<<<< HEAD
  return (
    <div>
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Profile</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
=======
      <Auth updateToken={this.props.updateToken.bind(this)}/>

      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
>>>>>>> a590ef5d760d55152c135b799d9b313d716c0c0a
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

