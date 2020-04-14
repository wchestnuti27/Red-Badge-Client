import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar/Navbar';

import './components/auth/style.scss'

document.title = 'SupreMemes';

type AppState = {
  sessionToken: string | null,
  username: string,
  guestUser: boolean,
  authToggler: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      sessionToken: "",
      username: '',
      guestUser: true, // this will gate the users ability to post memes if they are not logged in, true by default (no accout/user not signed in)
      authToggler: true // this will be changes when someone clicks the sign up or log in button
    }
  }


  updateToken(newToken: string) {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: localStorage.getItem('token') })
  }

  clearToken() {
    localStorage.clear();
    this.setState({ sessionToken: '' });
  }

  updateUsername(username: string) {
    this.setState({ username: username });
  }

  componentDidMount() {
    console.log('top')
    this.setState({ sessionToken: localStorage.getItem('token') })
  }


  // componentWillMount() {
  //   console.log('hi,')
  // }

  // componentDidMount() {
  //   console.log('how are ya?')
  //   console.log('GuesUser', this.state.guestUser)
  // }

  render() {
    // const guestUserSwitch = () => {
    //   return (
    //     this.state.sessionToken === null ? // this toggles guest user landing page and auth
    //       <Auth updateToken={this.updateToken.bind(this)} />
    //       :
    //       <div>
    //         {/* <PostMeme sessionToken={this.state.sessionToken} /> */}
    //         <Feed sessionToken={this.state.sessionToken} />
    //       </div>
    //   )
    // }
    return (
      <div style={{ backgroundColor: 'rgb(33,33,33)', color: 'white' }}>
        <Router>
          <Navbar
            sessionToken={this.state.sessionToken}
            updateToken={this.updateToken.bind(this)}
            clearToken={this.clearToken.bind(this)}
            username={this.state.username}
            updateUsername={this.updateUsername.bind(this)}
          />
        </Router>
        {/* {guestUserSwitch()} */}
      </div>
    )
  }

}

export default App;