import { useState, useEffect } from "react";
import { LocalStorage } from "./cookieStorage";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState({ ids: [], source: "" });

  useEffect(() => {
    // Load favourites from localStorage on mount
    const storedFavourites = LocalStorage.getFavourites();
    setFavourites(storedFavourites);
  }, []);

  const addToFavourites = (id) => {
    const newFavourites = { ...favourites };
    if (!newFavourites.ids.includes(id)) {
      newFavourites.ids.push(id);
      setFavourites(newFavourites);
      LocalStorage.setFavourites(newFavourites);
    }
  };

  const removeFromFavourites = (id) => {
    const newFavourites = { ...favourites };
    newFavourites.ids = newFavourites.ids.filter((favId) => favId !== id);
    setFavourites(newFavourites);
    LocalStorage.setFavourites(newFavourites);
  };

  const toggleFavourite = (id) => {
    if (favourites.ids.includes(id)) {
      removeFromFavourites(id);
      return false;
    } else {
      addToFavourites(id);
      return true;
    }
  };

  const isFavourite = (id) => {
    return favourites.ids.includes(id);
  };

  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
    toggleFavourite,
    isFavourite,
  };
};
