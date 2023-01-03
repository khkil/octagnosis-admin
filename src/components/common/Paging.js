import React from 'react';
import Pagination from "react-js-pagination";

const Paging = ({ page, goPage, pageInfo }) => {

  const { total, pageSize } = pageInfo;

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={pageSize}
      totalItemsCount={total}
      pageRangeDisplayed={10}
      onChange={goPage}
    />
  )
}

export default Paging;