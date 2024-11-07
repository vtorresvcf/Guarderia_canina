import {
  GiSittingDog,
  GiHairStrands,
  GiSniffingDog,
  GiJumpingDog,
} from "react-icons/gi";

import { FaSuitcaseMedical } from "react-icons/fa6";
import Adiestramiento from "../assets/dog-adiestramiento.jpg";
import Juegos from "../assets/dog-juego.png";
import Peluqueria from "../assets/dog-corte.png";
import Paseo from "../assets/dog-paseo.png";
import Veterinario from "../assets/dog-veterinario.png";

const servicios = [
  {
    titulo: "Adiestramiento",
    descripcion:
      "Entrenamiento personalizado para mejorar la obediencia y el comportamiento de tu mascota.",
    imagen: Adiestramiento,
    icono: GiSittingDog,
  },
  {
    titulo: "Veterinario",
    icono: FaSuitcaseMedical,
    descripcion:
      "Atención médica profesional para mantener la salud y bienestar de tu mascota.",
    imagen: Veterinario,
  },
  {
    titulo: "Peluquería",
    icono: GiHairStrands,
    descripcion:
      "Servicios de estética y cuidado para mantener a tu mascota limpia y con un pelaje saludable.",
    imagen: Peluqueria,
  },
  {
    titulo: "Paseo",
    icono: GiSniffingDog,
    descripcion:
      "Paseos guiados para que tu mascota se ejercite y disfrute al aire libre de forma segura.",
    imagen: Paseo,
  },
  {
    titulo: "Juegos",
    icono: GiJumpingDog,
    descripcion:
      "Actividades interactivas y juegos para estimular y divertir a tu mascota.",
    imagen: Juegos,
  },
];

export default servicios;
