import {allFilmsApi} from "../../../../../../server/films/allFilmsApi.ts";
import {allSeriesApi} from "../../../../../../server/films/allSeriesApi.ts";
import {allCartoonApi} from "../../../../../../server/films/allCartoonApi.ts";
import {T_AllMoviesTypes} from "../../../../moviesArticle/models/types.ts";

export const getMovie = (type: string, id: number): T_AllMoviesTypes => {
    const allMovies: any = {
        movie: allFilmsApi,
        series: allSeriesApi,
        cartoon: allCartoonApi,
    }
    return allMovies[type].find((item: T_AllMoviesTypes) => item.id == id)
}