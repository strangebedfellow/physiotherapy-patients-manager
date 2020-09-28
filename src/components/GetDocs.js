import { gapi } from 'gapi-script';
import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// const SCOPE = 'https://www.googleapis.com/auth/drive.file';
// const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const CLIENT_ID = '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com';

class GetDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosIds: false,
      isLogined: false,
      accessToken: ''
    };
  }

  componentDidMount() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: CLIENT_ID
      });
    }
    )
  }

  viewPics = () => {
    gapi.client.request({
      'path': 'https://www.googleapis.com/drive/v2/files',
    }).then((resp) => {
      const tempIds = [];
      resp.result.items.forEach(element => {
        if (element.title.includes(this.props.id)) {
          tempIds.push(element.id)
        }
      });
      console.log(tempIds);
      this.setState({ photosIds: tempIds })
    })
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  render() {
    return <>
      <div>
        <button onClick={this.issigned}>issigned</button>
      </div>
      {!this.state.photosIds && <button onClick={this.viewPics}>Pokaż dokumenty</button>}
      {this.state.photosIds.length == 0 && <p>Brak dokumentów pacjenta!</p>}
      {this.state.photosIds && this.state.photosIds.map((e, index) => <img key={index} style={{ width: '20vw' }} src={`https://drive.google.com/uc?export=view&id=${e}`}></img>)}
    </>
  }
}

export default GetDocs;
