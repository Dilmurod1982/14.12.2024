import React from "react";
import { Licence } from "./";
import { Link } from "react-router-dom";

function Docs() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold">Хужжатлар рўйхати</h1>
      <ul className="flex flex-col justify-center items-center w-[800px] gap-5 ">
        <li className="flex flex-col justify-center items-center w-full ">
          <Link to="/licence" className="btn btn-primary w-full text-2xl">
            Лицензия
          </Link>
        </li>
        <li className="flex flex-col justify-center items-center w-full ">
          <Link to="/ikcertificate" className="btn btn-primary w-full text-2xl">
            Ўлчов комплекси сертификати
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Docs;
