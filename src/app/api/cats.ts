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

const catEndpoint = (path: string, options = {}) => fetch(
  `${API_HOST}/${path}`,
  {
    headers: {
      "x-api-key": API_KEY
    },
    ...options
  }
);

type FetchCats = () => Promise<CatData>;
export const fetchCats : FetchCats = () => 
    catEndpoint("images").then(res=>res.json());

type UploadCat = (localFile: File) => Promise<Response>;
export const uploadCat: UploadCat = (localFile) => {
  const body = new FormData();
  body.append("file", localFile);
  return catEndpoint("images/upload", {method: "POST", body});
}