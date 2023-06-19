import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const notify = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const getAllUsers = async () => {
    api.get('/users').then((response) => {
      setUsers(response.data);
    });
  };

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const deleteUser = async (id) => {
    api
      .delete(`/users/${id}`)
      .then((_response) => {
        getAllUsers();
        notify('User deleted successfully');
      })
      .catch((err) => {
        notifyError(err.response.data.error);
      });
  };

  const setUserToEdit = (user) => {
    const { id, name, email, password, isAdmin } = user;
    setUser({
      id,
      name,
      email,
      password,
      isAdmin,
    });
    setIsEdit(true);
  };

  const toogleAdmin = () => {
    setUser({ ...user, isAdmin: !user.isAdmin });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    api
      .put(`/users/${user.id}`, user)
      .then((_response) => {
        notify('User updated successfully');
        getAllUsers();
        setIsEdit(false);
      })
      .catch((error) => {
        notifyError(error.response.data.error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {isEdit && (
        <div className='modal is-active'>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <div className='modal-background'></div>
          <div className='modal-content'>
            <div className='box'>
              <form className='form-edit'>
                <div className='field'>
                  <label className='label'>Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Name'
                      value={user.name}
                      onChange={(e) => handleChange(e)}
                      name='name'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>E-mail</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='email'
                      placeholder='E-mail'
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      name='email'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='password'
                      placeholder='Password'
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                      name='password'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>
                    is Admin? {'   '}
                    <input
                      type='checkbox'
                      checked={user.isAdmin}
                      onClick={toogleAdmin}
                    />
                  </label>
                </div>
                <div className='field is-grouped'>
                  <div className='control'>
                    <button
                      className='button is-link'
                      onClick={handleUpdateUser}
                    >
                      Submit
                    </button>
                  </div>
                  <div className='control'>
                    <button
                      onClick={() => setIsEdit(false)}
                      className='button is-link is-light'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button
            onClick={() => setIsEdit(false)}
            className='modal-close is-large'
            aria-label='close'
          ></button>
        </div>
      )}
      <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>is Admin?</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <input type='checkbox' checked={user.isAdmin} />
              </td>
              <td>
                <button
                  onClick={() => setUserToEdit(user)}
                  className='button is-warning'
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
                  className='button is-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
