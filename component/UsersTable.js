import React, { useState, useContext } from "react";
import CheckedContext from "@/context/checkedContext";
import User from "@/component/User";

const UsersTable = ({ users, handleDelete, setEditUser }) => {
  const [checkedAll, setCheckedAll] = useState(false);

  const value = useContext(CheckedContext);

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;

    let checkedAllUser;

    const checkboxes = document.querySelectorAll(
      "table tbody input[type='checkbox']",
    );

    if (checked) {
      setCheckedAll(true);

      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      checkedAllUser = [];
      users.map((user) => checkedAllUser.push(user.id));
    } else {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      checkedAllUser = [];
    }
    value.setCheckedUser(checkedAllUser);
  };

  const userGenerator = () => {
    return (
      <>
        {users &&
          users.map((user, index) => (
            <User
              key={index}
              user={user}
              handleDelete={handleDelete}
              setEditUser={setEditUser}
              checkedAll={checkedAll}
              setCheckedAll={setCheckedAll}
            />
          ))}
      </>
    );
  };

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  id="selectAll"
                  value={checkedAll}
                  onChange={(e) => handleSelectAllChange(e)}
                />
                <label htmlFor="selectAll" />
              </span>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userGenerator()}</tbody>
      </table>
    </>
  );
};

export default UsersTable;
