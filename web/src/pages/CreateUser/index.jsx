import React from 'react';

const CreateUser = () => {
  return (
    <form className="bg-purple-200 w-64">
      <div className="field flex">
        <label className="flex flex-col">
          Name: <input type="text" />
        </label>
      </div>
      <div className="field flex">
        <label className="flex flex-col">
          Email: <input type="text" />
        </label>
      </div>
      <div className="field flex">
        <label className="flex flex-col">
          Password: <input type="text" />
        </label>
      </div>
    </form>
  );
};

export default CreateUser;
