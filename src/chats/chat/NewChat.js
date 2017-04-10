import React from 'react'
import InputField from '../../form/InputField'
import '../styles.css'

const NewChat = ({ onChange, newChatUser, error, onClick}) => {
  return (
    <div className="field has-addons">
      <InputField
        placeholder="Enter a username..."
        name="newChatUser"
        onChange={onChange}
        value={newChatUser}
        error={error}
      />
      <p className="control">
        <a onClick={onClick} className="button is-info">
          New Chat
        </a>
      </p>
    </div>
  )
}

export default NewChat
