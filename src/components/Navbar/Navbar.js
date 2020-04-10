import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './Navbar.css';

// components
import Auth from '../auth/Auth';
import PostMeme from '../CRUD/Feed/PostMeme';
import Feed from '../CRUD/Feed/Feed';
import MyAccount from '../CRUD/MyAccount/MyAccount';
// import WillDisplay from '../Individual/Will/Will';
import Dan from '../Individual/Dan/Dan';
// import WillDisplay from './Will/WillDisplay';

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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      right: false
    }
  }

  toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ right: open });
  };

  list = () => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <List>
        {/* ===== LOGIN ===== */}
        <Link to='/auth' id='link'>
          <ListItem button>
            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
            <ListItemText primary='Login' />
          </ListItem>
        </Link>

        {/* ===== MY ACCOUNT ===== */}
        <Link to='/account' id='link'>
          <ListItem button>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='My Account' />
          </ListItem>
        </Link>

        {/* ===== FEED ===== */}
        <Link to='/' id='link'>
          <ListItem button>
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary='Feed' />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        {/* ===== WILL ===== */}
      <Link to='/will' id='link' />
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
        <Link to='/dan' id='link'>
          <ListItem button>
            <ListItemIcon><HelpOutlineOutlinedIcon /></ListItemIcon>
            <ListItemText>Dan</ListItemText>
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        {/* ===== LOGOUT ===== */}
        <ListItem button id='logoutButton' onClick={this.props.clearToken}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  render() {
    return (
      <div>
        <div id='navbar'>

          {/* OPEN NAV DRAWER */}
          <Button id='drawerButton' onClick={this.toggleDrawer(true)}><MenuOutlinedIcon /></Button>

          {/* POST MEME */}
          <Button id='postMemeButton'><Link to='/postmeme' id='link'><AddCircleOutlineIcon /></Link></Button>

        </div>

        <React.Fragment>
          <SwipeableDrawer
            anchor={'right'}
            open={this.state.right}
            onClose={this.toggleDrawer(false)}
            onOpen={this.toggleDrawer(true)}
          >
            {this.list()}
          </SwipeableDrawer>
        </React.Fragment>

        <Switch>
          <Route exact path='/'><Feed sessionToken={this.props.sessionToken} /></Route>
          <Route exact path='/auth'><Auth updateToken={this.props.updateToken.bind(this)} /></Route>
          <Route exact path='/postmeme'><PostMeme sessionToken={this.props.sessionToken} /></Route>
          <Route exact path='/dan'><Dan /></Route>
          <Route exact path='/will'><Dan /></Route>

          {/* protected routes */}
          <Route exact path='/account'>
            {
              this.props.sessionToken ? <MyAccount sessionToken={this.props.sessionToken} />
                : <Auth updateToken={this.props.updateToken.bind(this)} />
            }
          </Route>

          {/* <Route exact path='/Will'><WillDisplay/></Route> */}
        </Switch>
      </div >
    );
  }
}

