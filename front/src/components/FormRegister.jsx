import { useRef, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import useReservationStore from "../store/store";
import { motion } from "framer-motion";

const FormRegister = () => {
  const { registerUser } = useReservationStore();
  const emailInputRef = useRef(null);
  const formRef = useRef(null);
  const handleSubmit = async (values, { resetForm }) => {
    await registerUser(values);
    resetForm();
  };

  useEffect(() => {
    emailInputRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

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
            .required("El apellido es obligatorio")
            .min(4, "Debe tener al menos 8 caracteres"),
          phone: Yup.string()
            .required("El teléfono es requerido")
            .matches(/^\d{9,}$/, "Debe tener al menos 9 dígitos")
            .typeError("Debe ser un número válido"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit} useRef={formRef}>
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="text"
                name="name"
                placeholder="Nombre"
                innerRef={emailInputRef}
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
              <motion.button
                type="submit"
                className="w-full bg-green-700 rounded-xl py-2 shadow-2xl hover:bg-green-600 transition-all text-white"
                disabled={isSubmitting}
                whileTap={{ scale: 0.85 }}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRegister;
