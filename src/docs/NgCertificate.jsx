import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import NgCertificateList from "./NgCertificateList";

function NgCertificate() {
  return (
    <div className="flex flex-col gap-5 mx-5">
      <div className="mr-0">
        <Button>
          <Link to="/ngcertificatenew">Янги Табиий газ сертификатини қўшиш</Link>
        </Button>
      </div>
      <div>
        <h1 className="flex justify-center text-3xl font-bold my-5">
          Табиий газ сертификатлари рўйхати
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead></thead>
            <tbody>
              <NgCertificateList />
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

export default NgCertificate;

