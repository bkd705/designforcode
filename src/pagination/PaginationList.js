import React, { PropTypes as P } from 'react'
import PaginationButton from './PaginationButton'

import './pagination.css'

const PaginationList = ({ pages, currentPage, changePage }) => {

  let buttons = []
  if(pages > 0) {
    for(let i = 1; i < pages + 1; i++) {
      i === currentPage
      ? buttons.push(<PaginationButton key={i} value={i} onClick={(e) => changePage(e, i)} active />)
      : buttons.push(<PaginationButton key={i} value={i} onClick={(e) => changePage(e, i)} />)
    }
  }

  return (
    <nav className="pagination">
      <a onClick={(e) => changePage(e, currentPage - 1)} className="pagination-previous" title="This is the first page">&laquo;</a>
      <ul className="pagination-list">
        {pages > 0 && buttons}
      </ul>
      <a onClick={(e) => changePage(e, currentPage + 1)} className="pagination-next">&raquo;</a>
    </nav>
  )
}

PaginationList.propTypes = {
  pages: P.number.isRequired,
  currentPage: P.number.isRequired,
  changePage: P.func.isRequired
}

export default PaginationList
