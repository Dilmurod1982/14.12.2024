import React from "react";
import { LtdsList } from "../components";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Users() {
  return (
    <div className="mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/newltd">Янги МЧЖ яратиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          МЧЖлар рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Номи</th>
                <th>Директор</th>
                <th>Телефони</th>
                <th>Банк номи</th>
                <th>МФО</th>
                <th>СТИР</th>
              </tr>
            </thead>
            <tbody>
              <LtdsList />
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link to="/" className="btn btn-primary w-48">
          Орқага
        </Link>
      </div>
    </div>
  );
}

export default Users;
