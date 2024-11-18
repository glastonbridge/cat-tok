import { CatDatum, favouriteCat, unfavouriteCat } from "./api/cats";
// Shares the page styles for now
import styles from "./page.module.css";

const clickFavourite = (catId: string) => () => favouriteCat(catId);

const clickUnfavourite = (favouriteId: string) => () => unfavouriteCat(favouriteId);

// FavouriteId, or null if this image was not favourited
export default function CatImage(cat: CatDatum, myFavouriteId: string| null) {
  
  let favouriteClasses = styles.favouriteMe;
  if (myFavouriteId) {
    favouriteClasses += ` ${styles.favourited}`;
  }

  // TODO: Refresh data on click
  const buttonAction = myFavouriteId ? clickUnfavourite(myFavouriteId) : clickFavourite(cat.id);

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
