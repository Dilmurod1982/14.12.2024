import React from "react";
import { useCollection } from "../hooks/customFetch";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function StationsList() {
  const { data } = useCollection("stations");

  return (
    <>
      {data &&
        data.map((user, index) => (
          <tr key={user.id}>
            <th>{user.tr}</th>
            <td>{user.moljal}</td>
            <td>{user.ltd}</td>
            <td>{user.station_number}</td>
            <td>{user.boshqaruvchi}</td>
            <td>{user.aloqa_tel}</td>
            <td>{user.b_mexanik_tel}</td>
            <td>{user.mexanik_tel}</td>

            <td>
              <Link to={`/stations/edit/${user.id}`}>
                <Button>Подробно</Button>
              </Link>
            </td>
          </tr>
        ))}
    </>
  );
}

export default StationsList;
