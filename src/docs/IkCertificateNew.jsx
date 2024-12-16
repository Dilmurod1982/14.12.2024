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

function IkCertificateNew() {
  const user = useAppStore((state) => state.user);

  const [formState, setFormState] = useState({
    id_station: "", // Для хранения ID выбранной станции
    number: "",
    active: "",
    expired: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stationOptions, setStationOptions] = useState([]); // Список станций из Firestore
  const [selectedStation, setSelectedStation] = useState(null); // Данные выбранной станции

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stations"));
        const stations = querySnapshot.docs.map((doc) => ({
          id: doc.id, // ID документа станции
          tr: doc.data().tr,
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

    // Установка данных выбранной станции при выборе id_station
    if (name === "id_station") {
      const station = stationOptions.find((option) => option.id === value);
      setSelectedStation(station || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Проверяем, выбрана ли станция
    if (!selectedStation) {
      toast.error("Пожалуйста, выберите станцию.");
      setIsSubmitting(false);
      return;
    }

    const newIkCertificate = {
      ...formState,
      tr: selectedStation.tr, // Добавляем поле tr из выбранной станции
      createdAt: serverTimestamp(),
      uid: user.uid, // ID текущего пользователя
    };

    try {
      await addDoc(collection(db, "ik_certificate"), newIkCertificate);
      toast.success("Янги ИК мувафақиятли яратилди!");

      setFormState({
        id_station: "",
        number: "",
        active: "",
        expired: "",
      });
      setSelectedStation(null);
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
                Янги ўлчов комплекси ("ИК") қўшиш
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
                    <span className="label-text">ИК сертификати рақами</span>
                  </label>
                  <input
                    name="number"
                    type="text"
                    value={formState.number}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Сертификат берилган сана</span>
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
                    <span className="label-text">Сертификат тугаш санаси</span>
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
            <Link to="/ikcertificate">Орқага</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default IkCertificateNew;
