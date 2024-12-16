import React from "react";
import { useCollection } from "../hooks/customFetch";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function UsersList() {
  const { data } = useCollection("users");

  return (
    <>
      {data &&
        data.map((user, index) => (
          <tr key={user.id}>
            <th>{user.name}</th>
            <td>{user.email}</td>
            <td>{user.rol}</td>
            <td>{user.tel}</td>

            <td>
              <Link to={`/users/edit/${user.id}`}>
                <Button>Редактировать</Button>
              </Link>
            </td>
          </tr>
        ))}
    </>
  );
}

export default UsersList;
