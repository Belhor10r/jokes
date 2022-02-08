import path from 'path';
import {Jokes} from '../models/joke.model';
import fs, { read } from 'fs';


const readJokes = async():Promise<Array<Jokes>> => {
    let jokes:Array<Jokes> = [];
    try{
        
        jokes = JSON.parse( (await fs.readFileSync(path.resolve(__dirname,'./jokes.mockup.json'))).toString());
    }
    catch(e){
        throw e;
    }

    return jokes;
}
//scrive su file i jokes passati, opzione di append opzionale (default: false)
const writeAllJokes = async(data:Array<Jokes>):Promise<boolean> => {
    try{
        await fs.writeFileSync('jokes.mockup.json', JSON.stringify(data))
    }
    catch(e) {
        throw e;
    }
    return true;
}

//eliminazione jokes restituisce il numero di elementi eliminati
const deleteJokes = async(id):Promise<number> => {    
    const currentJokes = await readJokes();    
    const filteredJokes = currentJokes.filter(x => x.id !== id);    
    await writeAllJokes(filteredJokes);
    const deletedCount = currentJokes.length - filteredJokes.length;
    return deletedCount;
}



export {
    readJokes,
    deleteJokes
};