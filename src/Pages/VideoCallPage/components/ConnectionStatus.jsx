import React from 'react';
import '../OpenTok.css'
class ConnectionStatus extends React.Component {
  render() {
    let status = this.props.connected ? 'Connected' : 'Disconnected';
    return (
      <div className="connectionStatus">
        <strong>Status:</strong> {status}
      </div>
    );
  }
}
export default ConnectionStatus;
