"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { CatDatum, fetchCats } from "./api/cats";


function CatImage(cat: CatDatum) {
  return (<div
    key={cat.id}
    className={styles.catImage}
    style={{backgroundImage: `url(${cat.url})`}} 
  />);
}

export default function ImageList() {
  const [catsData, setCatsData] = useState([]);
  useEffect(() => {
    fetchCats().then(catsData =>setCatsData(catsData)); // todo: ugh
  },[]);
  
  return (
    <div className={styles.page}>
      <h1>Look at cats</h1>
      <div className={styles.gallery}>
        {catsData.map(CatImage)}
      </div>
    </div>
  );
}
