import React, { useMemo } from "react";
import { useCollection } from "../hooks/customFetch";
import { differenceInDays } from "date-fns";

function LicenceList() {
  const { data: licences } = useCollection("licence");
  const { data: stations } = useCollection("stations");

  // Объединяем данные из коллекций licence и station
  const mergedData = useMemo(() => {
    if (!licences || !stations) return [];

    // Группируем лицензии по id_station
    const groupedLicences = licences.reduce((acc, licence) => {
      const { id_station, expired } = licence;
      if (!acc[id_station]) {
        acc[id_station] = licence;
      } else {
        const currentMaxDate = new Date(acc[id_station].expired);
        const newDate = new Date(expired);
        if (newDate > currentMaxDate) {
          acc[id_station] = licence;
        }
      }
      return acc;
    }, {});

    // Создаем массив с объединенными данными
    return Object.values(groupedLicences)
      .map((licence) => {
        const station = stations.find((st) => st.id === licence.id_station);
        if (!station) return null;

        // Рассчитываем количество дней до истечения или просрочки лицензии
        const today = new Date();
        const expiredDate = new Date(licence.expired);
        const daysLeft = differenceInDays(expiredDate, today);

        return {
          id: licence.id,
          moljal: station.moljal, // Название объекта
          ltd: station.ltd, // Название LTD
          station_number: station.station_number, // Номер станции
          active: licence.active, // Дата выдачи лицензии
          expired: licence.expired, // Дата окончания лицензии
          daysLeft,
        };
      })
      .filter(Boolean); // Убираем записи, у которых нет совпадений в station
  }, [licences, stations]);

  // Функция для определения класса стиля на основе оставшихся дней
  const getStyleClass = (daysLeft) => {
    if (daysLeft > 15 && daysLeft <= 30) return "bg-green-400"; // Зеленый
    if (daysLeft > 5 && daysLeft <= 15) return "bg-orange-400"; // Оранжевый
    if (daysLeft > 0 && daysLeft <= 5) return "bg-yellow-400"; // Желтый
    if (daysLeft <= 0) return "bg-red-400"; // Красный
    return ""; // Без стиля
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Объект</th>
          <th className="border border-gray-300 px-4 py-2">МЧЖ</th>
          <th className="border border-gray-300 px-4 py-2">
            Лицензия берилган
          </th>
          <th className="border border-gray-300 px-4 py-2">Лицензия тугайди</th>
          <th className="border border-gray-300 px-4 py-2">Статус</th>
        </tr>
      </thead>
      <tbody>
        {mergedData.slice(0, 5).map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2">{item.moljal}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.ltd} АГТКШ №{item.station_number}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.active}</td>
            <td className="border border-gray-300 px-4 py-2">{item.expired}</td>
            <td
              className={`border border-gray-300 px-4 py-2 ${getStyleClass(
                item.daysLeft
              )}`}
            >
              {item.daysLeft >= 0
                ? `${item.daysLeft} кун қолди`
                : `${-item.daysLeft} кун ўтиб кетди`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LicenceList;
