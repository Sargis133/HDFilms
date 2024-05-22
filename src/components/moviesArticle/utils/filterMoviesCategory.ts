import { T_CategoryType } from "../../../../models/server/films/types.ts";
import { allFilmsApi } from "../../../../server/films/allFilmsApi.ts";
import {
  I_CartoonApi,
  I_FilmsApi,
  I_SeriesApi,
} from "../../../../models/server/films/interfaces.ts";
import { allSeriesApi } from "../../../../server/films/allSeriesApi.ts";
import { allCartoonApi } from "../../../../server/films/allCartoonApi.ts";
import { I_MovieOptions } from "../models/interfaces.ts";
import { T_AllMoviesTypes } from "../models/types.ts";
import { T_FilteredMovieType } from "../../../../models/pages/index/types.ts";

export const filterMoviesCategory = (
  movieOptions: I_MovieOptions,
): T_AllMoviesTypes[] => {
  let allFilms: I_FilmsApi[] = allFilmsApi;
  let allSeries: I_SeriesApi[] = allSeriesApi;
  let allCartoons: I_CartoonApi[] = allCartoonApi;
  let result: T_AllMoviesTypes[] = [...allFilms, ...allSeries, ...allCartoons];

  if (movieOptions.type) {
    result =
      movieOptions.type === "movie"
        ? allFilms
        : movieOptions.type === "series"
          ? allSeries
          : movieOptions.type === "cartoon"
            ? allCartoons
            : [];
  }
  if(!movieOptions.filter) {
    result = result.sort((a,c) => a.id - c.id)
  }
  if (movieOptions.filter === "popular") {
    result = result.sort(
      (a: T_AllMoviesTypes, c: T_AllMoviesTypes) => c.rating - a.rating,
    );
  }
  if (movieOptions.filter === "waiting") {
    result = result.filter((item: T_AllMoviesTypes) => item.year === 2024);
  }
  if (movieOptions.category && movieOptions.category.length > 0) {
    result = result.filter((item: T_AllMoviesTypes) => {
      return (
        item.category.filter((i: T_CategoryType) =>
          movieOptions.category?.includes(i),
        ).length > 0
      );
    });
  }
  if (movieOptions.yearFrom) {
    result = result.filter((item: T_FilteredMovieType) =>
      movieOptions.yearFrom ? item.year >= movieOptions.yearFrom : item,
    );
  }
  if (movieOptions.yearTo)
    result = result.filter((item: T_FilteredMovieType) =>
      movieOptions.yearTo ? item.year <= movieOptions.yearTo : item,
    );
  return result;
};
