import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const Table = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    api.get('/users').then((response) => {
      setUsers(response.data);
    });
  };

  const deleteUser = async (id) => {
    api.delete(`/users/${id}`).then((_response) => {
      getAllUsers();
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
                <input type="checkbox" checked={user.isAdmin} />
              </td>
              <td>
                <button 
                  className="button is-warning">
                    Edit
                </button>
              </td>
              <td>
                <button
                  onClick={ () => deleteUser(user.id) } 
                  className="button is-danger">
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
