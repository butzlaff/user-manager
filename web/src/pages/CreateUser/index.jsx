import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const navigate = useNavigate();

  const notify = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 4000,
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
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    // const formData = new FormData(e.target);

    // const name = formData.get('name');
    // const email = formData.get('email');
    // const password = formData.get('password');

    // console.log(formData);
    // console.log(name, email, password);

    api
      .post('/users', user)
      .then((_response) => {
        notify('User created successfully!');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      })
      .catch((error) => {
        notifyError(error.response.data.error);
      });
  };

  return (
    <>
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

      <form
        className='bg-slate-400 w-64'
        onSubmit={handleCreateUser}
        onChange={handleChange}
        name='login'
      >
        <div className='field flex'>
          <label className='flex flex-col'>
            Name: <input type='text' name='name' value={user.name} />
          </label>
        </div>
        <div className='field flex'>
          <label className='flex flex-col'>
            Email: <input type='email' name='email' value={user.email} />
          </label>
        </div>
        <div className='field flex'>
          <label className='flex flex-col'>
            Password:{' '}
            <input type='password' name='password' value={user.password} />
          </label>
        </div>
        <button className='button is-link is-rounded' type='submit'>
          Cadastrar
        </button>
        <button
          type='button'
          className='button is-danger is-rounded'
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>
      </form>
    </>
  );
};

export default CreateUser;
