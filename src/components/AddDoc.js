import { gapi } from 'gapi-script';
import React, { Component } from 'react';
//import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import insertFile from './upload';

// const SCOPE = 'https://www.googleapis.com/auth/drive.file';
// const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// const CLIENT_ID = '1056677394968-63s22pqs8cjavdh0a2vgcs5v8k5tvpsg.apps.googleusercontent.com';

class AddDoc extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      chosen: false,
      src: false,
      uploading: false,
      respError: false,
      uploadedFile: false
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
    const fileName = this.props.id;
    const selectedFile = this.fileInput.current.files[0];
    insertFile(selectedFile, fileName, (resp) => {
      Object.keys(resp).includes('error') ? this.setState({ respError: true }) : this.setState({ uploadedFile: true, uploading: false, chosen: false })
    });
    this.setState({ uploading: true });

  }

  selectPic = () => {
    const selectedFile = this.fileInput.current.files[0];
    this.setState({ chosen: selectedFile.name, src: URL.createObjectURL(selectedFile), uploading: false });
  }

  issigned = () => {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  render() {
    if (this.state.respError) {
      return <Box p={2}><Alert severity="error">Błąd! Spróbuj jeszcze raz.</Alert></Box>
    }

    if (this.state.uploadedFile) {
      return <Box p={2}><Alert severity="success">Dodano nowy dokument!</Alert></Box>
    }

    return <>
      <Box p={2}>
        {/* <button onClick={this.issigned}>issigned</button> */}
        <p></p>
        {this.state.src && <img src={this.state.src} width='300px' />}
        <input style={{ visibility: 'hidden' }}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          ref={this.fileInput}
          onChange={this.selectPic}
        />
        <p></p>
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" startIcon={<ImageSearchIcon />}>
            Wybierz plik
        </Button>
        </label>
        <p></p>
        {this.state.uploading ? <CircularProgress /> :
          <Button
            variant="contained"
            color="secondary"
            disabled={!this.state.chosen ? true : false}
            endIcon={<SendIcon />}
            onClick={this.addNewPic}
          >
            Wyślij
      </Button>}
      </Box>
    </>
  }
}

export default AddDoc;
