import React from 'react'
import ChatItem from './ChatItem'

const ChatList = ({ messages, sender, receiver }) => {
  return (
    <div className="chat--list">
      {messages.map((message, key) => {
        return message.sender_id === sender.id 
        ? <ChatItem message={message} key={key} user={sender} isCurrentUser /> 
        : <ChatItem message={message} key={key} user={receiver} />
      })}
    </div>
  )
}

export default ChatList