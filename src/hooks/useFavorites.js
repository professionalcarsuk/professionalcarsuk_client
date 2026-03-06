import { useSelector } from "react-redux";
import { selectIsFavorite } from "../store/vehicleSlice";

export const useIsFavorite = (vehicleId) =>
  useSelector((state) => selectIsFavorite(state, vehicleId));
