import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthGuard } from "../../shared";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { adminHeader } from "../../shared/functions/Token";
import DeleteModal from "../../shared/DeleteModal/DeleteModal";
import ModaratorAddModal from "./ModaratorAddModal/ModaratorAddModal";
import ModaratorUpdateModal from "./ModaratorUpdateModal/ModaratorUpdateModal";
import PasswordChangeModal from "./PasswordChangeModal/PasswordChangeModal";

import "./style.scss";

function Management() {
  document.title = "Admins Management";

  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [passChangeId, setPassChangeId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [modarators, setModarators] = useState([]);
  const [modarator, setModarator] = useState({});

  const [modaratorAdd, setModaratorAdd] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [changePass, setChangePass] = useState({
    perviousPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => {
    setModarator({});
    setUpdateShow(false);
  };
  const handleUpdateShow = () => setUpdateShow(true);

  const handlePasswordModalClose = () => {
    setPassChangeId("");
    setChangePass({
      perviousPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setPasswordShow(false);
  };

  const handlePasswordModalShow = (id) => {
    setPassChangeId(id);
    setPasswordShow(true);
  };

  const handleDeleteShow = (id) => {
    setDeleteId(id);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteId("");
    setDeleteShow(false);
  };

  //fetch all manager data
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getAllModarator();
    }

    return () => {
      unmounted = true;
    };
  }, []);

  // get all modarator data
  const getAllModarator = () => {
    axios
      .get(`${BACKEND_URL}/admin/get-modarators`, { headers: adminHeader() })
      .then(({ data }) => {
        setModarators(data?.data);
      })
      .catch((err) => {
        console.log("Something went wrong.");
      });
  };

  // fetch single modarator data
  const getSingleModaratorById = (id) => {
    axios
      .get(`${BACKEND_URL}/admin/get-modarator/${id}`, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        console.log(data?.data, "fetch data ");
        setModarator(data?.data);
      })
      .catch((err) => {
        console.log("something went wrong.");
      });
  };

  // Here add modarator by admins
  const SaveHandler = () => {
    axios
      .post(`${BACKEND_URL}/admin/admin-register`, modaratorAdd, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        const newlyAddData = [data?.data, ...modarators];

        setModarators(newlyAddData);
        handleClose();
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  //inputChange for update fields
  const inputChange = (e) => {
    setModarator({
      ...modarator,
      [e.target.name]: e.target.value,
    });
  };

  //update modatrators from admin
  const updateHandler = (id) => {
    axios
      .put(`${BACKEND_URL}/admin/update-admin-user/${id}`, modarator, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        handleUpdateClose();
        getAllModarator();
        setModarator({});
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  //delete modarators from admin
  const deleteHandler = (id) => {
    axios
      .delete(`${BACKEND_URL}/admin/delete-admin-user/${id}`, {
        headers: adminHeader(),
      })
      .then((res) => {
        const allModaratorsAfterDelete = modarators.filter(
          (item) => item?._id != id
        );
        setModarators(allModaratorsAfterDelete);
        setDeleteShow(false);
      })
      .catch((err) => {
        console.log(err, "something went wrong.");
      });
  };

  //change modarator password
  const PasswordChangeHandler = (id) => {
    axios
      .put(`${BACKEND_URL}/admin/change-password/${id}`, changePass, {
        headers: adminHeader(),
      })
      .then((res) => {
        handlePasswordModalClose();
        getAllModarator();
      })
      .catch((err) => {
        console.log(err.response?.data?.message, "something went wrong.");
      });
  };

  return (
    <div className="management-section">
      <div className="add-modal-sections">
        <button className="add-modal-btn" onClick={handleShow}>
          Add
        </button>

        <ModaratorAddModal
          show={show}
          handleClose={handleClose}
          modaratorAdd={modaratorAdd}
          setModaratorAdd={setModaratorAdd}
          SaveHandler={SaveHandler}
        />
      </div>

      <div className="tabel-sections">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Location</th>
              <th>IP</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {modarators?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td>{item?.phone}</td>
                <td>{item?.role}</td>
                <td></td>
                <td></td>
                <td className="action-btn">
                  <button
                    className="update-btn"
                    onClick={() => {
                      getSingleModaratorById(item?._id);
                      handleUpdateShow();
                    }}>
                    Update
                  </button>

                  <button
                    className="change-pass-btn"
                    onClick={() => {
                      handlePasswordModalShow(item?._id);
                    }}>
                    Change Password
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteShow(item?._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Update Modal  */}
      <ModaratorUpdateModal
        show={updateShow}
        handleClose={handleUpdateClose}
        items={modarator}
        updateHandler={updateHandler}
        inputChange={inputChange}
      />

      {/* Change Password Modal */}

      <PasswordChangeModal
        show={passwordShow}
        handleClose={handlePasswordModalClose}
        changePass={changePass}
        setChangePass={setChangePass}
        passwordChangeHandler={PasswordChangeHandler}
        id={passChangeId}
      />

      {/* Delete Modal */}

      <DeleteModal
        show={deleteShow}
        handleClose={handleDeleteClose}
        id={deleteId}
        deleteHandler={deleteHandler}
        text="Are you sure to delete the modarator ?"
      />
    </div>
  );
}

export default Management;
