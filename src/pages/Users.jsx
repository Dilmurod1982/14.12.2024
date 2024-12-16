import React from "react";
import UsersList from "../components/UsersList";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Users() {
  return (
    <div className="mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/newuser">Янги фойдаланувчи яратиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Фойдаланувчилар рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Исми-шарифи</th>
                <th>Электрон почтаси</th>
                <th>Роли</th>
                <th>Телефони</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <UsersList />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
