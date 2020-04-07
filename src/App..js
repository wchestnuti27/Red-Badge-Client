import React from 'react';
import './App.scss';
import { Login, Signup } from "./components/auth/index";

// import Auth from './components/auth/Auth';
import Feed from './components/CRUD/Feed/Feed';
import './components/auth/style.scss'

document.title = 'SupreMemes';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }



  componentWillMount() {
    console.log('hi,')
  }

  componentDidMount() {
    console.log('how are ya?')
  }


  render() {
    return (
      // <h1>is this working</h1>
      // <Auth />
      <Feed />
    )
  }

}

export default App;