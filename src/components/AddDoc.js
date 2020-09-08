import { gapi } from 'gapi-script';
import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import insertFile from './upload';

const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const CLIENT_ID = '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com';

class AddDoc extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
    this.state = {
      pics: false,
      isLogined: false,
      accessToken: '',
      chosen: false
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

  addNewPic = () => {
    //const selectedFile = document.getElementById('inputfilenew').files[0];
    const selectedFile = this.fileInput.current.files[0];
    // console.log(selectedFile);
    insertFile(selectedFile);
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
        <p></p>
        {this.state.chosen && <h1>{this.state.chosen}</h1>}
        <input style={{ visibility: 'hidden' }}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          ref={this.fileInput}
          onChange={() => {
            this.setState({ chosen: this.fileInput.current.files[0].name });
            console.log(this.fileInput.current.files[0].name)
          }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Wybierz plik
        </Button>
        </label>
        <p></p>
        {/* <input id='inputfile' type="file" multiple onChange={() => this.setState({chosen: true})}></input> */}
        {this.state.chosen &&
          <Button
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
            onClick={this.addNewPic}
          >
            Wyślij
      </Button>}
      </div>
    </>
  }
}

export default AddDoc;
