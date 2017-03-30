import React from 'react';
import NotificationItem from './NotificationItem';
import { connect } from 'react-redux';
import { deleteNotification } from './actions';

class NotificationList extends React.Component {
  render(){
    const messages = this.props.messages.map(message => 
      <Notification key={message.id} message={message} deleteNotification={this.props.deleteNotification} />
    )

    return (
      <div className="flashmessage-container">
        {messages}
      </div>
    )
  }
}

NotificationList.propTypes = {
  messages: React.PropTypes.array.isRequired,
  deleteNotification: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.notifications
  }
}


export default connect(mapStateToProps, { deleteNotification })(NotificationList);
