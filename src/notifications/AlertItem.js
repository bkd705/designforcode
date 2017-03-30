import React from 'react'
import classnames from 'classnames'
import './notification.css'

const AlertItem = (props, context) => {
  const onRemove = () => {
    props.deleteNotification(props.message.id)
  }

  const onClick = () => {
    if (!props.message.link) return
    
    context.router.push(props.message.link)
  }

  setTimeout(() => {
    props.deleteNotification(props.message.id)
  }, 3000)

  return (
    <div onClick={onClick}>
      <div className={classnames('notification', {
        'is-success': props.message.type === 'success',
        'is-danger': props.message.type === 'error',
        'is-info': props.message.type === 'info',
        'is-caution': props.message.type === 'caution',
        'is-default': props.message.type === 'default'
      })}>
        <button onClick={onRemove} className="delete"></button>
        <p style={{wordWrap: 'break-word'}}>{props.message.text}</p>
      </div>
    </div>
  )
}

Notification.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteNotification: React.PropTypes.func.isRequired
}

Notification.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Notification
