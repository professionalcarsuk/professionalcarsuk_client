import { useSelector } from "react-redux";
import { selectIsFavorite } from "../store/vehicleSlice";

export const useIsFavorite = () => {
  const checkIsFavorite = (vehicleId) => {
    return useSelector((state) => selectIsFavorite(state, vehicleId));
  };

  return checkIsFavorite;
};
