import {T_CategoryType} from "./types";

export interface I_FilmsApi {
    id: number,
    nameEn: string,
    nameRu: string,
    imgSm: string,
    imgLg: string,
    video: string,
    duration: number,
    year: number,
    type: 'movie',
    director: string,
    actors: string[],
    category: T_CategoryType[],
    aboutEn: string,
    aboutRu: string,
    rating: number,
}
export interface I_SeriesApi {
    id: number,
    nameEn: string,
    nameRu: string,
    imgSm: string,
    imgLg: string,
    video: string,
    duration: number,
    year: number,
    type: 'series',
    director: string,
    actors: string[],
    category: T_CategoryType[],
    aboutEn: string,
    aboutRu: string,
    rating: number,
}
export interface I_CartoonApi {
    id: number,
    nameEn: string,
    nameRu: string,
    imgSm: string,
    imgLg: string,
    video: string,
    duration: number,
    year: number,
    type: 'cartoon',
    director: string,
    actors: string[],
    category: T_CategoryType[],
    aboutEn: string,
    aboutRu: string,
    rating: number,
}
export interface I_FilmsData extends I_FilmsApi{}
export interface I_SeriesData extends I_SeriesApi{}
export interface I_CartoonData extends I_CartoonApi{}