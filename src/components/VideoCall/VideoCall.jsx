import React from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { Button, Typography } from '@material-ui/core';

export default class VideoCall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected' });
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' });
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' });
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };
  }

  onSessionError = error => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log('Publish Success');
  };

  onPublishError = error => {
    this.setState({ error });
  };

  onSubscribe = () => {
    console.log('Subscribe Success');
  };

  onSubscribeError = error => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState(state => ({
      publishVideo: !state.publishVideo,
    }));
  };

  render() {
    const { apiKey, sessionId, token } = this.props.credentials;
    const { error, connection, publishVideo } = this.state;
    return (
      <div>
        <Typography variant='h3' align='center' id="sessionStatus"><b>Session Status:</b> {connection}</Typography>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}> 
            <Button style={{color: 'blue', width: '20%'}} id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </Button>
          <OTPublisher
            properties={{ publishVideo, width: 500, height: 300, }}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
          />
          </div>
          
          <OTStreams>
            <OTSubscriber
              properties={{ width: 100, height: 100 }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}