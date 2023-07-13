import React, { useContext } from "react";
import AppContext from "@/context/appContext";
import CheckedContext from "@/context/checkedContext";

const Navbar = ({ searchQuery, setSearchQuery, setAlertMessage }) => {
  const value = useContext(AppContext);
  const CheckedContextData = useContext(CheckedContext);

  const checkedIds = CheckedContextData.checkedUser;

  const handleMultiDelete = async (e) => {
    const reqOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: checkedIds }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/deleteMulti`,
      reqOptions,
    );
    const result = await response.json();

    if ("ids" in result) {
      setAlertMessage("Multi users deleted.");
      const newUsers = value.users.filter(
        (user) => result.ids.indexOf(user.id) !== -1,
      );
      value.setUsers(newUsers);
    }
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              NextJS-MySQL <b>CRUD</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <a
              href="#addEmployeeModal"
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Add New Employee</span>
            </a>
            <a
              href="#"
              className="delete_all_data btn btn-danger"
              onClick={handleMultiDelete}
            >
              <i className="material-icons">&#xE15C;</i>
              <span>Delete</span>
            </a>
            <input
              value={searchQuery}
              onChange={async (e) => await setSearchQuery(e.target.value)}
              type="text"
              className="form-control"
              style={{ width: "200px", float: "right", height: "34px" }}
              name="search_user"
              placeholder="Search a username..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
