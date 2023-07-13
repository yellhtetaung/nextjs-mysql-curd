import React from "react";

const Pagination = ({ usersCount, currentPage, pageSize, onChangePage }) => {
  const totalPages = Math.ceil(usersCount / pageSize);

  if (totalPages === 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <ul className="pagination">
          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={`page-item ${page === currentPage ? "active" : ""} `}
              >
                <a className="page-link" onClick={() => onChangePage(page)}>
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
