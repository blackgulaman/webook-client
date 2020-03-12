import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import GTranslate from '@material-ui/icons/GTranslateRounded'

function useOAuth2() {
  const [auth, setAuth] = useState()
  useEffect(() => {
    if (!window || !window.gapi) return
    window.gapi.load('client:auth2', e => {
      window.gapi.client
        .init({
          clientId:
            '716470922713-3obi1k4ns5p90oj6svjo6m89u5odtfng.apps.googleusercontent.com',
          scope: 'profile'
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance())
        })
    })
  }, [])
  return auth
}

export default function GoogleAuth() {
  const auth = useOAuth2()

  const onAuthChange = isSignedIn => {
    console.log(isSignedIn)
    if (isSignedIn) {
      const profile = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
      console.log(profile)
    } else {
    }
  }

  const onSignInClick = () => {
    auth.signIn()
  }

  const onSignOutClick = () => {
    auth.signOut()
  }

  useEffect(() => {
    console.log(auth)
    if (auth) {
      onAuthChange(auth.isSignedIn.get())
      auth.isSignedIn.listen(onAuthChange)
    }
  }, [auth])

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onSignInClick}
      >
        Continue with Google
      </Button>
    </div>
  )
}

// // import { connect } from 'react-redux';

// // import { signIn, signOut } from '../actions';
// class GoogleAuth extends React.Component {
//   componentDidMount() {
//     window.gapi.load('client:auth2', e => {
//       window.gapi.client
//         .init({
//           clientId:
//             '716470922713-3obi1k4ns5p90oj6svjo6m89u5odtfng.apps.googleusercontent.com',
//           scope: 'profile'
//         })
//         .then(() => {
//           this.auth = window.gapi.auth2.getAuthInstance()
//           this.onAuthChange(this.auth.isSignedIn.get())
//           this.auth.isSignedIn.listen(this.onAuthChange)
//         })
//     })
//   }

//   onAuthChange = isSignedIn => {
//     if (isSignedIn) {
//       this.props.signIn(this.auth.currentUser.get().getId())
//     } else {
//       this.props.signOut()
//     }
//   }

//   onSignOutClick = () => {
//     this.auth.signOut()
//   }

//   onSignInClick = () => {
//     this.auth.signIn()
//   }

//   renderAuthButton() {
//     if (this.props.auth.isSignedIn === null) {
//       return null
//     } else if (this.props.auth.isSignedIn) {
//       return (
//         <button onClick={this.onSignOutClick} className="ui red google button">
//           <i className="google icon" />
//           Sign Out
//         </button>
//       )
//     } else {
//       return (
//         <button onClick={this.onSignInClick} className="ui red google button">
//           <i className="google icon" />
//           Sign In To Google
//         </button>
//       )
//     }
//   }

//   render() {
//     return <div>{this.renderAuthButton()}</div>
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   }
// }

// // export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
// export default GoogleAuth
