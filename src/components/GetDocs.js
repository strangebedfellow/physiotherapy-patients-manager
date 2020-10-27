import { gapi } from 'gapi-script';
import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// const SCOPE = 'https://www.googleapis.com/auth/drive.file';
// const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const CLIENT_ID = '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com';

class GetDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosIds: false,
      otherIds: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    this.viewPics();
  }

  viewPics = () => {
    this.setState({ loading: 1 })
    gapi.client.request({
      'path': 'https://www.googleapis.com/drive/v2/files',
    }).then((resp) => {
      console.log(resp)
      const foundIds = [];
      const notPicsfoundIds = [];
      resp.result.items.forEach(element => {
        if (element.title.includes(this.props.id)) {
          if (element.mimeType === 'image/jpeg') {
            foundIds.push(element);
          }
          else { notPicsfoundIds.push(element) };
        }
        // if (element.mimeType === 'application/pdf') {
        //   notPicsfoundIds.push(element)
        // }
      });
      console.log(foundIds);
      console.log(notPicsfoundIds);
      this.setState({ photosIds: foundIds, loading: false })
      this.setState({ otherIds: notPicsfoundIds, loading: false })
    }).catch(() => {
      this.setState({ error: true })
    })
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  logout = (response) => {
    console.log(response);
  }

  render() {
    if (this.state.error) {
      return <Box minWidth={500}>
        <Box m={5}>
          <Alert severity="error">Błąd! Spróbuj jeszcze raz.</Alert>
          <GoogleLogin
            clientId="CLIENT_ID"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <GoogleLogout
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          >
          </GoogleLogout>
        </Box>
      </Box>
    }
    return <>
      <Box minWidth={800}>
        <SimpleReactLightbox>
          {/* <div>
            <button onClick={this.issigned}>issigned</button>
          </div> */}
          {this.state.photosIds.length == 0 && <Box m={5}><Alert severity="warning">Brak dokumentów!</Alert></Box>}
          {this.state.loading == 1 && <Box m={5} p={10} display='flex' justifyContent='center' alignItems='center'><CircularProgress /></Box>}
          {(this.state.otherIds && this.state.otherIds.length > 0) &&
            this.state.otherIds.map((e, index) =>
              <React.Fragment key={index}>
                <Box my={2} display='flex' justifyContent='center' alignItems='center'>
                  <a href={e.embedLink} target='_blank'>
                    <img src={e.thumbnailLink} />
                  </a>
                </Box>
                <Divider variant='middle' />
              </React.Fragment>
            )
          }
          <SRLWrapper>
            {(this.state.photosIds && this.state.photosIds.length > 0) &&
              this.state.photosIds.map((e, index) =>
                <React.Fragment key={index}>
                  <Box my={2} display='flex' justifyContent='center' alignItems='center'>
                    <a href={`https://drive.google.com/uc?export=view&id=${e.id}`} data-attribute="SRL">
                      {/* <img src={e.thumbnailLink} /> */}
                      <img src={`https://drive.google.com/uc?export=view&id=${e.id}`} style={{ width: '200px' }} />
                    </a>
                  </Box>
                  <Divider variant='middle' />
                </React.Fragment>
              )
            }
          </SRLWrapper>
        </SimpleReactLightbox>
      </Box>
    </>
  }
}

export default GetDocs;
