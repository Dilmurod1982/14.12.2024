import React from "react";
import { useCollection } from "../hooks/customFetch";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function UsersList() {
  const { data } = useCollection("ltd");

  return (
    <>
      {data &&
        data.map((user, index) => (
          <tr key={user.id}>
            <th>{user.ltd_name}</th>
            <th>{user.direktor}</th>
            <th>{user.tel}</th>
            <td>{user.bank_nomi}</td>
            <td>{user.mfo}</td>
            <td>{user.stir}</td>
          </tr>
        ))}
    </>
  );
}

export default UsersList;
