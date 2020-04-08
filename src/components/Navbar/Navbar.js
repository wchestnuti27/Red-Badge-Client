import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Link, Switch } from 'react-router-dom';

// components
import Auth from '../auth/Auth';
import PostMeme from '../CRUD/Feed/PostMeme';
import Feed from '../CRUD/Feed/Feed';

// material ui
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
import AddToQueueOutlinedIcon from '@material-ui/icons/AddToQueueOutlined';


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
      style={{ width: 250 }}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {/* ===== LOGIN ===== */}
        <ListItem button>
          <Link to='/auth'>
            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
            <ListItemText primary='Login' />
          </Link>
        </ListItem>

        {/* ===== MY ACCOUNT ===== */}
        <ListItem button>
          <Link to='/postmeme'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='My Account' />
          </Link>
        </ListItem>

        {/* ===== FEED ===== */}
        <ListItem button>
          <Link to='/'>
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary='Feed' />
          </Link>
        </ListItem>
      </List>

      <Divider />

      <List>
        {/* ===== WILL ===== */}
        <ListItem button>
          <ListItemIcon><SentimentVeryDissatisfiedIcon /></ListItemIcon>
          <ListItemText>Will</ListItemText>
        </ListItem>

        {/* ===== NATHAN ===== */}
        <ListItem button>
          <ListItemIcon><FastfoodOutlinedIcon /></ListItemIcon>
          <ListItemText>Nathan</ListItemText>
        </ListItem>

        {/* ===== DANIEL ===== */}
        <ListItem button>
          <ListItemIcon><HelpOutlineOutlinedIcon /></ListItemIcon>
          <ListItemText>Dan</ListItemText>
        </ListItem>
      </List>

      <Divider />

      <List>
        {/* ===== LOGOUT ===== */}
        <ListItem button onClick={this.props.clearToken}>
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
              <Button onClick={this.toggleDrawer(anchor, true)}><MenuOutlinedIcon /></Button>
              <SwipeableDrawer
                anchor={anchor}
                open={this.state.anchor}
                onClose={this.toggleDrawer(anchor, false)}
                onOpen={this.toggleDrawer(anchor, true)}
              >
                {this.list(anchor)}
              </SwipeableDrawer>

              <Button><Link to='/postmeme'><AddToQueueOutlinedIcon /></Link></Button>

            </React.Fragment>
          ))
        }

        <Switch>
          <Route exact path='/'><Feed /></Route>
          <Route exact path='/auth'><Auth updateToken={this.props.updateToken.bind(this)} /></Route>
          <Route exact path='/postmeme'><PostMeme sessionToken={this.props.sessionToken} /></Route>
        </Switch>
      </div >
    );
  }
}

