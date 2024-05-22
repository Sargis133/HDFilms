import {I_CartoonData, I_FilmsData, I_SeriesData} from "../../server/films/interfaces";

export interface I_AllCategories {
    movie: I_FilmsData[],
    series: I_SeriesData[],
    cartoon: I_CartoonData[]
}
