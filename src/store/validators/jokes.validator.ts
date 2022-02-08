
import { url } from 'inspector';
import * as Joi from 'joi';
import {jokesCategory} from '../enums';


const extention = joi => ({
  base: joi.string(),
  name: 'uri',
  language: {
     uri: 'must be a valid url',
  },
  rules: [{
     name: 'uri',
     validate(params, value, state, options) {
       let error = false;
       try{
         new URL(value);
         error = false;
       }
       catch(e) {
         error = true;
       }        
       if(error) {
         return this.createError(
           'uri.uri',
           { v: value },
           state,
           options
         );
       }        
       return value;
     },
  }],
});

const extendedJoi = Joi.extend(extention)

const validateSearchParameters = function (queryparams) {
    const searchParamsValidator = Joi.object({
      query: Joi.string().min(3).required(),
      category: Joi.string()
    });
  
    return Joi.validate(queryparams,searchParamsValidator, {
      allowUnknown: false,
      noDefaults: true,
    });
  };

const validateNewJoke = function (joke) {
    const jokeValidator = Joi.object({        
      icon_url: extendedJoi.uri().uri(),
      url: extendedJoi.uri().uri(),
      value: Joi.string(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
      categories: Joi.array().items(
          Joi.string().valid(Object.keys(jokesCategory))
      )
    })
    return Joi.validate(joke, jokeValidator, {
      allowUnknown: false,
      noDefaults: true,
    });
}
const validateJoke = function (joke) {
    const jokeValidator = Joi.object({     
      id: Joi.string().required(),   
      icon_url: extendedJoi.uri(),
      url: extendedJoi.uri(),
      value: Joi.string(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
      categories: Joi.array().items(
          Joi.string().valid(Object.keys(jokesCategory))       
      )
    })
    return Joi.validate(joke,jokeValidator, {
      allowUnknown: false,
      noDefaults: true,
    });
}

const validateId = (id) => {
  const idValidator = Joi.string().min(24).max(24).required()
  return Joi.validate(id, idValidator)
}


  export {
    validateId,
    validateSearchParameters,
    validateNewJoke,
    validateJoke
}