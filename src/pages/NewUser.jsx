import { Form, Link, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { FormInput } from "../components";
import { Button } from "../components/ui/button";
import { useRegisterNewUser } from "../hooks/useRegisterNewUser";
import { ClipLoader } from "react-spinners";
import { signOut } from "firebase/auth";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let email = formData.get("email");

  let password = formData.get("password");
  let rol = formData.get("rol");
  let tel = formData.get("tel");

  return { displayName, email, password, rol, tel };
};

function NewUser() {
  const { isPending, registerEmailAndPassword } = useRegisterNewUser();
  const userData = useActionData();

  useEffect(() => {
    if (userData) {
      registerEmailAndPassword(
        userData.displayName,
        userData.email,

        userData.password,
        userData.rol,
        userData.tel
      );
    }
  }, [userData]);

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-screen w-full ">
          <ClipLoader
            color="#3d6a98"
            loading
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1  min-h-screen w-full ">
          <div className="bg-[url('https://picsum.photos/1000/1300')] bg-cover bg-no-repeat bg-center lg:bg-none grid place-items-center">
            <Form
              method="post"
              className="flex flex-col gap-5 w-96 bg-base-100 shadow-xl px-8 py-12"
            >
              <h1 className="text-3xl font-semibold text-center">
                Регистрация нового пользователя
              </h1>
              <FormInput name="displayName" type="text" label="name" />
              <FormInput name="email" type="email" label="email" />

              <FormInput name="password" type="password" label="password" />
              <div className="flex flex-col gap-2">
                <label htmlFor="rol" className="text-sm font-semibold">
                  Role
                </label>
                <select
                  name="rol"
                  id="rol"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <FormInput name="tel" type="tel" label="Telefon" maxlength="12" />
              <div className="w-full">
                <Button type="submit" className="w-full" variant="myv">
                  Регистрация
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewUser;
