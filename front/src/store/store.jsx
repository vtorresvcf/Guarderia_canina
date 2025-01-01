import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const useReservationStore = create(
  devtools((set) => ({
    token: JSON.parse(localStorage.getItem("user")) || null,
    dateStart: null,
    endDate: null,
    isAuthenticated: false,
    numberPlaces: "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: null,
    reservations: null,

    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      set({
        user: null,
        message: null,
        isLoading: null,
        login: null,
        token: null,
      });
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
          localStorage.setItem(
            "authToken",
            JSON.stringify(response.data.token)
          );
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
            token: response.data.token,
            login: response.data.login,
          });
          toast.success(response.data.msg);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "authToken",
            JSON.stringify(response.data.token)
          );
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
    setReserva: async (values) => {
      const token = localStorage.getItem("authToken");
      const cleanToken = token.replace(/^"(.*)"$/, "$1");
      // Verifica si el token está presente
      if (!token) {
        set({
          error: "No hay un token de autenticación. Por favor, inicia sesión.",
          isLoading: false,
        });
        toast.error("No hay un token de autenticación.");
        return;
      }

      try {
        set({ isLoading: true, error: null });

        // Realiza la solicitud POST añadiendo el token al encabezado de autorización
        const response = await axios.post(
          "http://127.0.0.1:5000/add_reservation",
          values,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.reservation === false) {
          set({
            message: response.data.msg,
            reservation: response.data.reservation,
          });
          toast.error(response.data.msg);
        } else {
          set({
            service: response.data.service,
            message: response.data.msg,
            reservation: response.data.reservation,
          });
          toast.success(response.data.msg);
        }

        setTimeout(() => {
          set({ message: null });
        }, 5000);
      } catch (error) {
        console.error("Error en la solicitud:", error.response || error);
        const errorMessage =
          error.response?.data?.msg || error.message || "Error desconocido";
        set({
          error: errorMessage,
          isLoading: false,
        });
        toast.error(errorMessage);
      }
    },
    getReservas: async () => {
      const token = localStorage.getItem("authToken");
      const cleanToken = token.replace(/^"(.*)"$/, "$1");
      // Verifica si el token está presente
      if (!token) {
        set({
          error: "No hay un token de autenticación. Por favor, inicia sesión.",
          isLoading: false,
        });
        toast.error("No hay un token de autenticación.");
        return;
      }

      try {
        set({ isLoading: true, error: null });

        const response = await axios.get(
          "http://127.0.0.1:5000/getReservationsUser",
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.reservations) {
          set({
            message: response.data.msg,
          });
          toast.error(response.data.msg);
        } else {
          set({
            reservations: response.data.reservations,
          });
        }

        setTimeout(() => {
          set({ message: null });
        }, 5000);
      } catch (error) {
        console.error("Error en la solicitud:", error.response || error);
        const errorMessage =
          error.response?.data?.msg || error.message || "Error desconocido";
        set({
          error: errorMessage,
          isLoading: false,
        });
        toast.error(errorMessage);
      }
    },

    deleteReserva: async (id) => {
      const token = localStorage.getItem("authToken");
      const cleanToken = token.replace(/^"(.*)"$/, "$1");
      console.log("id de reserva:" + id);
      console.log("Token:" + cleanToken);
      console.log(`http://127.0.0.1:5000/delete_reservation/${id}`);
      // Verifica si el token está presente
      if (!token) {
        set({
          error: "No hay un token de autenticación. Por favor, inicia sesión.",
          isLoading: false,
        });
        toast.error("No hay un token de autenticación.");
        return;
      }
      try {
        const response = await axios.delete(
          `http://127.0.0.1:5000/delete_reservation/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        {
          /*TODO verificar el setstate que renderice al eliminar el stado */
        }
        if (response.data.success) {
          const { reservations } = useReservationStore.getState();

          const updatedReservations = reservations.filter(
            (reserva) => reserva.id !== id
          );
          useReservationStore.setState({ reservations: updatedReservations });
          toast.success(response.data.msg);
        }

        setTimeout(() => {
          set({ message: null });
        }, 5000);
      } catch (error) {
        console.error("Error en la solicitud:", error.response || error);
        const errorMessage =
          error.response?.data?.msg || error.message || "Error desconocido";
        set({
          error: errorMessage,
          isLoading: false,
        });
        toast.error(errorMessage);
      }
    },
    reset: () =>
      set({
        dateStart: null,
        endDate: null,
        numberPlaces: "",
      }),
  }))
);

export default useReservationStore;
