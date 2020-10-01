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
      resp.result.items.forEach(element => {
        if (element.title.includes(this.props.id)) {
          foundIds.push(element);
        }
      });
      console.log(foundIds);
      this.setState({ photosIds: foundIds, loading: false })
    }).catch(() => {
     this.setState({error: true})
    })
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  render() {
    if (this.state.error) {
      return <Box minWidth={500}><Box m={5}><Alert severity="error">Błąd! Spróbuj jeszcze raz.</Alert></Box></Box>
    }
    return <>
      <Box minWidth={500}>
        <SimpleReactLightbox>
          {/* <div>
            <button onClick={this.issigned}>issigned</button>
          </div> */}
          {this.state.photosIds.length == 0 && <Box m={5}><Alert severity="warning">Brak dokumentów!</Alert></Box>}
          {this.state.loading == 1 && <Box m={5} p={10} display='flex' justifyContent='center' alignItems='center'><CircularProgress /></Box>}
          <SRLWrapper>
          {(this.state.photosIds && this.state.photosIds.length > 0) &&
            this.state.photosIds.map((e, index) =>
              <>
                <Box my={2} display='flex' justifyContent='center' alignItems='center'>
                  <a href={`https://drive.google.com/uc?export=view&id=${e.id}`} data-attribute="SRL">
                    <img src={e.thumbnailLink} />
                  </a>
                </Box>
                <Divider />
              </>
            )
          }
            </SRLWrapper>
        </SimpleReactLightbox>
    </Box>
    </>
  }
}

export default GetDocs;
