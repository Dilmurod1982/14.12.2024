import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function Home() {
  return (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-5xl font-bold my-5">Администратор</h1>
      <ul className=" flex flex-col gap-3 w-96 justify-center items-center">
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/users">Фойдаланувчилар рўйхати</Link>
          </Button>
        </li>
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/ltds">МЧЖ лар рўйхати</Link>
          </Button>
        </li>
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/stations">Шахобчалар рўйхати</Link>
          </Button>
        </li>
        <li className="w-full">
          <Button variant="myv" className="w-full text-2xl">
            <Link to="/docs">Хужжатлар турлари рўйхати</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Home;
