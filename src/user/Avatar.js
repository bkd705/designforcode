import React from 'react'
import md5 from 'blueimp-md5'

const Avatar = ({ email, username, className }) => {
  return <img className={className} src={`https://www.gravatar.com/avatar/${md5(email)}?s=128x128`} alt={`${username}'s avatar`} />
}

Avatar.defaultProps = {
  className: 'image image--avatar'
}

export default Avatar