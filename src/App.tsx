import React from 'react';
import './App.scss';
import { Login, Signup } from "./components/auth/index";
import Navbar from './components/Navbar/Navbar';

import Auth from './components/auth/Auth';
import Feed from './components/CRUD/Feed/Feed';
import PostMeme from './components/CRUD/Feed/PostMeme';

import './components/auth/style.scss'

document.title = 'SupreMemes';

type AppState = {
  sessionToken: string | null,
  guestUser: boolean,
  authToggler: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      sessionToken: "",
      guestUser: true, // this will gate the users ability to post memes if they are not logged in, true by default (no accout/user not signed in)
      authToggler: true // this will be changes when someone clicks the sign up or log in button
    }
  }


  updateToken(newToken: string) {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: localStorage.getItem('token') })
    console.log(this.state.sessionToken)
  }

  clearToken() {
    localStorage.clear();
    this.setState({ sessionToken: '' });
  }

  componentWillMount() {
    console.log('hi,')
  }

  componentDidMount() {
    console.log('how are ya?')
    console.log('GuesUser', this.state.guestUser)
  }


  render() {
    const guestUserSwitch = () => {
      return (
        this.state.sessionToken === null ? // this toggles guest user landing page and auth
          <Auth updateToken={this.updateToken.bind(this)} />
          :
          <div>
            <PostMeme sessionToken={this.state.sessionToken} />
            <Feed />
          </div>
      )
    }
    return (
      <div>
        <Navbar updateToken={this.updateToken.bind(this)} />
        {guestUserSwitch()}
      </div>
    )
  }

}

export default App;