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

function NewStation() {
  const user = useAppStore((state) => state.user);

  const [formState, setFormState] = useState({
    ltd: "", // Поле для выбора из списка LTD
    station_number: "",
    operator: "",
    moljal: "",
    viloyat: "",
    tuman: "",
    kocha: "",
    uy: "",
    gaz_taminot: "",
    boshqaruvchi: "",
    tr: "",
    aloqa_tel: "",
    bosh_mexanik: "",
    b_mexanik_tel: "",
    mexanik_tel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ltdOptions, setLtdOptions] = useState([]); // Данные для выпадающего списка
  const [userOptions, setUserOptions] = useState([]); // Данные для выпадающего списка

  // Загрузка списка LTD из Firestore
  useEffect(() => {
    const fetchLtds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ltd"));
        const ltds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().ltd_name, // Поле, содержащее название LTD
        }));

        setLtdOptions(ltds);
      } catch (error) {
        toast.error("Ошибка загрузки списка LTD");
      }
    };

    fetchLtds();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, // Имя пользователя
          email: doc.data().email, // Email пользователя
        }));

        setUserOptions(users);
      } catch (error) {
        toast.error("Ошибка загрузки списка Операторов");
      }
    };

    fetchUsers();
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

    const newStation = {
      ...formState,
      createdAt: serverTimestamp(),
      uid: user.uid,
    };

    try {
      await addDoc(collection(db, "stations"), newStation); // Добавляем новую станцию в базу
      toast.success("Янги шахобча мувафақиятли яратилди!");
      // Сбрасываем форму
      setFormState({
        ltd: "",
        station_number: "",
        operator: "",
        moljal: "",
        viloyat: "",
        tuman: "",
        kocha: "",
        uy: "",
        gaz_taminot: "",
        boshqaruvchi: "",
        tr: "",
        aloqa_tel: "",
        bosh_mexanik: "",
        b_mexanik_tel: "",
        mexanik_tel: "",
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
                Янги шахобча яратиш
              </h1>
              <div className=" flex gap-5 items-center justify-center">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Шахобча номи</span>
                  </label>
                  <input
                    name="moljal"
                    type="text"
                    value={formState.moljal}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Выпадающий список для выбора LTD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">МЧЖ</span>
                  </label>
                  <select
                    name="ltd"
                    value={formState.ltd}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      МЧЖни танланг
                    </option>
                    {ltdOptions.map((ltd) => (
                      <option key={ltd.id} value={ltd.name}>
                        {ltd.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">МЧЖнинг шахобча рақами</span>
                  </label>
                  <input
                    name="station_number"
                    type="number"
                    value={formState.station_number}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Фойдаланувчи</span>
                </label>
                <select
                  name="operator"
                  value={formState.operator}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Фойдаланувчини танланг
                  </option>
                  {userOptions.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Остальные поля */}
              <div className="flex justify-center items-center gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Вилоят номи</span>
                  </label>
                  <input
                    name="viloyat"
                    type="text"
                    value={formState.viloyat}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Туман/шахар номи</span>
                  </label>
                  <input
                    name="tuman"
                    type="text"
                    value={formState.tuman}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Кўча номи</span>
                  </label>
                  <input
                    name="kocha"
                    type="text"
                    value={formState.kocha}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Уй рақами</span>
                  </label>
                  <input
                    name="uy"
                    type="text"
                    value={formState.uy}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Газ таъминоти корхонаси</span>
                  </label>
                  <input
                    name="gaz_taminot"
                    type="text"
                    value={formState.gaz_taminot}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Директор ёки бошқарувчи</span>
                  </label>
                  <input
                    name="boshqaruvchi"
                    type="text"
                    value={formState.boshqaruvchi}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Тартиб рақами</span>
                  </label>
                  <input
                    name="tr"
                    type="number"
                    value={formState.tr}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Алоқа телефони</span>
                  </label>
                  <input
                    name="aloqa_tel"
                    type="tel"
                    value={formState.aloqa_tel}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Бош механик Ф.И.Ш.</span>
                  </label>
                  <input
                    name="bosh_mexanik"
                    type="text"
                    value={formState.bosh_mexanik}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Бош механик тел</span>
                  </label>
                  <input
                    name="b_mexanik_tel"
                    type="tel"
                    value={formState.b_mexanik_tel}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Механик хонаси тел</span>
                  </label>
                  <input
                    name="mexanik_tel"
                    type="tel"
                    value={formState.mexanik_tel}
                    onChange={handleChange}
                    className="input input-bordered w-full"
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
          </div>
        </div>
      )}
    </>
  );
}

export default NewStation;
