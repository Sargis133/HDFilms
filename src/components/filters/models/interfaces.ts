import {T_CategoryType} from "../../../../models/server/films/types.ts";

export interface I_RouteFilterOptions {
    yearFrom?: number,
    yearTo?: number,
    category?: T_CategoryType[]
}