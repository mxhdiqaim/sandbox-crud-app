import { Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../Spinner";
import { useAuth, getUsers } from "../../context/users/UserState";
import { Navigate } from "react-router-dom";
import { UserItem } from "../index";

const Users = () => {
  const [authState, authDispatch] = useAuth();

  const { users } = authState;

  useEffect(() => {
    getUsers(authDispatch);
  }, [authDispatch]);

  if (users !== null && users.length === 0) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      {users !== null ? (
        <TransitionGroup>
          {users.map((user) => (
            <CSSTransition key={user._id} timeout={500} classNames="item">
              <UserItem user={user} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Users;
