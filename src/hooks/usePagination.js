import { useState } from 'react';

const initalState = {
  currentPage: 1,
  lastPage: 1,
  itemsPerPage: 10
}

const usePagination = () => {
  const [pagination, setPagination] = useState(initalState);

  const updateCurrentPage = (newCurrentPage) => {
    const newPagination = { 
      ...pagination,
      currentPage: newCurrentPage
    }

    setPagination(newPagination)
  }

  const updateLastPage = (newLastPage) => {
    const totalItems = newLastPage * pagination.itemsPerPage;
    
    const newPagination = { 
      ...pagination,
      lastPage: newLastPage
    }

    if (totalItems > pagination.itemsPerPage) {
      newPagination.hasNext = true
    }

    setPagination(newPagination)
  }

  return {
    ...pagination,
    updateCurrentPage,
    updateLastPage
  }
}

export default usePagination