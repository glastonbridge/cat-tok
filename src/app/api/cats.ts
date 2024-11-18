// In a more generic app this could be parameterised at build time.
const API_KEY = "live_V4MYMSNQIMgmDNJezuWsPre7BP1IdSJt6vwkTD7k33Q4N4KBKgk3VsoO6GjVHRe9";
// So that you can easily switch to the dog API
const API_HOST = "https://api.thecatapi.com/v1";

export interface CatDatum {
  id: string;
  width: number;
  height: number;
  url: string;
}

export type CatData = CatDatum[];

export interface FavouriteData {
  [catId: string]: string;
}

const catEndpoint = (path: string, options = {}) => fetch(
  `${API_HOST}/${path}`,
  {
    ...options,
    headers: {
      "x-api-key": API_KEY,
      ...(options as any).headers
    }
  }
);

type FetchCats = () => Promise<CatData>;
export const fetchCats : FetchCats = () => 
  //catEndpoint("images/search?limit=10").then(res=>res.json());
  catEndpoint("images/?limit=10").then(res=>res.json());

type FetchFavourites = () => Promise<FavouriteData>;
export const fetchFavourites : FetchFavourites = () => 
    catEndpoint("favourites")
      .then(res=>res.json())
      .then(mapFavourites);

type UploadCat = (localFile: File) => Promise<Response>;
export const uploadCat: UploadCat = (localFile) => {
  const body = new FormData();
  body.append("file", localFile);
  return catEndpoint("images/upload", {method: "POST", body});
}

type FavouriteCat = (catId: string) => Promise<Response>;
export const favouriteCat: FavouriteCat = (catId) =>
  catEndpoint("favourites", {
    method: "POST",
    body: JSON.stringify({image_id: catId}),
    headers: {"content-type": "application/json"}
  });

// Smellycat, Smellycat, it's not your fault
type UnfavouriteCat = (favouriteId: string) => Promise<Response>;
export const unfavouriteCat: UnfavouriteCat = (favouriteId) =>
  catEndpoint(`favourites/${favouriteId}`, {
    method: "DELETE"
  });
  

type ApiFavouriteList = {image_id: string, id: string}[]
const mapFavourites: (favs: ApiFavouriteList) => FavouriteData = favs =>
  favs.reduce((prev, fav) => ({
    ...prev,
    [fav.image_id]: fav.id
  }), {});