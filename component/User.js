import React, { useContext } from "react";
import CheckedContext from "@/context/checkedContext";

const User = ({
  user,
  handleDelete,
  setEditUser,
  checkedAll,
  setCheckedAll,
}) => {
  const value = useContext(CheckedContext);

  const fetchUser = async (userId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/${userId}`,
    );
    const result = await response.json();

    if (result) {
      setEditUser(result);
    }
  };

  const handleChangeChecked = async ({ target }, userId) => {
    const { checked } = target;

    if (checkedAll && !checked) {
      setCheckedAll(false);
    }

    if (checked) {
      value.setCheckedUser([...value.checkedUser, userId]);
    } else {
      const newCheckedUser = value.checkedUser.filter(
        (user) => user.id !== userId,
      );
      value.setCheckedUser(newCheckedUser);
    }
  };

  return (
    <>
      <tr>
        <td>
          <span className="custom-checkbox">
            <input
              onChange={(e) => handleChangeChecked(e, user.id)}
              type="checkbox"
              id="data_checkbox"
              className="data_checkbox"
              name="data_checkbox"
            />
            <label htmlFor="data_checkbox"></label>
          </span>
        </td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <a
            href="#editEmployeeModal"
            onClick={() => fetchUser(user.id)}
            className="edit"
            data-toggle="modal"
          >
            <i className="material-icons" data-toggle="tooltip" title="Edit">
              &#xE254;
            </i>
          </a>
          <a
            href="#deleteEmployeeModal"
            onClick={() => handleDelete(user.id)}
            className="delete"
            data-toggle="modal"
          >
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              &#xE872;
            </i>
          </a>
        </td>
      </tr>
    </>
  );
};

export default User;
