import React from "react";
import UsersList from "../components/UsersList";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import UserStationsList from "../components/UserStationsList";

function UserStations() {
  return (
    <div className="mx-5">
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Фойдаланувчининг шахобчалар рўйхатB
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Т/р</th>
                <th>Шахобча номи</th>
                <th>МЧЖ номи</th>
                <th>Рахбар тел</th>
                <th>Механик телефони</th>
                <th>Механик хонаси телефони</th>
                <th>Муддат 15 кун қолди</th>
                <th>Муддат 5 кун қолди</th>
                <th>Муддат ўтиб кетди</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <UserStationsList />
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link to="/homeuser" className="btn btn-primary w-48">
          Орқага
        </Link>
      </div>
    </div>
  );
}

export default UserStations;
