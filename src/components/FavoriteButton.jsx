import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from "../store/vehicleSlice";

const FavoriteButton = ({ vehicle }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, vehicle.id)
  );

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(vehicle.id));
    } else {
      dispatch(addToFavorites(vehicle));
    }
  };

  return (
    <a
      href="#"
      title="Add to favourites"
      className={`vehicle-listing__favourites ${
        isFavorite ? "favourites-added" : ""
      }`}
      onClick={handleToggleFavorite}
    >
      <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
    </a>
  );
};

export default FavoriteButton;
