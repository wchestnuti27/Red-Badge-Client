import React from 'react';
import './App.scss';
import { Login, Signup } from "./components/auth/index";
import Navbar from './components/Navbar/Navbar';

import Auth from './components/auth/Auth';
import Feed from './components/CRUD/Feed/Feed';
import './components/auth/style.scss'

document.title = 'SupreMemes';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessionToken: "",
      guestUser: true, // this will gate the users ability to post memes if they are not logged in, true by default (no accout/user not signed in)
      authToggler: false // this will be changes when someone clicks the sign up or log in button
    }
  }


  updateToken (newToken) {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: localStorage.getItem('token')})
    console.log(this.state.sessionToken)
  }

  clearToken () {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  componentWillMount() {
    console.log('hi,')
  }
  
  componentDidMount() {
    console.log('how are ya?')
    console.log(this.state.guestUser)
  }


  render() {
    const guestUserSwitch = () => {
      return (this.state.authToggler ? <Auth updateToken={this.updateToken.bind(this)} /> : <Feed />) // this toggles guest user landing page and auth
    }
    return (
      <div>
        <Navbar />
        {guestUserSwitch()}
      </div>
    )
  }

}

export default App;