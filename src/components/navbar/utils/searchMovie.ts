import { allFilmsApi } from "../../../../server/films/allFilmsApi.ts";
import { allSeriesApi } from "../../../../server/films/allSeriesApi.ts";
import { allCartoonApi } from "../../../../server/films/allCartoonApi.ts";
import { T_AllMoviesTypes } from "../../moviesArticle/models/types.ts";
import { I_ItemSearchResult } from "../models/interfaces.ts";

export const searchMovie = (name: string): I_ItemSearchResult[] => {
  let allMovies: T_AllMoviesTypes[] = [
    ...allFilmsApi,
    ...allSeriesApi,
    ...allCartoonApi,
  ];
  let result: I_ItemSearchResult[];
  // FILTER SEARCH RESULTS
  allMovies = allMovies.filter(
    (item: T_AllMoviesTypes) =>
      onReplaceTextFunc(item.nameEn).indexOf(onReplaceTextFunc(name)) > -1 ||
      onReplaceTextFunc(item.nameRu).indexOf(onReplaceTextFunc(name)) > -1,
  );

  // GET ONLY NEED PARAMS
  result = allMovies.map((item: T_AllMoviesTypes): I_ItemSearchResult => {
    return {
      id: item.id,
      nameEn: item.nameEn,
      nameRu: item.nameRu,
      imgSm: item.imgSm,
      year: item.year,
      type: item.type,
    };
  });
  return result;

  function onReplaceTextFunc(text: string) {
    return text.toLowerCase().replace(/\s+/g, "");
  }
};
