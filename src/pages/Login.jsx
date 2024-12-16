import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { Button } from "../components/ui/button";
import { useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";
import { ClipLoader } from "react-spinners";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();

  const { isPending, registerWithGoogle } = useRegister();
  const { isPending: isPendingLogin, signIn } = useLogin();

  useEffect(() => {
    if (userData) {
      signIn(userData.email, userData.password);
    }
  }, [userData]);

  return (
    <>
      {isPendingLogin ? (
        <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader
            color="#3d6a98"
            loading
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full ">
          <div className="hidden lg:block bg-[url('https://picsum.photos/1000/1300')] bg-cover bg-no-repeat bg-center"></div>
          <div className="bg-[url('https://picsum.photos/1000/1300')] bg-cover bg-no-repeat bg-center lg:bg-none grid place-items-center">
            <Form
              method="post"
              className="flex flex-col gap-5 w-96 bg-base-100 shadow-xl px-8 py-12"
            >
              <h1 className="text-3xl font-semibold text-center">Login</h1>
              <FormInput name="email" type="email" label="email" />
              <FormInput name="password" type="password" label="password" />
              <div className="w-full">
                <Button type="submit" className="w-full" variant="myv">
                  Login
                </Button>
              </div>
            </Form>
            <Link to="/regagnks">Register</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
