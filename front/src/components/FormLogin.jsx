import { useRef, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import useReservationStore from "../store/store";
import { motion } from "framer-motion";

const FormLogin = () => {
  const { loginUser } = useReservationStore();
  const emailInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    emailInputRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollBy(0, 200);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    await loginUser(values);
    resetForm();
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
          <Form onSubmit={handleSubmit} useRef={formRef}>
            <div className="flex flex-col mx-10 py-5">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                innerRef={emailInputRef}
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
              <motion.button
                type="submit"
                className="w-full bg-green-700 rounded-xl py-2 shadow-2xl hover:bg-green-600 transition-all text-white "
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

export default FormLogin;
