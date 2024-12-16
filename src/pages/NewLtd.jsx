import { useState } from "react";
import { useAppStore } from "../components/zustand";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { ClipLoader } from "react-spinners";
import { FormInputLtd } from "../components";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

function NewLtd() {
  const user = useAppStore((state) => state.user);

  const [formState, setFormState] = useState({
    ltd_name: "",
    bank_nomi: "",
    mfo: "",
    stir: "",
    direktor: "",
    tel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем отправку формы через браузер
    setIsSubmitting(true);

    const newAgnks = {
      ...formState,
      createdAt: serverTimestamp(),
      uid: user.uid,
    };

    try {
      await addDoc(collection(db, "ltd"), newAgnks);
      toast.success("Янги АГТКШ базага мувафақиятли қўшилди!");
      // Очистка формы после успешного добавления
      setFormState({
        ltd_name: "",
        bank_nomi: "",
        mfo: "",
        stir: "",
        direktor: "",
        tel: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? (
        <div className="flex justify-center items-center h-screen w-full">
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
              className="flex flex-col gap-5 w-96 bg-base-100 shadow-xl px-8 py-12"
            >
              <h1 className="text-3xl font-semibold text-center">
                Новый объект
              </h1>

              <FormInputLtd
                name="ltd_name"
                type="text"
                label="МЧЖ номи"
                value={formState.ltd_name}
                onChange={handleChange}
              />
              <FormInputLtd
                name="bank_nomi"
                type="text"
                label="Банк номи"
                value={formState.bank_nomi}
                onChange={handleChange}
              />
              <FormInputLtd
                name="mfo"
                type="text"
                label="МФО"
                value={formState.mfo}
                onChange={handleChange}
              />
              <FormInputLtd
                name="stir"
                type="text"
                label="СТИР (ИНН)"
                value={formState.stir}
                onChange={handleChange}
              />
              <FormInputLtd
                name="direktor"
                type="text"
                label="Direktor"
                value={formState.direktor}
                onChange={handleChange}
              />
              <FormInputLtd
                name="tel"
                type="tel"
                label="tel"
                value={formState.tel}
                onChange={handleChange}
              />
              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  variant="myv"
                  disabled={isSubmitting}
                >
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewLtd;
