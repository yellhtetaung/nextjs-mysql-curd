export const Paginate = (data, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  if (data) return data?.slice(startIndex, startIndex + pageSize);
  else return null;
};
