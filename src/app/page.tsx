"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { CatData, FavouriteData, fetchCats, fetchFavourites } from "./api/cats";
import CatImage from "./CatImage";



// TODO: show loading
export default function ImageList() {
  const [catsData, setCatsData] = useState<CatData>([]);
  const [favouritesData, setFavouritesData] = useState<FavouriteData>([]);
  useEffect(() => {
    fetchCats()
    .then(setCatsData)
    .then(fetchFavourites)
    .then(setFavouritesData)
    .catch(() => {
      // TODO: handle network error
    });
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
