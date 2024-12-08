import Logo from "../components/Logo";
import { Formik, Field, ErrorMessage } from "formik";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const Contact = () => {
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

  return (
    <div className="min-h-96">
      <Formik
        initialValues={{
          name: "",
          email: "",
          cuestion: "",
          message: "",
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={sendEmail}
      >
        {({ isSubmitting, handleSubmit }) => (
          <div className="bg-white w-[30rem] md:w-[40rem] min-h-80 mt-20 mx-auto shadow-lg rounded-lg">
            <h1 className="cursor-default text-3xl text-center pt-8 font-pacifico underline underline-offset-8">
              Contáctenos
            </h1>
            <form onSubmit={handleSubmit} className="py-5">
              <div className="flex flex-col mx-10">
                <label htmlFor="name">Nombre: *</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-50 bg-slate-100 mb-5 mt-3 p-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="email">Email: *</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-50 bg-slate-100 mb-5 mt-3 p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="cuestion">Asunto: *</label>
                <Field
                  type="text"
                  id="cuestion"
                  name="cuestion"
                  className="w-50 bg-slate-100 mb-5 mt-3 p-2"
                />
                <ErrorMessage
                  name="cuestion"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex flex-col mx-10">
                <label htmlFor="message">Mensaje: *</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="resize-y w-[100%] bg-slate-100 mb-5 mt-3 p-2"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex mx-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-700 hover:bg-green-900 text-white font-extrabold text-xl py-4 px-4 text-center rounded-md transition-all "
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
                <Toaster richColors />
              </div>
            </form>
          </div>
        )}
      </Formik>

      <div className="bg-white py-4  w-[30rem] md:w-[40rem] min-h-32 mx-auto mb-20 mt-4 rounded-lg divide-y md:divide-y-0 md:divide-x divide-gray-400 shadow-lg gap-4 grid grid-cols-1 md:grid-cols-2 text-center items-center">
        <div className="flex justify-center pr-2">
          <Logo color="black" />
        </div>
        <div className="pt-5 md:p-0 ">
          <h2 className="font-bold text-2xl">GuaToCa, S.L.</h2>
          <p className="font-thin">Calle de la Paz, 12</p>
          <p className="font-thin">46711 Miramar Valencia, España</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
