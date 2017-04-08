import React from 'react'

const ChatsList = ({ chats, active, changeChat, newChatComponent }) => {
  const list = chats.map((chat, key) => {
    if (active && active.username === chat.user.username) {
      return (
        <li key={key} onClick={() => changeChat(chat.user)}>
          <a className="is-active">{chat.user.username}</a>
        </li>
      )
    } else {
      return (
        <li key={key} onClick={() => changeChat(chat.user)}>
          <a>{chat.user.username}</a>
        </li>
      )
    }
  })
  return (
    <aside className="menu">
      <p className="menu-label">
        Private Chats
      </p>
      <ul className="menu-list">
        {newChatComponent}
        {list}
      </ul>
    </aside>
  )
}

export default ChatsList
