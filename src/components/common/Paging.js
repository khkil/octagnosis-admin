import React from 'react';
import Pagination from 'react-js-pagination';

const Paging = ({ page, setPage, pageInfo }) => {
  return (
    <Pagination
      activeLinkClass="active"
      pageRangeDisplayed={10}
      totalItemsCount={pageInfo.totalElements}
      itemsCountPerPage={pageInfo.size}
      activePage={page}
      onChange={setPage}
    />
  );
};

export default Paging;
