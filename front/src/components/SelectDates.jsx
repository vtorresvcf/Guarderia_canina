import { useState } from "react";
import useReservationStore from "../store/store";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Formik, Field, Form } from "formik";
import { format } from "date-fns";
import { IoCalendarNumber } from "react-icons/io5";
import { GiDogHouse } from "react-icons/gi";
const SelectDates = () => {
  const { dateStart, endDate, numberPlaces, reset, setReserva } =
    useReservationStore();
  const handleSubmit = (values) => {
    const formattedStartDate = format(values.dateStart, "dd/MMM/yy");
    const formattedEndDate = format(values.endDate, "dd/MMM/yy");
    setReserva({
      dateStart: formattedStartDate,
      endDate: formattedEndDate,
      numberPlaces: values.numberPlaces,
    });
    reset;
  };

  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div className="text-verdeOscuro font-pacifico my-20 flex justify-center">
      <Formik
        initialValues={{
          dateStart,
          endDate,
          numberPlaces,
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

          if (values.numberPlaces <= 0) {
            errors.numberPlaces = "El número de plazas debe ser al menos 1.";
          } else if (values.numberPlaces > 10) {
            errors.numberPlaces =
              "Has alcanzado el número máximo de plazas que se puede reservar.";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, values, resetForm }) => (
          <Form className="flex flex-col justify-center items-center w-full mx-12 ">
            <div className="flex items-center border-b border-teal-500 py-2 text-2xl md:text-3xl gap-4 flex-col md:flex-row justify-center ">
              <div className="flex items-center justify-center gap-1  ">
                <label htmlFor="calendar ">
                  <IoCalendarNumber />
                </label>
                <Field
                  className={`text-lg ${
                    values.dateStart === null || values.endDate === null
                      ? "text-gray-700 w-[140px]"
                      : "text-verdeOscuro "
                  }  appearance-none bg-transparent  justify-center  border-none  md:mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  id="calendar"
                  name="calendar"
                  placeholder="Fecha"
                  onClick={() => setOpenCalendar(!openCalendar)}
                  readOnly
                  value={
                    values.dateStart === null || values.endDate === null
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
                <label htmlFor="numberPlaces">
                  <GiDogHouse />
                </label>
                <Field
                  type="text"
                  id="numberPlaces"
                  name="numberPlaces"
                  className="appearance-none bg-transparent border-none w-[140px]  text-gray-700 md:mr-3 py-1 px-2 leading-tight focus:outline-none"
                  min="1"
                  max="10"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Nº plazas"
                />
              </div>
              <div>
                <button
                  className="flex-shrink-0 bg-green-700 hover:bg-green-800 border-green-700 hover:border-green-900 border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Reservar
                </button>
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
            </div>

            <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full">
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
                />
              )}

              {touched.dateStart && errors.dateStart && (
                <div style={{ color: "red" }}>{errors.dateStart}</div>
              )}
              {touched.endDate && errors.endDate && (
                <div style={{ color: "red" }}>{errors.endDate}</div>
              )}
              {touched.numberPlaces && errors.numberPlaces && (
                <div style={{ color: "red" }}>{errors.numberPlaces}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectDates;
