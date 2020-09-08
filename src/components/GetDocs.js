import { gapi } from 'gapi-script';
import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const CLIENT_ID = '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com';

class GetDocs extends Component {
  constructor() {
    super();
    this.state = {
      pics: false,
      isLogined: false,
      accessToken: ''
    };
  }

  componentDidMount() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com'
      });
    }
    )
  }


  viewPics = () => {
    gapi.client.request({
      'path': 'https://www.googleapis.com/drive/v2/files/17Ui0Dd04vmg1Mnmxa3lao-fJtubzEw4X/children',
    }).then((resp) => {
      console.log(resp);
      this.setState({ pics: resp.result.items })
    })
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  render() {
    console.log(this.state.pics)
    const responseGoogle = (response) => {
      console.log(response);
    }

    console.log(this.state.accessToken)

    return <>
      <div>
        {/* {this.state.isLogined ?
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
            clientId={CLIENT_ID}
            buttonText='Login'
            scope={SCOPE}
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
        } */}
        {/* {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null} */}
        <button onClick={this.issigned}>issigned</button>
      </div>
      {/* <input id='inputkurwa' type="file" multiple></input> */}
      <button onClick={this.viewPics}>Pokaż dokumenty</button>
      {/* <button onClick={this.initClient}>base</button> */}

      {this.state.pics && this.state.pics.map((e, index) => <img key={index} style={{ width: '20vw' }} src={`https://drive.google.com/uc?export=view&id=${e.id}`}></img>)}

    </>
  }
}

export default GetDocs;
