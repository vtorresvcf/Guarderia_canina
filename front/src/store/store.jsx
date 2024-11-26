import { create } from "zustand";

const useReservationStore = create((set) => ({
  dateStart: null,
  endDate: null,
  numberPlaces: "",
  setReserva: (start, end, number) =>
    set({
      dateStart: start,
      endDate: end,
      numberPlaces: number,
    }),

  setDates: (start, end) =>
    set({
      dateStart: start,
      endDate: end,
    }),

  setNumberPlaces: (number) =>
    set({
      numberPlaces: number,
    }),

  reset: () =>
    set({
      dateStart: null,
      endDate: null,
      numberPlaces: "",
    }),
}));

export default useReservationStore;
