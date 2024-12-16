import React from "react";
import UsersList from "../components/UsersList";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import StationsList from "../components/StationsList";

function Users() {
  return (
    <div className="mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/newstation">Янги шахобча қўшиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Шахобчалар рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Тартиб рақами</th>
                <th>Шахобча номи</th>
                <th>МЧЖ номи</th>
                <th>Шахобча рақами</th>
                <th>Директори ёки бошқарувчи</th>
                <th>Алоқа</th>
                <th>Механик телефони</th>
                <th>Механик хонаси телефони</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <StationsList />
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
