import React from "react";

import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import LicenceList from "./LicenceList";

function Licence() {
  return (
    <div className="mx-5">
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
    </div>
  );
}

export default Licence;
