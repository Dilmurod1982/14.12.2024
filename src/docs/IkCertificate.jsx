import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import IkCertificateList from "./IkCertificateList";

function IkCertificate() {
  return (
    <div className="flex flex-col gap-5 mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/ikcertificatenew">Янги ИК сертификатини қўшиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Ўлчов комплекси сертификатлари рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead></thead>
            <tbody>
              <IkCertificateList />
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

export default IkCertificate;
