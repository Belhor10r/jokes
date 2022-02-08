import { Jokes } from './models/joke.model'
import {readJokes} from './mockup/jsonMockReader'
import { MongoJokes } from './mongoManager'
import mongoose from 'mongoose'

//find a jokes bay value
const getJokes = async (value:string, category:string): Promise<Array<Jokes>> => {
    // implementare chiamata a db
    let query = {};
    query['value'] = {$regex:'.*' + value + '.*'};
    if(category) {
        const tmpQuery = {$and: [query, { 'categories': category}]}
        query = tmpQuery;
    }   
        
    return await MongoJokes.find(query).lean();
    //const result:Array<Jokes> = (await readJokes()).filter(x => x.value.includes(value));
    //return result;
}

//insert joke and return the id
const setJokes = async (joke:Jokes): Promise<Jokes> => {
    const jokesDock = new MongoJokes(joke);
    jokesDock.url = joke.url ?  jokesDock.url : `${global.root}/view/joke/${jokesDock.id}`
    const ret = await jokesDock.save();
    return ret;
}

const setBulkJokes = async (jokes: Array<Jokes>): Promise<Array<Jokes>> => {
    const ret = await MongoJokes.insertMany(jokes);

    return ret;
}

const updateJokes =async (joke:Jokes): Promise<Array<Jokes>> => {
    const jokesDock = new MongoJokes(joke);
    const ret = await MongoJokes.findByIdAndUpdate(joke.id,jokesDock)
    return [...ret];
}

const deleteJoke = async(id:string): Promise<string> => {
    const ret = await MongoJokes.findByIdAndDelete(id);
    return ret;
}

export {
    getJokes,
    setJokes,
    setBulkJokes,
    updateJokes,
    deleteJoke
}