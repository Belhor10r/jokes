import { Schema } from 'mongoose';

const JokeSchema = new Schema(
    {
      icon_url: {type: String},
      url: {type: String}, // inizializzare al default di [base_domain]/view/joke/[id default: () => funzionePerSettaggioIndirizzoDiDefault
      value: {type: String},
      created_at: {type: Date},
      updated_at: {type: Date},
      categories: {type: Array<String>()}
    },
    {
      versionKey: false,
    },
  );

  export {JokeSchema};