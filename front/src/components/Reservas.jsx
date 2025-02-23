import { GiDogHouse } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import useReservationStore from "../store/store";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";

const Reservas = ({ reserva }) => {
  const {
    serviceDescription,
    dateStart,
    endDate,
    places,
    created_at,
    totalPrice,
    id_reserva,
    id_services,
  } = reserva;

  const { deleteReserva, updatedReserva } = useReservationStore();
  const [isEditing, setIsEditing] = useState(false);

  const formatToISODate = (date) => {
    const parsedDate = parse(date, "dd-MM-yyyy", new Date());
    return format(parsedDate, "yyyy-MM-dd");
  };

  const handleDelete = (id) => {
    deleteReserva(id);
  };

  const handleSubmit = (values) => {
    const formattedDateStart = format(values.dateStart, "dd-MM-yyyy");
    const formattedEndDate = format(values.endDate, "dd-MM-yyyy");
    const formattedValues = {
      ...values,
      dateStart: formattedDateStart,
      endDate: formattedEndDate,
    };
    updatedReserva(formattedValues);
    setIsEditing(false);
  };

  return (
    <article className="w-[70%] font-serif mx-auto my-5">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-bold text-xl pb-4 text-green-700"
      >
        Reserva: {dateStart} {dateStart !== endDate && `--- ${endDate}`}
      </motion.h2>
      <motion.li
        key={id_reserva}
        className="border-spacing-3 py-10 rounded-md shadow-lg bg-white flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {!isEditing && (
          <div className="w-1/5 flex justify-center items-center ml-10">
            <GiDogHouse className="text-9xl text-green-700" />
          </div>
        )}

        <div className={`${isEditing ? "w-full" : "w-3/5"} text-xl pl-14`}>
          {isEditing ? (
            <Formik
              initialValues={{
                id_services,
                id_reserva,
                serviceDescription,
                dateStart: formatToISODate(dateStart),
                endDate: formatToISODate(endDate),
                places,
                totalPrice,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.dateStart) {
                  errors.dateStart = "La fecha de entrada es obligatoria.";
                }
                if (!values.endDate) {
                  errors.endDate = "La fecha de salida es obligatoria.";
                } else if (
                  new Date(values.endDate) < new Date(values.dateStart)
                ) {
                  errors.endDate =
                    "La fecha de salida debe ser posterior a la de entrada.";
                }

                if (values.places <= 0) {
                  errors.places = "El número de plazas debe ser al menos 1.";
                } else if (values.places > 10) {
                  errors.places =
                    "Has alcanzado el número máximo de plazas que se puede reservar.";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex flex-col gap-4">
                    <label className="font-bold">
                      Servicio:
                      <Field
                        name="serviceDescription"
                        readOnly
                        className="border p-1 pl-4  rounded w-full"
                      />
                    </label>
                    <label className="font-bold">
                      Plazas:
                      <Field
                        name="places"
                        type="number"
                        className="border p-1 pl-4 rounded w-full"
                      />
                    </label>
                    <label className="font-bold">
                      Fecha inicio:
                      <Field
                        name="dateStart"
                        type="date"
                        className="border p-1 pl-4  rounded w-full"
                      />
                    </label>
                    <label className="font-bold">
                      Fecha fin:
                      <Field
                        name="endDate"
                        type="date"
                        className="border p-1 pl-4  rounded w-full"
                      />
                    </label>
                    {!isEditing && (
                      <label className="font-bold">
                        Total (€):
                        <Field
                          name="totalPrice"
                          type="number"
                          readOnly
                          className="border p-1 pl-4 rounded w-full"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4 w-full">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.85 }}
                      className="px-4 w-1/2 py-2   bg-green-700 hover:bg-green-600 transition-all duration-300 text-white rounded"
                    >
                      Guardar
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 w-1/2 py-2 bg-gray-400 hover:bg-gray-600 transition-all duration-300 text-white rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                  {touched.dateStart && errors.dateStart && (
                    <div style={{ color: "red" }}>{errors.dateStart}</div>
                  )}
                  {touched.endDate && errors.endDate && (
                    <div style={{ color: "red" }}>{errors.endDate}</div>
                  )}
                  {touched.places && errors.places && (
                    <div style={{ color: "red" }}>{errors.places}</div>
                  )}
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-bold"
              >
                Servicio:{" "}
                <span className="font-normal">{serviceDescription}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-bold"
              >
                Plazas: <span className="font-normal">{places}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-bold"
              >
                Fecha reserva: <span className="font-normal">{created_at}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-bold"
              >
                Total:{" "}
                <span className="underline decoration-double decoration-green-700">
                  {totalPrice} €
                </span>
              </motion.p>
            </>
          )}
        </div>
        <motion.div
          className="w-1/5 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-2xl flex flex-col mx-auto gap-4">
            {!isEditing && (
              <>
                <FaEdit onClick={() => setIsEditing(true)} />
                <RiDeleteBin2Fill onClick={() => handleDelete(id_reserva)} />
              </>
            )}
          </div>
        </motion.div>
      </motion.li>
    </article>
  );
};

export default Reservas;
