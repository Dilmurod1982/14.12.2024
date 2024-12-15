import React from "react";
import { LtdsList } from "../components";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Users() {
  return (
    <div className="mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/newuser">Янги МЧЖ яратиш</Link>
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
                <th>Т/р</th>
                <th>Номи</th>
                <th>Шахобча №</th>
                <th>Мўлжал</th>
                <th>Вилоят</th>
                <th>Газ корхонаси</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <LtdsList />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
