import React from 'react';
import { Login, Signup } from './index';
import { Container, Row, Col, Button } from 'reactstrap';

type AuthState = {
  isLogin: boolean,
}

type AuthProps = {
  updateToken: any
}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
      super(props)

      this.state = {
        isLogin: true
      }
}

  render (){
    return (
      <div className='wrapper'>
          <h1 className='welcome'>The Hype-Train</h1>
          <div className='login-banner'>
              <div className='auth-container'>
                  <br />
                  <Row>
                      <Col sm='6'>
                          {this.state.isLogin ? <Login updateToken={this.props.updateToken} /> : <Signup updateToken={this.props.updateToken} />}
                          <br />
                          {/* {isLogin ? <h5>New User?</h5> : <h5>Existing User?</h5>} */}
                          <Button color='info' onClick={() => this.setState({isLogin: !this.state.isLogin})}>
                              {this.state.isLogin ? 'Sign up here//' : 'Login here'}
                          </Button>
                      </Col>
                      {/* <Col sm='6'>
                      <div className='auth-pic-guide'>
                      <img className='login-pic' style={{height: 280, width: 500}} src={Controller} />
                      </div>
                  </Col> */}
                  </Row>
              </div>
          </div>
      </div>
  )
  }

}

export default Auth;





//   constructor(props: AuthProps) {
//     super(props);

//     this.state = {
//       isLogginActive: true,
//     }
//   }

//   componentDidMount () {
//     // add .right by default //
//     this.right.classList.add('right');
//   }

//   changeState() {
//     const { isLogginActive } = this.state;

//     if(isLogginActive) {
//       this.rightSide.classList.remove('right');
//       this.rightSide.classList.add('left');
//     } else {
//       this.rightSide.classList.remove('left');
//       this.rightSide.classList.add('right');
//     }

//     this.setState((prevState) => ({ isLogginActive: !prevState.isLogginActive }));
//   }

//   render() {
//     const { isLogginActive } = this.state;
//     const current = isLogginActive ? "Signup" : "Login";
//     const currentActive = isLogginActive ? "Login" : "Signup";
//     return (
//       <div className="App">
//         <div className="login">
//           <div className="container" ref={ref => (this.container = ref)}>
//             {isLogginActive && (
//               <Login containerRef={(ref: any) => (this.current = ref)} updateToken={this.props.updateToken.bind(this)} />
//             )}
//             {!isLogginActive && (
//               <Signup containerRef={(ref: any) => (this.current = ref)} updateToken={this.props.updateToken.bind(this)} />
//             )}
//           </div>
//           <RightSide
//             current={current}
//             currentActive={currentActive}
//             containerRef={(ref: any) => (this.rightSide = ref)}
//             onClick={this.changeState.bind(this)}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// const RightSide = props => {
//   return <div className= "right-side" ref={props.containerRef} onClick={props.onClick}>
//     <div className='inner-container'>
//     <div className="text">{props.current}></div>
//   </div>
//   </div>



