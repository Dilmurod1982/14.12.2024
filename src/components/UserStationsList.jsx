import React from "react";
import { useCollectionUser } from "../hooks/useCollectionUser";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "./zustand/index";

function UserStationsList() {
  const user = useAppStore((state) => state.user); // Текущий пользователь
  const { data, error } = useCollectionUser("stations", {
    field: "operators",
    value: user.email,
  });

  const navigate = useNavigate(); // Навигация для перехода

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Станции не найдены</div>;
  }

  return (
    <>
      {data.map((station, index) => (
        <tr key={station.id}>
          <td>{index + 1}</td>
          <td>{station.moljal}</td>
          <td>
            {station.ltd} АГТКШ-{station.station_number}
          </td>
          <td>{station.aloqa_tel}</td>
          <td>{station.b_mexanik_tel}</td>
          <td>{station.mexanik_tel}</td>
          <td>
            <Link to={`/userstationsdetails/details/${station.id}`}>Doc</Link>
            {/* <Button
              onClick={() =>
                navigate(`/userstationsdetails/details/${station.id}`)
              }
            >
              Документы
            </Button> */}
          </td>
          <td>
            <Button onClick={() => navigate(`/stations/edit/${station.id}`)}>
              Подробно
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default UserStationsList;
