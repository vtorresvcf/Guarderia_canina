import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Formik, Field, Form } from "formik";
import { format } from "date-fns";

const SelectDates = () => {
  const handleSubmit = (values) => {
    const formattedStartDate = format(values.dateStart, "dd/MMM/yy");
    const formattedEndDate = format(values.endDate, "dd/MMM/yy");
    console.log({
      dateStart: formattedStartDate,
      endDate: formattedEndDate,
      numberPlaces: values.numberPlaces,
    });
  };

  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          dateStart: null,
          endDate: null,
          numberPlaces: 1,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.dateStart) {
            errors.dateStart = "La fecha de entrada es obligatoria.";
          }
          if (!values.endDate) {
            errors.endDate = "La fecha de salida es obligatoria.";
          } else if (new Date(values.endDate) <= new Date(values.dateStart)) {
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
        {({ setFieldValue, errors, touched, values }) => (
          <Form className="flex justify-center gap-24 items-center">
            <div>
              <label>Seleccionar fechas:</label>
              <input
                type="text"
                onClick={() => setOpenCalendar(true)}
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
                value={
                  values.dateStart === null || values.endDate === null
                    ? "Fecha" // Mostrar "Fecha" si no hay selección
                    : `${format(values.dateStart, "dd/MMM/yy")} - ${format(
                        values.endDate,
                        "dd/MMM/yy"
                      )}`
                }
              />
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
                      setOpenCalendar(false); // Cerrar calendario
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
            </div>

            <div>
              <label htmlFor="numberPlaces">Número de plazas:</label>
              <Field
                type="number"
                id="numberPlaces"
                name="numberPlaces"
                min="1"
                max="10"
              />
              {touched.numberPlaces && errors.numberPlaces && (
                <div style={{ color: "red" }}>{errors.numberPlaces}</div>
              )}
            </div>

            <button type="submit">Realizar Reserva</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectDates;
