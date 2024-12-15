import React from "react";
import { useCollection } from "../hooks/customFetch";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function UsersList() {
  const { data } = useCollection("agnks");

  return (
    <>
      {data &&
        data.map((user, index) => (
          <tr key={user.id}>
            <th>{user.tr}</th>
            <th>{user.ltd_name}</th>
            <th>{user.filial}</th>
            <td>{user.moljal}</td>
            <td>{user.viloyat}</td>
            <td>{user.gaz_taminot}</td>
            <td>
              <Button>Удалить</Button>
            </td>
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
