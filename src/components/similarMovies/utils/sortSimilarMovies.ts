import {T_CategoryType, T_MovieType} from "../../../../models/server/films/types.ts";
import {filterMoviesCategory} from "../../moviesArticle/utils/filterMoviesCategory.ts";
import {T_AllMoviesTypes} from "../../moviesArticle/models/types.ts";

export const sortSimilarMovies = (category: T_CategoryType[], type: T_MovieType): T_AllMoviesTypes[] => {
    const filteresMovies: T_AllMoviesTypes[] = filterMoviesCategory({category,type})
    const result: T_AllMoviesTypes[] = []
    for(let i =0; i < 6; i++) {
        let newMovie = filteresMovies[Math.floor(Math.random() * ((filteresMovies.length-1) + 1))]
        if(!result.includes(newMovie)) {
            result.push(newMovie)
        } else i--
    }
    return result
}