import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function HomeUser() {
  return (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-5xl font-bold my-5">Фойдаланувчи панели</h1>
      <ul className=" flex flex-col gap-3 w-[500px] justify-center items-center">
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/userstations">Метан шахобчалар рўйхати</Link>
          </Button>
        </li>
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/attentiondocs">
              Амал қилиш муддати тугаётган хужжатлар
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default HomeUser;
