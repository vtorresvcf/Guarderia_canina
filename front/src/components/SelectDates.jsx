import { useState, useEffect } from "react";
import useReservationStore from "../store/store";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Formik, Field } from "formik";
import { format } from "date-fns";
import { IoCalendarNumber } from "react-icons/io5";
import { GiDogHouse } from "react-icons/gi";
import { GiJumpingDog } from "react-icons/gi";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

const slideInUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.2 } },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
};

const SelectDates = () => {
  const {
    dateStart,
    endDate,
    id_services,
    places,
    reset,
    setReserva,
    token,
    getServices,
    Allservices,
  } = useReservationStore();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    if (!token) {
      toast.error("Tienes que estar registrado");
      setTimeout(() => {
        navigate("/register");
      }, 3000);
    } else {
      const formattedDateStart = format(values.dateStart, "dd-MM-yyyy");
      const formattedEndDate = format(values.endDate, "dd-MM-yyyy");
      const formattedValues = {
        ...values,
        dateStart: formattedDateStart,
        endDate: formattedEndDate,
      };
      setReserva(formattedValues);
      setTimeout(() => {
        navigate("/consultaReservas");
      }, 3000);
    }
  };

  const [openCalendar, setOpenCalendar] = useState(false);
  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <div className="text-verdeOscuro font-pacifico my-20 flex justify-center">
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            marginTop: "150px",
            marginBottom: "50px",
            marginLeft: "380px",
            fontSize: "24px",
            maxWidth: "500px",
            padding: "10px",
          },
        }}
      />
      <Formik
        initialValues={{
          dateStart: dateStart || null,
          endDate: endDate || null,
          places: places || 1,
          id_services: id_services || null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.dateStart) {
            errors.dateStart = "La fecha de entrada es obligatoria.";
          }
          if (!values.endDate) {
            errors.endDate = "La fecha de salida es obligatoria.";
          } else if (new Date(values.endDate) < new Date(values.dateStart)) {
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
        {({
          setFieldValue,
          errors,
          touched,
          values,
          resetForm,
          isSubmitting,
        }) => (
          <motion.form
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center items-center w-full mx-12"
            onSubmit={(e) => {
              e.preventDefault();

              if (!values.dateStart || !values.endDate) {
                toast.error("Las fechas son obligatorias.");
                return;
              }

              if (!isSubmitting) {
                handleSubmit(values);
              }
            }}
          >
            <motion.div
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              className="flex items-center border-b border-teal-500 py-2 text-2xl md:text-3xl gap-4 flex-col md:flex-row justify-center"
            >
              <div className="flex items-center justify-center gap-1">
                <label htmlFor="calendar">
                  <IoCalendarNumber />
                </label>
                <Field
                  className={`text-3xl ${
                    !values.dateStart || !values.endDate
                      ? "text-gray-700 w-[140px]"
                      : values.dateStart.getTime() === values.endDate.getTime()
                      ? "text-verdeOscuro text-xl w-[140px]"
                      : "text-verdeOscuro text-xl w-[230px]"
                  } appearance-none bg-transparent justify-center border-none md:mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  id="calendar"
                  name="calendar"
                  placeholder="Fecha"
                  onClick={() => setOpenCalendar(!openCalendar)}
                  readOnly
                  value={
                    !values.dateStart || !values.endDate
                      ? ""
                      : values.dateStart.getTime() === values.endDate.getTime()
                      ? format(values.dateStart, "dd/MMM/yy")
                      : `${format(values.dateStart, "dd/MMM/yy")} - ${format(
                          values.endDate,
                          "dd/MMM/yy"
                        )}`
                  }
                />
              </div>

              <div className="flex items-center justify-center gap-1">
                <label htmlFor="places">
                  <GiDogHouse />
                </label>
                <Field
                  type="number"
                  id="places"
                  name="places"
                  className="appearance-none bg-transparent border-none w-[140px] text-center text-gray-700 md:mr-3 py-1 px-2 leading-tight focus:outline-none"
                  min="1"
                  max="10"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Nº plazas"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <label htmlFor="services">
                  <GiJumpingDog />
                </label>
                <Field
                  as="select"
                  name="id_services"
                  id="services"
                  className="appearance-none bg-transparent border-none w-[240px]  text-xl text-center text-gray-700 md:mr-3 py-1 px-2 leading-tight focus:outline-none"
                >
                  <option value="">Selecciona un servicio</option>
                  {Allservices?.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.prices}€
                    </option>
                  ))}
                </Field>
              </div>

              <div>
                <motion.button
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="flex-shrink-0 bg-green-700 hover:bg-green-800 border-green-700 hover:border-green-900 border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  whileTap={{ scale: 0.85 }}
                  disabled={isSubmitting}
                >
                  Reservar
                </motion.button>
                <button
                  className="flex-shrink-0 border-transparent border-4 text-green-700 hover:text-green-900 py-1 px-2 rounded"
                  type="button"
                  onClick={() => {
                    resetForm();
                    reset();
                    setOpenCalendar(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate={openCalendar ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center gap-4 mt-4 w-full"
            >
              {openCalendar && (
                <DateRange
                  ranges={[
                    {
                      startDate: values.dateStart,
                      endDate: values.endDate,
                      key: "selection",
                    },
                  ]}
                  onChange={(range) => {
                    const { startDate, endDate } = range.selection;
                    setFieldValue("dateStart", startDate);
                    setFieldValue("endDate", endDate);
                    if (startDate && endDate && startDate !== endDate) {
                      setOpenCalendar(false);
                    }
                  }}
                  rangeColors={["#15803D"]}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={false}
                  style={{
                    width: "700px",
                    fontSize: "18px",
                  }}
                />
              )}

              {touched.dateStart && errors.dateStart && (
                <div style={{ color: "red" }}>{errors.dateStart}</div>
              )}
              {touched.endDate && errors.endDate && (
                <div style={{ color: "red" }}>{errors.endDate}</div>
              )}
              {touched.places && errors.places && (
                <div style={{ color: "red" }}>{errors.places}</div>
              )}
            </motion.div>
          </motion.form>
        )}
      </Formik>
    </div>
  );
};

export default SelectDates;
