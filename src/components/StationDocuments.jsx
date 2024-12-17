import React from "react";
import { useStationDocuments } from "../hooks/useStationDocuments";
import { useParams, Link } from "react-router-dom";

function StationDocuments() {
  const { id } = useParams(); // Получаем ID станции из URL
  const { documents, error } = useStationDocuments(id);

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  if (!documents || documents.length === 0) {
    return <div>Документы для этой станции не найдены</div>;
  }

  return (
    <div className="mx-5 my-10">
      <h1 className="text-3xl font-bold text-center mb-5">Документы станции</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Тип документа</th>
            <th className="border border-gray-300 px-2 py-1">Номер</th>
            <th className="border border-gray-300 px-2 py-1">Дата выдачи</th>
            <th className="border border-gray-300 px-2 py-1">Срок окончания</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="border border-gray-300 px-2 py-1">
                {doc.type === "licence"
                  ? "Лицензия"
                  : doc.type === "Ik_certificate"
                  ? "Сертификат измерительного комплекса"
                  : doc.type === "nam_certificate"
                  ? "Сертификат влагомера"
                  : "Сертификат природного газа"}
              </td>
              <td className="border border-gray-300 px-2 py-1">{doc.number}</td>
              <td className="border border-gray-300 px-2 py-1">{doc.Active}</td>
              <td className="border border-gray-300 px-2 py-1">
                {doc.expired}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex justify-center">
        <Link to="/stations">
          <button className="btn btn-primary">Назад к станциям</button>
        </Link>
      </div>
    </div>
  );
}

export default StationDocuments;
