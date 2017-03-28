import React from 'react'
import classnames from 'classnames'
import './flashMessage.css'

const FlashMessage = (props, context) => {
  const onRemove = () => {
    props.deleteFlashMessage(props.message.id)
  }

  const onClick = () => {
    if (!props.message.link) return
    
    context.router.push(props.message.link)
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

FlashMessage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default FlashMessage
