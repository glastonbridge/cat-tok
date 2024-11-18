"use client"

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { CatData, FavouriteData, fetchCats, fetchFavourites } from "./api/cats";
import CatImage from "./CatImage";
import { UiStateContext } from "./ui-state-context";



export default function ImageList() {
  const [catsData, setCatsData] = useState<CatData>([]);
  const [favouritesData, setFavouritesData] = useState<FavouriteData>({});
  const {setErrorMessage, setBusy} = useContext(UiStateContext);
  useEffect(() => {
    setBusy(true);
    fetchCats()
    .then(setCatsData)
    .then(fetchFavourites)
    .then(setFavouritesData)
    .catch((e) => {
      setErrorMessage("Network error");
    })
    .finally(() => setBusy(false));
  },[]);
  
  return (
    <div className={styles.page}>
      <h1>Look at cats</h1>
      <div className={styles.gallery}>
        {catsData.map(catDatum => CatImage(catDatum, favouritesData[catDatum.id]))}
      </div>
    </div>
  );
}
