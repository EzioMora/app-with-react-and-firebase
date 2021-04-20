import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const PaginationComponent = ({ currentPage, updateCurrentPage, lastPage }) => {
  const renderPagesNumbers = () => {
    const items = [];

    for (let page = 1; page <= lastPage; page++) {
      items.push(
        <Pagination.Item key={page} active={currentPage === page} onClick={() => updateCurrentPage(page)}>
          {page}
        </Pagination.Item>
      )
    }

    return items
  }

  return (
    <>
      <Pagination>
        {renderPagesNumbers()} 
      </Pagination>
      {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>    */}
    </>
  );
}

export default PaginationComponent;