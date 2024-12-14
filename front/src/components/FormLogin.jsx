import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const FormLogin = () => {
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    // TODO AQUI PONER ACCION PARA ENVIAR DATOS
    //resetForm();
  };
  return (
    <div className=" h-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Debe ser un correo válido")
            .required("El correo es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(6, "Debe tener al menos 6 caracteres"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="text-center rounded-3xl py-2 shadow-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-center"
              />
            </div>
            <div className=" flex flex-col mx-10 py-5">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="text-center rounded-3xl py-2 shadow-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-center"
              />
            </div>
            <div className="flex flex-col mx-10 py-5">
              <button
                type="submit"
                className="w-full bg-green-700 rounded-xl py-2 shadow-2xl hover:bg-green-600 transition-all text-white "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
            <div className="text-center">
              <p>
                Has olvidado la contraseña?
                <span className="pl-2 underline cursor-pointer opacity-60 hover:font-bold">
                  Pulsa aquí
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
