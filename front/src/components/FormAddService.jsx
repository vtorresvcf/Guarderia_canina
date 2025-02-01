import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import useReservationStore from "../store/store";

const FormAddService = ({ setAddService }) => {
  const { addService } = useReservationStore();
  const handleSubmit = (values, { resetForm }) => {
    setTimeout(() => {
      addService(values);
      resetForm();
      setAddService(false);
    }, 1000);
  };
  return (
    <div className="bg-gray-200 rounded-xl py-5 w-72 shadow-xl border border-slate-300 text-center mb-16">
      <h1 className="font-bold mb-4 border">Añadir Servicio</h1>
      <div>
        <Formik
          initialValues={{
            name: "",
            description: "",
            capacity: "",
            prices: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("El nombre es obligatorio")
              .min(4, "Debe tener al menos 4 caracteres"),
            description: Yup.string()
              .required("La descripción es obligatoria")
              .min(8, "Debe tener al menos 8 caracteres"),
            capacity: Yup.number()
              .required("La capacidad es obligatoria")
              .min(1, "Debe tener al menos 1"),
            prices: Yup.number()
              .required("El precio es requerido")
              .test(
                "is-decimal",
                "El precio debe ser un número decimal válido",
                (value) => /^\d+(\.\d{1,2})?$/.test(value) // Verifica que tenga hasta 2 decimales
              ),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col mx-6  py-3">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre del servicio"
                  className="text-center rounded-3xl py-2 shadow-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-center"
                />
              </div>
              <div className="flex flex-col mx-6 py-3">
                <Field
                  type="text"
                  name="description"
                  placeholder="Descripción del servicio"
                  className="text-center rounded-3xl py-2 shadow-md"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-center"
                />
              </div>
              <div className="flex flex-col mx-6 py-3">
                <Field
                  type="number"
                  name="capacity"
                  placeholder="Capacidad"
                  className="text-center rounded-3xl py-2 shadow-md"
                />
                <ErrorMessage
                  name="capacity"
                  component="div"
                  className="text-red-600 text-center"
                />
              </div>
              <div className="flex flex-col mx-6 py-3">
                <Field
                  type="number"
                  step="0.01"
                  name="prices"
                  placeholder="Precio"
                  className="text-center rounded-3xl py-2 w-full shadow-md"
                />
                <ErrorMessage
                  name="prices"
                  component="div"
                  className="text-red-600 text-center"
                />
              </div>
              <div className="flex flex-col mx-6 py-5">
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
    </div>
  );
};

export default FormAddService;
