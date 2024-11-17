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

const catEndpoint = (path: string) => fetch(
  `${API_HOST}/${path}`,
  {
    headers: {
      "x-api-key": API_KEY
    }
  }
);


// TODO: make type CatData
export const fetchCats : () => Promise<Response> = () => catEndpoint("images/search?limit=10");