import React, { useContext, useState } from "react";
import Alert from "@/component/Alert";
import UsersTable from "@/component/UsersTable";
import Pagination from "@/component/Pagination";
import Navbar from "@/component/Navbar";
import AppContext from "@/context/appContext";
import { Paginate } from "@/helpers/paginate";
import { Search } from "@/helpers/search";
import CheckedContext from "@/context/checkedContext";

const Layout = () => {
  const value = useContext(AppContext);

  const [checkedUser, setCheckedUser] = useState([]);
  console.log(checkedUser);
  const [alertMessage, setAlertMessage] = useState("");
  const [saveUser, setSaveUser] = useState({
    username: "",
    email: "",
  });
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  let searchedResult;
  let paginateUser;
  if (searchQuery.length > 0) {
    searchedResult = Search(value.users, searchQuery);
    paginateUser = Paginate(searchedResult, currentPage, pageSize);
  } else {
    paginateUser = Paginate(value.users, currentPage, pageSize);
  }

  const handleSaveChange = ({ target: { name, value } }) => {
    setSaveUser({ ...saveUser, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saveUser),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user`,
      reqOption,
    );
    const result = await response.json();

    setSaveUser({
      username: "",
      email: "",
    });

    if (result) {
      setAlertMessage("User added successfully");
      document.getElementsByClassName("addCancel")[0].click();
      let prevUsers = value.users;
      prevUsers.push(result);

      value.setUsers(prevUsers);
    }
  };

  const handleDelete = async (userId) => {
    const reqOption = {
      method: "DELETE",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/${userId}`,
      reqOption,
    );
    const result = await response.json();

    if (result) {
      setAlertMessage("User deleted successfully");
      const prevUsers = value.users;
      const newUsers = prevUsers.filter((user) => user.id !== userId);
      value.setUsers(newUsers);
    }
  };

  const handleEditChange = ({ target: { name, value } }) => {
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const reqOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/${editUser.id}`,
      reqOption,
    );
    const result = await response.json();

    if (result) {
      setAlertMessage("User edited successfully");
      document.getElementsByClassName("editCancel")[0].click();
      const prevUsers = value.users.filter((user) => user.id !== editUser.id);
      prevUsers.push(result);
      value.setUsers(prevUsers);
    }
  };

  return (
    <>
      <CheckedContext.Provider value={{ checkedUser, setCheckedUser }}>
        <div>
          <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form action="#" method="POST" onSubmit={handleAddSubmit}>
                  <div className="modal-header">
                    <h4 className="modal-title">Add Employee</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        value={saveUser.username}
                        onChange={handleSaveChange}
                        type="text"
                        className="form-control"
                        name="username"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={saveUser.email}
                        onChange={handleSaveChange}
                        type="email"
                        className="form-control"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default addCancel"
                      name="submit"
                      data-dismiss="modal"
                      defaultValue="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Add"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form action="#" method="PUT" onSubmit={handleEditSubmit}>
                  <div className="modal-header">
                    <h4 className="modal-title">Edit Employee</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <input type="hidden" name="updateId" className="updateId" />
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        value={editUser.username}
                        onChange={handleEditChange}
                        type="text"
                        className="form-control updateUsername"
                        name="username"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>email</label>
                      <input
                        value={editUser.email}
                        onChange={handleEditChange}
                        type="text"
                        className="form-control updatePassword"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      name="submit"
                      className="btn btn-default editCancel"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-info"
                      value="Save"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="container-xl">
            <div className="table-responsive d-flex flex-column">
              <Alert
                text={alertMessage}
                setAlertMessage={setAlertMessage}
                style={alertMessage.length > 0 ? "block" : "none"}
              />
              <div className="table-wrapper">
                <Navbar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setAlertMessage={setAlertMessage}
                />
                <UsersTable
                  users={paginateUser}
                  handleDelete={handleDelete}
                  setEditUser={setEditUser}
                />
                <Pagination
                  usersCount={
                    searchQuery.length > 0
                      ? searchedResult.length
                      : value.users.length
                  }
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onChangePage={onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </CheckedContext.Provider>
    </>
  );
};

export default Layout;
