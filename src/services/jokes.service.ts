import { json } from 'stream/consumers';
import * as dbContext from '../store/dbContext'
import { Jokes } from '../store/models/joke.model';
import {ApiResult} from '../store/models/apiResult.model';
import {countCategory} from '../core/jokes.core';



const getJokes = async (queryValue): Promise<ApiResult> => {
    const result:ApiResult = new ApiResult();
    try{
        const queryRes = await dbContext.getJokes(queryValue.query, queryValue.category);
        result.total = queryRes.length;
        result.data = queryRes;
        result.categoryCount = countCategory(queryRes);
    }
    catch (e) {
        result.error = e.message;
    }
    return result;
}

const updateJokes = async(joke: Jokes): Promise<ApiResult> => {    
    const result: ApiResult = new ApiResult();
    try {
        const ret = await dbContext.updateJokes(joke);
        result.data = ret;
        result.total = ret ? ret.length : 0;

    }
    catch(e) {
        result.error = e.message;
    }
    return result;
}

const insertJokes = async(joke: Jokes): Promise<Jokes> => {
    const result = await dbContext.setJokes(joke);
    return result;
}

const insertManyJokes = async(jokes: Array<Jokes>): Promise<ApiResult> => {
    const result: ApiResult = new ApiResult();
    try{
        const ret = await dbContext.setBulkJokes(jokes);
        result.data = ret;
        result.total = ret ? ret.length : 0;
    }
    catch (e) {
        result.error = e.message
    }    
    return result;
}

const deleteJoke = async(id:string): Promise<ApiResult> => {
    const result: ApiResult = new ApiResult();
    try{
        const ret = await dbContext.deleteJoke(id)
        result.data = [{'deleted': ret}];
        result.total = ret ? ret.length : 0;
    }
    catch (e){
        result.error = e.message;
    }
    return result;
}


export {
    getJokes,
    insertJokes,
    insertManyJokes,
    updateJokes,
    deleteJoke
}