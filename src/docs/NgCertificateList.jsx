import React, { useMemo } from "react";
import { useCollection } from "../hooks/customFetch";
import { differenceInDays } from "date-fns";

function NgCertificateList() {
  const { data: ng_certificates } = useCollection("ng_certificate");
  const { data: stations } = useCollection("stations");

  // Объединяем данные из коллекций licence и station
  const mergedData = useMemo(() => {
    if (!ng_certificates || !stations) return [];

    // Группируем лицензии по id_station
    const groupedLicences = ng_certificates.reduce((acc, ng_certificate) => {
      const { id_station, expired } = ng_certificate;
      if (!acc[id_station]) {
        acc[id_station] = ng_certificate;
      } else {
        const currentMaxDate = new Date(acc[id_station].expired);
        const newDate = new Date(expired);
        if (newDate > currentMaxDate) {
          acc[id_station] = ng_certificate;
        }
      }
      return acc;
    }, {});

    // Создаем массив с объединенными данными
    return Object.values(groupedLicences)
      .map((ng_certificate) => {
        const station = stations.find(
          (ik) => ik.id === ng_certificate.id_station
        );
        if (!station) return null;

        // Рассчитываем количество дней до истечения или просрочки лицензии
        const today = new Date();
        const expiredDate = new Date(ng_certificate.expired);
        const daysLeft = differenceInDays(expiredDate, today);

        return {
          id: ng_certificate.id,
          moljal: station.moljal, // Название объекта
          ltd: station.ltd, // Название LTD
          station_number: station.station_number, // Номер станции
          active: ng_certificate.active, // Дата выдачи лицензии
          expired: ng_certificate.expired, // Дата окончания лицензии
          number: ng_certificate.number, // Дата окончания лицензии
          daysLeft,
        };
      })
      .filter(Boolean); // Убираем записи, у которых нет совпадений в station
  }, [ng_certificates, stations]);

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
            Сертификат рақами
          </th>
          <th className="border border-gray-300 px-4 py-2">
            Сертификат берилган сана
          </th>
          <th className="border border-gray-300 px-4 py-2">Тугаш санаси</th>
          <th className="border border-gray-300 px-4 py-2">Холати</th>
        </tr>
      </thead>
      <tbody>
        {mergedData.slice(0, 5).map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2">{item.moljal}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.ltd} АГТКШ №{item.station_number}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.number}</td>
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

export default NgCertificateList;