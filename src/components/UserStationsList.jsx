import React from "react";
import { useCollectionUser } from "../hooks/useCollectionUser";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAppStore } from "./zustand/index";

function UserStationsList() {
  const user = useAppStore((state) => state.user); // Получаем текущего пользователя
  const { data, error } = useCollectionUser("stations", {
    field: "operators", // Проверяем массив operators
    value: user.email, // Сравниваем с email текущего пользователя
  });

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
          <td className="w-[10px]">{station.tr}</td>
          <td>{station.moljal}</td>
          <td>
            {station.ltd} АГТКШ-{station.station_number}
          </td>
          <td>{station.aloqa_tel}</td>
          <td>{station.b_mexanik_tel}</td>
          <td>{station.mexanik_tel}</td>
          <td>{station.mexanik_tel}</td>
          <td>{station.mexanik_tel}</td>
          <td>{station.mexanik_tel}</td>
          <td>
            <Link to="/userstationdocs/edit/:id">
              <Button>Документы</Button>
            </Link>
          </td>
          <td>
            <Link to={`/stations/details/${station.id}`}>
              <Button>Подробно</Button>
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}

export default UserStationsList;
