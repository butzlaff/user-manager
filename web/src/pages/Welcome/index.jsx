import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { resetData } from '../../redux/slicer/slice';

const Welcome = () => {
  const name = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);

  const isAdmin = useSelector((state) => state.user.isAdmin);

  const toogleUsers = () => {
    setShowUser(!showUser);
  };

  const fakeLogout = () => {
    dispatch(resetData());
  };

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name]);

  return (
    <div>
      <h1>{`Welcome ${name}`}</h1>
      {isAdmin && (
        <button className="button is-primary" onClick={toogleUsers}>
          Exibir Users
        </button>
      )}
      <button className="button is-danger" onClick={fakeLogout}>
        Sair
      </button>
      {showUser && <Table />}
    </div>
  );
};

export default Welcome;
