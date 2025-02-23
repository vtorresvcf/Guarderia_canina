import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = "http://127.0.0.1:5000";
const TOAST_TIMEOUT = 5000;

const getCleanToken = () => {
  const token = localStorage.getItem("authToken");
  return token ? token.replace(/^"(.*)"$/, "$1") : null;
};

const handleAuthError = (
  set,
  message = "No hay token de autenticación. Por favor, inicia sesión."
) => {
  set({ error: message, isLoading: false });
  toast.error(message);
  return false;
};

const useReservationStore = create(
  devtools((set, get) => ({
    token: JSON.parse(localStorage.getItem("authToken")) || null,
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: null,
    reservations: null,
    servicios: null,
    isLoading: false,
    error: null,
    Allservices: [],

    logout: () => {
      setTimeout(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        set({
          user: null,
          message: null,
          isLoading: false,
          token: null,
          isAuthenticated: false,
        });
      }, 1000);
    },

    registerUser: async (values) => {
      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.post(`${API_BASE_URL}/add_user`, values);

        const newState = {
          message: data.msg,
          register: data.register,
          isLoading: false,
        };

        if (data.register) {
          Object.assign(newState, {
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("authToken", JSON.stringify(data.token));
        }

        set(newState);
        setTimeout(() => set({ message: null }), 4000);
      } catch (error) {
        const errorMsg = error.response?.data?.msg || "Error al registrar";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },
    getServices: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        set({ Allservices: response.data.services });
      } catch (error) {
        const errorMsg = console.error("Error al obtener los servicios", error);
        set({ error: errorMsg, isLoading: false });
      }
    },

    addService: async (values) => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.post(
          `${API_BASE_URL}/add_service`,
          values,
          {
            headers: { Authorization: `Bearer ${cleanToken}` },
          }
        );

        if (data.success === "True" || data.success === true) {
          const currentServices = get().servicios || [];
          set({
            message: data.msg,
            servicios: [...currentServices, data.service],
            isLoading: false,
          });
          toast.success(data.msg);
          setTimeout(() => set({ message: null }), 4000);
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al añadir el servicio";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    deleteService: async (id) => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.delete(`${API_BASE_URL}/delete_service`, {
          headers: { Authorization: `Bearer ${cleanToken}` },
          data: { id },
        });

        if (data.success) {
          const currentServices = get().servicios || [];
          set({
            message: data.msg,
            servicios: currentServices.filter(
              (s) => s.id !== data.service_deleted.id
            ),
            isLoading: false,
          });
          toast.success(data.msg);
        } else {
          set({ message: data.msg, isLoading: false });
          toast.error(data.msg);
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al eliminar el servicio";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    loginUser: async (values) => {
      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.post(`${API_BASE_URL}/login`, values);

        const newState = {
          message: data.msg,
          login: data.login,
          isLoading: false,
        };

        if (data.login) {
          Object.assign(newState, {
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("authToken", JSON.stringify(data.token));
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }

        set(newState);
        setTimeout(() => set({ message: null }), TOAST_TIMEOUT);
      } catch (error) {
        const errorMsg = error.response?.data?.msg || "Error al iniciar sesión";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    setReserva: async (values) => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.post(
          `${API_BASE_URL}/add_reservation`,
          values,
          {
            headers: { Authorization: `Bearer ${cleanToken}` },
          }
        );

        set({
          message: data.msg,
          reservation: data.reservation,
          service: data.service,
          isLoading: false,
        });

        data.reservation ? toast.success(data.msg) : toast.error(data.msg);
        setTimeout(
          () => set({ message: null, reservation: false }),
          TOAST_TIMEOUT
        );
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al crear la reserva";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    getReservas: async () => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.get(
          `${API_BASE_URL}/getReservationsUser`,
          {
            headers: { Authorization: `Bearer ${cleanToken}` },
          }
        );

        set({
          reservations: data.reservations || null,
          message: data.msg,
          isLoading: false,
        });

        if (!data.reservations) toast.error(data.msg);
        setTimeout(() => set({ message: null }), TOAST_TIMEOUT);
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al obtener reservas";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    deleteReserva: async (id) => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.delete(
          `${API_BASE_URL}/delete_reservation/${id}`,
          {
            headers: { Authorization: `Bearer ${cleanToken}` },
          }
        );

        if (data.success) {
          const currentReservations = get().reservations || [];
          set({
            reservations: currentReservations.filter(
              (r) => r.id_reserva !== id
            ),
            isLoading: false,
          });
          toast.success(data.msg);
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al eliminar la reserva";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    updatedReserva: async (values) => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.put(
          `${API_BASE_URL}/update_reservation/${values.id_reserva}`,
          values,
          { headers: { Authorization: `Bearer ${cleanToken}` } }
        );

        if (data.updated) {
          const currentReservations = get().reservations || [];
          const updatedReservations = currentReservations
            .filter((r) => r.id_reserva !== values.id_reserva)
            .concat(data.reservation);

          set({
            reservations: updatedReservations,
            message: data.msg,
            isLoading: false,
          });
          toast.success(data.msg);
        } else {
          set({ message: data.msg, isLoading: false });
          toast.error(data.msg);
        }
        setTimeout(() => set({ message: null }), TOAST_TIMEOUT);
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al actualizar la reserva";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    getAllAdmin: async () => {
      const cleanToken = getCleanToken();
      if (!cleanToken) return handleAuthError(set);

      try {
        set({ isLoading: true, error: null });
        const { data } = await axios.get(`${API_BASE_URL}/getAllAdmin`, {
          headers: { Authorization: `Bearer ${cleanToken}` },
        });

        set({
          reservations: data.reservations || null,
          usuarios: data.users || null,
          servicios: data.services || null,
          message: data.msg,
          isLoading: false,
        });

        if (!data.reservations) toast.error(data.msg);
        setTimeout(() => set({ message: null }), TOAST_TIMEOUT);
      } catch (error) {
        const errorMsg =
          error.response?.data?.msg || "Error al obtener datos de admin";
        set({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      }
    },

    reset: () => set({ reservation: false }),
  }))
);

export default useReservationStore;
