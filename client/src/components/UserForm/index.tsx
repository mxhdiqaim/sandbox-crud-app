import { useState, useEffect } from "react";

import { useAuth, updateUser } from "../../context/users/UserState";

interface InitialUserType {
  name: string;
  email: string;
  description: string;
}

const initialUser: InitialUserType = {
  name: "",
  email: "",
  description: "",
};

const UserForm = ({ current, setCurrent }: any) => {
  const [authDispatch] = useAuth();

  const [newUser, setNewUser] = useState<InitialUserType>(initialUser);

  const { name, email, description } = newUser;

  const onChange = (e: any) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (newUser) {
      updateUser(authDispatch, newUser);
    }
  };

  const clearAll = () => {
    setCurrent(null);
  };

  useEffect(() => {
    if (current !== null) {
      setNewUser(current);
    } else {
      setNewUser(initialUser);
    }
  }, [current]);

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Edit Account</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <textarea
        placeholder="Description"
        name="description"
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Update User"
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default UserForm;
