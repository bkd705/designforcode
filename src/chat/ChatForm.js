import React from 'react'
import InputField from '../form/InputField'

const ChatForm = ({ onSubmit, onChange, messageValue, errors }) => {
  return (
    <form onSubmit={onSubmit} className="chat--form">
      <div className="field">
        <InputField
          name="message"
          value={messageValue}
          placeholder="Enter your message..."
          onChange={onChange}
          error={errors.message}
          autocomplete="off"
        />
      </div>
      <input type="submit" hidden/>
    </form>
  )
}

export default ChatForm
