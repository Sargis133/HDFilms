import {T_CategoryType, T_MovieType} from "../../../../models/server/films/types.ts";
import {T_FilterType} from "./types.ts";

export interface I_MoviesArticleItems {
    id: number,
    nameEn: string,
    nameRu: string,
    imgSm: string,
    imgLg: string,
    year: number,
    type: string,
    rating: number,
    category: T_CategoryType[]
}
export interface I_MovieOptions {
    type?: T_MovieType,
    category?: T_CategoryType[],
    filter?: T_FilterType,
    yearFrom?: number,
    yearTo?: number,
}