import React from 'react'

const timeSince = (toFormat) => {
  let seconds = Math.floor((new Date() - new Date(toFormat)) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) return interval + " years"

  interval = Math.floor(seconds / 2592000)
  if (interval > 1) return interval + " months"

  interval = Math.floor(seconds / 86400)
  if (interval > 1) return interval + " days"

  interval = Math.floor(seconds / 3600)
  if (interval > 1) return interval + " hours"

  interval = Math.floor(seconds / 60)
  if (interval > 1) return interval + " minutes"

  return Math.floor(seconds) + " seconds"
}

const AgoDate = (props) => {
  return (
    <small>{ props.date ? `${timeSince(props.date)} ago` : 'No Date'}</small>
  )
}

export default AgoDate