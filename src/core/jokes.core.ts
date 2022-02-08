import {Jokes} from '../store/models/joke.model';
const countCategory = (jokes: Array<Jokes>): Record<string,number> => {
    const ret:Record<string, number> = {};
    const distCategories = Array.from(new Set(jokes.flatMap(x => x.categories)))
    for(let cat of distCategories) {
        ret[cat] = jokes.filter(x => x.categories.find(y => y === cat)).length;
    }
    return ret;
}

export {
    countCategory
}