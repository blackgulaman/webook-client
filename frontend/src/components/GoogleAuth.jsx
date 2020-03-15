// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import actions from '../actions';

// const useOAuth2 = () => {
//   const [auth, setAuth] = useState();
//   useEffect(() => {
//     if (!window || !window.gapi) return;
//     window.gapi.load('client:auth2', e => {
//       window.gapi.client
//         .init({
//           clientId:
//             '716470922713-3obi1k4ns5p90oj6svjo6m89u5odtfng.apps.googleusercontent.com',
//           scope: 'profile email'
//         })
//         .then(() => {
//           setAuth(window.gapi.auth2.getAuthInstance());
//         });
//     });
//   }, []);
//   return auth;
// };

// export default function GoogleAuth(props) {
//   const auth = useOAuth2();
//   const dispatch = useDispatch();
//   const onAuthChange = async isLogin => {
//     if (isLogin) {
//       const profile = window.gapi.auth2
//         .getAuthInstance()
//         .currentUser.get()
//         .getBasicProfile();
//       const signinObj = {
//         gmailId: profile.getId(),
//         firstName: profile.getGivenName(),
//         lastName: profile.getFamilyName(),
//         image: profile.getImageUrl(),
//         email: profile.getEmail(),
//         loginType: 'gmail'
//       };
//       dispatch(actions.authAction.gmailSignIn(signinObj));
//     } else {
//     }
//   };

//   const onSignInClick = () => {
//     if (auth) auth.signIn();
//   };

//   useEffect(() => {
//     if (auth) {
//       onAuthChange(auth.isSignedIn.get());
//       auth.isSignedIn.listen(onAuthChange);
//     }
//     return () => {};
//   }, [auth]);

//   return (
//     <div>
//       <Button
//         fullWidth
//         variant="contained"
//         color="secondary"
//         onClick={onSignInClick}
//       >
//         Continue with Google
//       </Button>
//     </div>
//   );
// }

import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    if (!window.gapi) return;
    window.gapi.load('client:auth2', e => {
      window.gapi.client
        .init({
          clientId:
            '716470922713-3obi1k4ns5p90oj6svjo6m89u5odtfng.apps.googleusercontent.com',
          scope: 'profile email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    console.log(this.auth.currentUser.get());
    if (isSignedIn) {
      const profile = this.auth.currentUser.get().getBasicProfile();
      const signinObj = {
        gmailId: profile.getId(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        image: profile.getImageUrl(),
        email: profile.getEmail(),
        loginType: 'gmail'
      };
      this.props.signIn(signinObj);
    } else {
      if (localStorage.getItem('email'))
        this.props.signOut(localStorage.getItem('email'));
    }
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  renderAuthButton() {
    if (this.props.auth.isSignedIn === null) {
      return null;
    } else if (this.props.auth.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In To Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  signIn: actions.authAction.gmailSignIn,
  signOut: actions.authAction.gmailSignOut
})(GoogleAuth);
