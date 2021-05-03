import React from 'react';
import '../OpenTok.css'
import { OTSubscriber } from 'opentok-react';
import CheckBox from './CheckBox';
import { Card, Container, Grid } from '@material-ui/core';

class Subscriber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  onError = (err) => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
  }

  render() {
    return (
      <Container>
        
         <Grid container spacing={3}>
       
        <Grid 
        item
        lg={4}
            sm={6}
            xl={3}
            xs={12}
        >
          <OTSubscriber
          properties={
            {
              width: 500, height:350,
            subscribeToAudio: this.state.audio,
            subscribeToVideo: this.state.video
          }}
          onError={this.onError}
        />
        
      <Card style={{width:'500px', display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <CheckBox
          label="Subscribe to Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
        </div>
          <div>
             <CheckBox
          label="Subscribe to Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
          </div>
        </Card>
        
      </Grid>
      
        </Grid>
        
      <div>
         {this.state.error ? <div id="error">{this.state.error}</div> : null}
      </div>
      </Container>
     
    );
  }
}
export default Subscriber;
