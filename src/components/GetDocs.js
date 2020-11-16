import { gapi } from 'gapi-script';
import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class GetDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosIds: false,
      otherIds: false,
      loading: false,
      error: false,
      isSigned: gapi.auth2.getAuthInstance().isSignedIn.get()
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
      });
      this.setState({ photosIds: foundIds, loading: false })
      this.setState({ otherIds: notPicsfoundIds, loading: false })
    }).catch(() => {
      this.setState({ error: true })
    })
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }


  render() {
    if (this.state.error) {
      return <Box minWidth={500}>
        <Box m={5}>
        <button onClick={this.issigned}>issigned</button>
          <Alert severity="error">Błąd! Spróbuj jeszcze raz.</Alert>
          {this.state.isSigned ?
          <GoogleLogout
            //clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
            //clientId={CLIENT_ID}
            buttonText='Login'
            //scope={SCOPE}
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
        }
        </Box>
      </Box>
    }
    return <>
      <Box minWidth={800}>
        <SimpleReactLightbox>
          {/* <div>
            <button onClick={this.issigned}>issigned</button>
          </div> */}
          {(this.state.photosIds.length == 0 && this.state.otherIds.length == 0) && <Box m={5}><Alert severity="warning">Brak dokumentów!</Alert></Box>}
          {this.state.loading == 1 && <Box m={5} p={10} display='flex' justifyContent='center' alignItems='center'><CircularProgress /></Box>}
          {(this.state.otherIds && this.state.otherIds.length > 0) &&
            this.state.otherIds.map((e, index) =>
              <React.Fragment key={index}>
                <Box my={2} display='flex' justifyContent='center' alignItems='center'>
                  <a href={e.embedLink} target='_blank'>
                    <img referrerPolicy="no-referrer" src={e.thumbnailLink} />
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
