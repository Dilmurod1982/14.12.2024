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
          <Link to="/ngcertificate" className="btn btn-primary w-full text-2xl">
            Табиий газ сертификати
          </Link>
        </li>
        <li className="flex flex-col justify-center items-center w-full ">
          <Link
            to="/namlikcertificate"
            className="btn btn-primary w-full text-2xl"
          >
            Намлик ўлчаш воситаси сертификати
          </Link>
        </li>
        <li className="flex flex-col justify-center items-center w-full ">
          <Link to="/ikcertificate" className="btn btn-primary w-full text-2xl">
            Ўлчов комплекси сертификати
          </Link>
        </li>
      </ul>
      <div className="flex justify-center items-center mt-10">
        <Link to="/" className="btn btn-secondary w-48">
          Орқага
        </Link>
      </div>
    </div>
  );
}

export default Docs;
