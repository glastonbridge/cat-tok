import { CatDatum, favouriteCat, unfavouriteCat } from "./api/cats";
// Shares the page styles for now
import styles from "./page.module.css";

const clickFavourite = (catId: string) => () => favouriteCat(catId);

const clickUnfavourite = (favouriteId: string) => () => unfavouriteCat(favouriteId);

export default function CatImage(cat: CatDatum, myFavourite: string| null) {
  
  let favouriteClasses = styles.favouriteMe;
  if (myFavourite) { // null is unfavourited
    favouriteClasses += ` ${styles.favourited}`;
  }

  // TODO: Refresh data on click
  const buttonAction = myFavourite ? clickUnfavourite(myFavourite) : clickFavourite(cat.id);

  return (
    <div key={cat.id} className={styles.catImageWrapper}>
      <div
        className={styles.catImage}
        style={{ backgroundImage: `url(${cat.url})` }}
      />
      <div className={styles.imageOverlay}>
        <button className={favouriteClasses} onClick={buttonAction}></button>
      </div>
    </div>
  );
}
