import { useState, useEffect } from "react";
import { useAppStore } from "../components/zustand";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { ClipLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function LicenceNew() {
  const user = useAppStore((state) => state.user);

  const [formState, setFormState] = useState({
    id_station: "", // Для хранения ID выбранной станции
    active: "",
    expired: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stationOptions, setStationOptions] = useState([]); // Список станций из Firestore

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stations"));
        const stations = querySnapshot.docs.map((doc) => ({
          id: doc.id, // ID документа станции
          moljal: doc.data().moljal,
          ltd: doc.data().ltd,
          station_number: doc.data().station_number,
        }));

        setStationOptions(stations); // Устанавливаем список станций
      } catch (error) {
        toast.error("Ошибка загрузки списка станций");
      }
    };

    fetchStations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newLicence = {
      ...formState,
      createdAt: serverTimestamp(),
      uid: user.uid, // ID текущего пользователя
    };

    try {
      await addDoc(collection(db, "licence"), newLicence);
      toast.success("Янги лицензия мувафақиятли яратилди!");

      setFormState({
        id_station: "",
        active: "",
        expired: "",
      });
    } catch (error) {
      toast.error("Хатолик: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? (
        <div className="flex justify-center  h-screen w-full">
          <ClipLoader
            color="#3d6a98"
            loading
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 min-h-screen w-full">
          <div className="bg-[url('https://picsum.photos/1000/1300')] bg-cover bg-no-repeat bg-center lg:bg-none grid place-items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-[900px] bg-base-100 shadow-xl px-8 py-12"
            >
              <h1 className="text-3xl font-semibold text-center">
                Янги лицензия қўшиш
              </h1>
              <div className="flex gap-5 items-center justify-center">
                {/* Выпадающий список для выбора станции */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Шахобча</span>
                  </label>
                  <select
                    name="id_station"
                    value={formState.id_station}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Шахобчани танланг
                    </option>
                    {stationOptions.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.ltd} АГТКШ №{station.station_number} -{" "}
                        {station.moljal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Остальные поля */}
              <div className="flex justify-center items-center gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Дата выдачи лицензии</span>
                  </label>
                  <input
                    name="active"
                    type="date"
                    value={formState.active}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Срок истечения лицензии</span>
                  </label>
                  <input
                    name="expired"
                    type="date"
                    value={formState.expired}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  variant="myv"
                  disabled={isSubmitting}
                >
                  Яратиш
                </Button>
              </div>
            </form>
            <Link to="/licence">Орқага</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default LicenceNew;
