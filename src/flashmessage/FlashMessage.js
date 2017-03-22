import React from 'react'
import classnames from 'classnames'
import './flashMessage.css'

const FlashMessage = (props) => {
  const onClick = () => {
    props.deleteFlashMessage(props.message.id)
  }

  return (
    <div>
      <div className={classnames('notification', {
        'is-success': props.message.type === 'success',
        'is-danger': props.message.type === 'error'
      })}>
        <button onClick={onClick} className="delete"></button>
        {props.message.text}
      </div>
    </div>
  )
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage
