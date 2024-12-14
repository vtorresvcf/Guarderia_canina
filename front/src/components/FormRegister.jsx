import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const FormRegister = () => {
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    // TODO AQUI PONER ACCION PARA ENVIAR DATOS Y PROBAR CON EL BACK CON AXIOS PARA EL REGISTRO
    //resetForm();
  };
  return (
    <div className=" h-full">
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Debe ser un correo válido")
            .required("El correo es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(8, "Debe tener al menos 8 caracteres")
            .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula"),
          name: Yup.string()
            .required("El nombre es obligatorio")
            .min(4, "Debe tener al menos 4 caracteres"),
          username: Yup.string()
            .required("El nombre es obligatorio")
            .min(8, "Debe tener al menos 8 caracteres"),
          phone: Yup.number()
            .required("El teléfono es requerido")
            .min(9, "Debe tener al menos 9 caracteres")
            .typeError("Debe ser un número válido"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="text"
                name="name"
                placeholder="Nombre"
                className="text-center rounded-3xl py-2 shadow-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-center"
              />
            </div>
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="text"
                name="username"
                placeholder="Apellidos"
                className="text-center rounded-3xl py-2 shadow-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600 text-center"
              />
            </div>
            <div className="flex flex-col mx-10 py-5">
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
            <div className=" flex flex-col mx-10 py-5">
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
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="number"
                name="phone"
                placeholder="Teléfono"
                className="text-center rounded-3xl py-2 shadow-md"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-600 text-center"
              />
            </div>
            <div className="flex flex-col mx-10 py-5">
              <button
                type="submit"
                className="w-full bg-green-700 rounded-xl py-2 shadow-2xl hover:bg-green-600 transition-all text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRegister;
