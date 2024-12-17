import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAppStore } from "./zustand";
import dayjs from "dayjs"; // Библиотека для работы с датами

function StationDetails() {
  const { id } = useParams(); // Получение ID из URL
  const stationId = id;

  const [licenceData, setLicenceData] = useState([]);
  const [ik_certificateDate, setIk_certificateData] = useState([]);
  const [nam_certificateDate, setNam_certificateData] = useState([]);

  // Загрузка данных "licence"
  useEffect(() => {
    const q = query(collection(db, "licence"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLicenceData(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "ik_certificate"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIk_certificateData(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "nam_certificate"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNam_certificateData(data);
    });
    return () => unsubscribe();
  }, []);

  // Функция для вычисления оставшихся дней
  const calculateDaysLeft = (expiryDate) => {
    const today = dayjs(); // Текущая дата
    const expired = dayjs(expiryDate); // Дата истечения срока
    return expired.diff(today, "day"); // Разница в днях
  };

  // Функция для определения цвета строки
  const getRowColor = (daysLeft) => {
    if (daysLeft < 0) return "bg-red-500 text-white"; // Просрочено
    if (daysLeft <= 5) return "bg-yellow-500 text-black"; // Осталось 5 дней или меньше
    if (daysLeft <= 15) return "bg-orange-500 text-black"; // Осталось 15 дней или меньше
    if (daysLeft <= 30) return "bg-green-500 text-black"; // Осталось 30 дней или меньше
    return ""; // Без цвета
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">П/н</th>
            <th className="border border-gray-300 px-4 py-2">Тип документа</th>
            <th className="border border-gray-300 px-4 py-2">Номер лицензии</th>
            <th className="border border-gray-300 px-4 py-2">Дата активации</th>
            <th className="border border-gray-300 px-4 py-2">Дата истечения</th>
            <th className="border border-gray-300 px-4 py-2">Осталось дней</th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>

        {/* Лицензии */}
        <tbody>
          {licenceData
            .filter((lic) => lic.id_station === stationId)
            .slice(-1) // Берем только последнюю лицензию
            .map((lic, index) => {
              const daysLeft = calculateDaysLeft(lic.expired);
              const rowColor = getRowColor(daysLeft);

              return (
                <tr
                  key={lic.id}
                  className={`border border-gray-300 ${rowColor}`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">Лицензия</td>
                  <td className="px-4 py-2 text-center">{lic.number}</td>
                  <td className="px-4 py-2 text-center">{lic.active}</td>
                  <td className="px-4 py-2 text-center">{lic.expired}</td>
                  <td className="px-4 py-2 text-center">
                    {daysLeft < 0
                      ? `Просрочено на ${Math.abs(daysLeft)} дня`
                      : `${daysLeft} дней`}
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary flex justify-center"
                      to="/licencenew"
                    >
                      Новый
                    </Link>
                  </td>
                </tr>
              );
            })}
          {licenceData.filter((lic) => lic.id_station === stationId).length ===
            0 && (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-2 text-center text-gray-500 italic"
              >
                Нет данных по лицензии.{" "}
                <Link to="/licencenew" className="btn btn-link">
                  Добавить лицензию
                </Link>
              </td>
            </tr>
          )}
        </tbody>

        {/* ИК сертификаты */}
        <tbody>
          {ik_certificateDate
            .filter((ik) => ik.id_station === stationId)
            .map((ik, index) => {
              const daysLeft = calculateDaysLeft(ik.expired);
              const rowColor = getRowColor(daysLeft);

              return (
                <tr
                  key={ik.id}
                  className={`border border-gray-300 ${rowColor}`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">ИК сертификат</td>
                  <td className="px-4 py-2 text-center">{ik.number}</td>
                  <td className="px-4 py-2 text-center">{ik.active}</td>
                  <td className="px-4 py-2 text-center">{ik.expired}</td>
                  <td className="px-4 py-2 text-center">
                    {daysLeft < 0
                      ? `Просрочено на ${Math.abs(daysLeft)} дня`
                      : `${daysLeft} дней`}
                  </td>
                </tr>
              );
            })}
          {ik_certificateDate.filter((ik) => ik.id_station === stationId)
            .length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-2 text-center text-gray-500 italic"
              >
                Нет данных по ИК сертификату
              </td>
            </tr>
          )}
        </tbody>

        {/* NAM сертификаты */}
        <tbody>
          {nam_certificateDate
            .filter((nam) => nam.id_station === stationId)
            .map((nam, index) => {
              const daysLeft = calculateDaysLeft(nam.expired);
              const rowColor = getRowColor(daysLeft);

              return (
                <tr
                  key={nam.id}
                  className={`border border-gray-300 ${rowColor}`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">Влагомер</td>
                  <td className="px-4 py-2 text-center">{nam.number}</td>
                  <td className="px-4 py-2 text-center">{nam.active}</td>
                  <td className="px-4 py-2 text-center">{nam.expired}</td>
                  <td className="px-4 py-2 text-center">
                    {daysLeft < 0
                      ? `Просрочено на ${Math.abs(daysLeft)} дня`
                      : `${daysLeft} дней`}
                  </td>
                </tr>
              );
            })}
          {nam_certificateDate.filter((nam) => nam.id_station === stationId)
            .length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-2 text-center text-gray-500 italic"
              >
                Нет данных по влагомеру
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StationDetails;
