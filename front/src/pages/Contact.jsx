import { useRef, useEffect } from "react";
import Logo from "../components/Logo";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const initialValues = {
  name: "",
  email: "",
  cuestion: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Debe tener mínimo 2 caracteres.")
    .required("El nombre es obligatorio."),
  email: Yup.string()
    .email("Correo no válido.")
    .required("El correo es obligatorio."),
  cuestion: Yup.string()
    .min(5, "Debe tener mínimo 5 caracteres.")
    .max(20, "Debe tener máximo 20 caracteres.")
    .required("El asunto es obligatorio."),
  message: Yup.string()
    .min(1, "Debe escribir algo.")
    .max(300, "Has alcanzado el máximo permitido.")
    .required("El mensaje es obligatorio."),
});

const Contact = () => {
  const emailInputRef = useRef(null);
  const formRef = useRef(null);

  const sendEmail = async (values, { resetForm }) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_APP_API_ID_SERVICE_EMAIL_JS,
        "template_mb20irn",
        values,
        import.meta.env.VITE_APP_API_ID_PUBLIC_EMAIL_JS
      );
      toast.success("Correo enviado con éxito");
      resetForm();
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Hubo un problema al enviar el correo.");
    }
  };

  useEffect(() => {
    emailInputRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const fieldClass = "w-full bg-slate-100 mb-5 mt-3 p-2";

  return (
    <div className="min-h-[45rem] flex flex-col items-center shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={sendEmail}
      >
        {({ isSubmitting }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white w-[30rem] md:w-[40rem] mt-20 mx-auto shadow-lg rounded-lg p-8"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="cursor-default text-3xl text-center font-pacifico underline underline-offset-8 mb-8"
            >
              Contáctenos
            </motion.h1>
            <Form useRef={formRef}>
              <div className="flex flex-col mx-10">
                <label htmlFor="name">Nombre: *</label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Field
                    type="text"
                    id="name"
                    innerRef={emailInputRef}
                    name="name"
                    className={fieldClass}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col mx-10">
                <label htmlFor="email">Email: *</label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={fieldClass}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col mx-10">
                <label htmlFor="cuestion">Asunto: *</label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Field
                    type="text"
                    id="cuestion"
                    name="cuestion"
                    className={fieldClass}
                  />
                  <ErrorMessage
                    name="cuestion"
                    component="div"
                    className="text-red-600"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col mx-10">
                <label htmlFor="message">Mensaje: *</label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="resize-y w-full bg-slate-100 mb-5 mt-3 p-2"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-600"
                  />
                </motion.div>
              </div>

              <div className="flex mx-10">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.85 }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="w-full bg-green-700 hover:bg-green-900 text-white font-extrabold text-xl py-4 px-4 text-center rounded-md transition-all"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </motion.button>
                <Toaster richColors />
              </div>
            </Form>
          </motion.div>
        )}
      </Formik>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white py-4 w-[30rem] md:w-[40rem] mx-auto mb-20 mt-4 rounded-lg divide-y md:divide-y-0 md:divide-x divide-gray-400 shadow-lg gap-4 grid grid-cols-1 md:grid-cols-2 text-center items-center"
      >
        <div className="flex justify-center pr-2">
          <Logo color="black" />
        </div>
        <div className="pt-5 md:p-0">
          <h2 className="font-bold text-2xl">GuaToCa, S.L.</h2>
          <p className="font-thin">Calle de la Paz, 12</p>
          <p className="font-thin">46711 Miramar Valencia, España</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
