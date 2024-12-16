import React from "react";

import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import LicenceList from "./LicenceList";

function Licence() {
  return (
    <div className="flex flex-col gap-5 mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/licencenew">Янги лицензия қўшиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Лицензиялар рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead></thead>
            <tbody>
              <LicenceList />
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <Link
          to="/docs"
          className="flex justify-center items-center w-48 btn btn-primary"
        >
          Орқага
        </Link>
      </div>
    </div>
  );
}

export default Licence;
