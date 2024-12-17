import React from "react";

function DocumentsModal({ stationName, documents, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">{stationName}: Документы</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Название</th>
              <th className="border border-gray-300 px-2 py-1">Номер</th>
              <th className="border border-gray-300 px-2 py-1">Дата выдачи</th>
              <th className="border border-gray-300 px-2 py-1">
                Срок окончания
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="border border-gray-300 px-2 py-1">
                  {doc.type === "licence"
                    ? "Лицензия"
                    : doc.type === "ik_certificate"
                    ? "Сертификат измерительного комплекса"
                    : doc.type === "nam_certificate"
                    ? "Сертификат влагомера"
                    : "Сертификат природного газа"}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {doc.number}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {doc.active}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {doc.expired}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} className="btn btn-primary mt-4 w-full">
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default DocumentsModal;
