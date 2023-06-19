import { useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slicer/slice';
import './Login.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setLogin({ ...login, [target.name]: target.value });
  };

  const handleCreateUser = () => {
    navigate('/createuser');
  };

  const handleClick = () => {
    const { email, password } = login;
    setIsLoading(true);
    api
      .get(`/users/${email}/${password}`)
      .then((response) => {
        dispatch(addUser(response.data));
        navigate('/welcome');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    setIsLoading(false);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  return (
    <form className="bg-slate-400 w-64">
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="email"
            data-testid="email-input"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </p>
      </div>

      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="password"
            data-testid="password-input"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </p>
      </div>
      <button
        className={
          isLoading
            ? 'button is-link is-loading is-responsive is-rounded'
            : 'button is-link is-rounded'
        }
        type="button"
        data-testid="btn-play"
        // disabled={ }
        onClick={handleClick}
      >
        Entrar
      </button>
      <button
        className='button is-link is-rounded'
        type="button"
        data-testid="btn-play"
        // disabled={ }
        onClick={handleCreateUser}
      >
        Criar cadastro
      </button>
      {error && <p className="text-red-600 bold text-lg m-0">{error}</p>}
    </form>
  );
}
