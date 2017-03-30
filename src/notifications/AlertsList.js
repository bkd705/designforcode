import React from 'react';
import AlertItem from './AlertItem';
import { connect } from 'react-redux';
import { deleteNotification } from './actions';

class AlertList extends React.Component {
  render(){
    const alerts = this.props.alerts.map(message => 
      <Notification key={message.id} message={message} deleteNotification={this.props.deleteNotification} />
    )

    return (
      <div className="flashmessage-container">
        {alerts}
      </div>
    )
  }
}

AlertList.propTypes = {
  alerts: React.PropTypes.array.isRequired,
  deleteNotification: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    alerts: state.notifications.alerts
  }
}


export default connect(mapStateToProps, { deleteNotification })(AlertList);
