import {
    I_CartoonData,
    I_FilmsData,
    I_SeriesData
} from "../../../../models/server/films/interfaces.ts";

export type T_AllMoviesTypes = I_FilmsData | I_CartoonData | I_SeriesData
export type T_FilterType = 'waiting' | 'popular'