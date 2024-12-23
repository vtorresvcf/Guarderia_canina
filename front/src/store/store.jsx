import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const useReservationStore = create(
  devtools((set) => ({
    dateStart: null,
    endDate: null,
    numberPlaces: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: null,

    logout: () => {
      localStorage.removeItem("user");
      set({ user: null, message: null, isLoading: null, login: null });
    },
    setUser: (user) => {
      set({ user });
    },

    registerUser: async (values) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/add_user",
          values
        );

        if (response.data.register === false) {
          set({
            message: response.data.msg,
            register: response.data.register,
          });
        } else {
          set({
            user: response.data.user,
            message: response.data.msg,
            register: response.data.register,
          });
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        setTimeout(() => {
          set({ message: null });
        }, 4000);
      } catch (error) {
        set({
          error: error.response?.data?.msg || "Error desconocido",
          isLoading: false,
        });
        alert("Error al registrar");
      }
    },
    loginUser: async (values) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post(
          "http://127.0.0.1:5000/login",
          values
        );
        if (response.data.login === false) {
          set({
            message: response.data.msg,
            login: response.data.login,
          });
          toast.error(response.data.msg);
        } else {
          set({
            user: response.data.user,
            message: response.data.msg,
            login: response.data.login,
          });
          toast.success(response.data.msg);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        setTimeout(() => {
          set({ message: null });
        }, 5000);
      } catch (error) {
        set({
          error: error.response?.data?.msg || "Error desconocido",
          isLoading: false,
        });
        alert("Error al logearse");
      }
    },
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
  }))
);

export default useReservationStore;
