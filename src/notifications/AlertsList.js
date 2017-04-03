import React from 'react';
import AlertItem from './AlertItem';
import { connect } from 'react-redux';
import { hideNotificationAlert } from './actions';

class AlertList extends React.Component {
  render(){
    const alerts = this.props.alerts.map(alert => 
      <AlertItem key={alert.id} message={alert} hideNotificationAlert={this.props.hideNotificationAlert} />
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
  hideNotificationAlert: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    alerts: state.notifications.alerts
  }
}


export default connect(mapStateToProps, { hideNotificationAlert })(AlertList);
