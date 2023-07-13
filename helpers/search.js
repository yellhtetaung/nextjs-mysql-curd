export const Search = (data, searchQuery) => {
  if (data) {
    const searchData = data.filter((element) => {
      return element.username.includes(searchQuery);
    });

    return searchData;
  } else return null;
};
