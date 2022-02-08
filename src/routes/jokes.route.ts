import { Request, Response, Router, NextFunction, query } from 'express';
import { builtinModules } from 'module';
import {infoLogger} from '../middleware/logger'
import {getJokes, insertJokes, updateJokes, deleteJoke} from '../services/jokes.service';
import { ApiResult } from '../store/models/apiResult.model';
import HttpError from '../store/models/errorModel';
import {
    validateSearchParameters,
    validateJoke,
    validateNewJoke,
    validateId
} from '../store/validators/jokes.validator';


const router: Router = Router();


//get jokes by search params
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    const paramValue = req.query;
    let result:ApiResult = new ApiResult()
    const { error } = validateSearchParameters(paramValue)    
    if(error) {
        result.error = `${error.details[0].message}`;
        res.statusCode = 400;
    }
    else {
        try{
            result = await getJokes(paramValue);
        }
        catch(e) {            
            result.error += e.message;
            res.statusCode = 400;
        }
    }
    res.send(result);
})
// put crete a new joke
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    const joke = req.body;
    const {error} = validateNewJoke(joke);
    if(error) {
        throw new HttpError(error.details[0].message, 400);
    }
    const result = await insertJokes(joke);
    res.send(result);
})

// post
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const joke = req.body;
    const {error} = validateJoke(joke);
    if(error) {
        throw new HttpError(error.details[0].message, 400);
    }
    const result = await updateJokes(joke);
    res.send(result);
})


// delete
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id;
    const {error} = validateId(id);
    if(error) {
        throw new HttpError(error.details[0].message, 400);
    }
    const result = await deleteJoke(id);
    res.send(result);
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {    
    const result = await getJokes('');
    res.send(result);
});

export { router as jokesRoute };