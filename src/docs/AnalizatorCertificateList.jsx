import React, { useMemo } from "react";
import { useCollection } from "../hooks/customFetch";
import { differenceInDays } from "date-fns";

function AnalizatorCertificateList() {
  const { data: analiz_certificates } = useCollection("analiz_certificate");
  const { data: stations } = useCollection("stations");

  // Объединяем данные из коллекций licence и station
  const mergedData = useMemo(() => {
    if (!analiz_certificates || !stations) return [];

    // Группируем лицензии по id_station
    const groupedLicences = analiz_certificates.reduce(
      (acc, analiz_certificate) => {
        const { id_station, expired } = analiz_certificate;
        if (!acc[id_station]) {
          acc[id_station] = analiz_certificate;
        } else {
          const currentMaxDate = new Date(acc[id_station].expired);
          const newDate = new Date(expired);
          if (newDate > currentMaxDate) {
            acc[id_station] = analiz_certificate;
          }
        }
        return acc;
      },
      {}
    );

    // Создаем массив с объединенными данными
    return Object.values(groupedLicences)
      .map((analiz_certificate) => {
        const station = stations.find(
          (ik) => ik.id === analiz_certificate.id_station
        );
        if (!station) return null;

        // Рассчитываем количество дней до истечения или просрочки лицензии
        const today = new Date();
        const expiredDate = new Date(analiz_certificate.expired);
        const daysLeft = differenceInDays(expiredDate, today);

        return {
          id: analiz_certificate.id,
          moljal: station.moljal, // Название объекта
          ltd: station.ltd, // Название LTD
          station_number: station.station_number, // Номер станции
          active: analiz_certificate.active, // Дата выдачи лицензии
          expired: analiz_certificate.expired, // Дата окончания лицензии
          number: analiz_certificate.number, // Дата окончания лицензии
          daysLeft,
        };
      })
      .filter(Boolean); // Убираем записи, у которых нет совпадений в station
  }, [analiz_certificates, stations]);

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

export default AnalizatorCertificateList;
