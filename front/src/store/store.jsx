import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const useReservationStore = create(
  devtools((set) => ({
    token: JSON.parse(localStorage.getItem("authToken")) || null,
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: null,
    reservations: null,
    servicios: null,

    logout: () => {
      setTimeout(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        set({
          user: null,
          message: null,
          isLoading: null,
          login: null,
          token: null,
        });
      }, 1000);
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
    addService: async (values) => {
      set({ isLoading: true, error: null });
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
        const response = await axios.post(
          "http://127.0.0.1:5000/add_service",
          values,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );

        if (
          response.data.success === "True" ||
          response.data.success === true
        ) {
          const { servicios } = useReservationStore.getState();
          const message = response?.data?.msg || "Error desconocido";
          set({
            message: message,
            servicios: [...servicios, response.data.service],
          });

          toast.success(message);

          setTimeout(() => {
            set({ message: null });
          }, 4000);
        }

        // Asegurarse de que isLoading se restablezca
        set({ isLoading: false });
      } catch (error) {
        // Manejo de errores
        const errorMessage = error.response?.data?.msg || "Error desconocido";
        set({ error: errorMessage, isLoading: false });
        console.error("Error al añadir el servicio:", error);
        toast.error(errorMessage);
      }
    },
    deleteService: async (id) => {
      set({ isLoading: true, error: null });
      const token = localStorage.getItem("authToken");

      // Verifica si el token está presente
      if (!token) {
        set({
          error: "No hay un token de autenticación. Por favor, inicia sesión.",
          isLoading: false,
        });
        toast.error("No hay un token de autenticación.");
        return;
      }

      const cleanToken = token.replace(/^"(.*)"$/, "$1");

      try {
        set({ isLoading: true, error: null });

        // Enviar la solicitud DELETE con el ID en el cuerpo
        const response = await axios.delete(
          "http://127.0.0.1:5000/delete_service",
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
            data: { id }, // Se pasa el ID en el cuerpo de la solicitud
          }
        );

        const { msg, service_deleted, success } = response.data;
        const { servicios } = useReservationStore.getState();

        if (success) {
          // Elimina el servicio eliminado de la lista
          const updatedServices = servicios.filter(
            (servicio) => servicio.id !== service_deleted.id
          );
          console.log(updatedServices);
          set({ message: msg, servicios: updatedServices });
          toast.success(msg);
        } else {
          set({ message: msg });
          toast.error(msg);
        }
      } catch (error) {
        set({
          error: error.response?.data?.msg || "Error desconocido",
          isLoading: false,
        });
        toast.error(error.response?.data?.msg || "Error desconocido");
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
          set({ message: null, reservation: false });
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

        if (response.data.success) {
          const { reservations } = useReservationStore.getState();

          const updatedReservations = reservations.filter(
            (reserva) => reserva.id_reserva !== id
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
    updatedReserva: async (values) => {
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

        const response = await axios.put(
          `http://127.0.0.1:5000/update_reservation/${values.id_reserva}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.updated) {
          console.log(response.data.reservation);
          const { reservations } = useReservationStore.getState();

          const filterReserva = reservations.filter(
            (reserva) => reserva.id_reserva !== values.id_reserva
          );
          const updatedReservas = [
            ...filterReserva,
            response.data.reservation || response.data.reservation_to_update,
          ];
          console.log(updatedReservas);

          set({
            message: response.data.msg,
            error: null,
            isLoading: false,
            reservations: updatedReservas,
          });

          toast.success(response.data.msg);
        } else {
          set({
            message: response.data.msg,
            error: "Error",
          });
          console.error("Error en la reserva:", response.data.msg);
          toast.error(response.data.msg);
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

    getAllAdmin: async () => {
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

        const response = await axios.get("http://127.0.0.1:5000/getAllAdmin", {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.reservations) {
          set({
            message: response.data.msg,
          });
          toast.error(response.data.msg);
        } else {
          const { reservations, users, services } = response.data;
          set({
            reservations: reservations,
            usuarios: users,
            servicios: services,
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

    reset: () =>
      set({
        reservation: false,
      }),
  }))
);

export default useReservationStore;
