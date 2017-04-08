import React from 'react'

const PaginationButton = ({ value, onClick, active }) => {
  return (
    <li onClick={onClick}>
      { active 
        ? <a className="pagination-link is-current">{value}</a> 
        : <a className="pagination-link">{value}</a>  }
    </li>
  )
}

export default PaginationButton