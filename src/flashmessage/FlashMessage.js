import React from 'react'
import classnames from 'classnames'
import './flashMessage.css'

const FlashMessage = (props) => {
  const onRemove = () => {
    props.deleteFlashMessage(props.message.id)
  }

  const onClick = () => {
    // TODO: Change this to a router push
    location.href = props.message.link
  }

  setTimeout(() => {
    props.deleteFlashMessage(props.message.id)
  }, 3000)

  return (
    <div onClick={onClick}>
      <div className={classnames('notification', {
        'is-success': props.message.type === 'success',
        'is-danger': props.message.type === 'error'
      })}>
        <button onClick={onRemove} className="delete"></button>
        <p style={{wordWrap: 'break-word'}}>{props.message.text}</p>
      </div>
    </div>
  )
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage
