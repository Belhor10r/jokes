// "id" : STRING, ID unique for each JOKE
// "icon_url" : STRING, URL of a valid web compatible image
// "url" : STRING, URL of the JOKE, if not provided the default value is [BASE_DOMAIN]/view/joke/[ID]
// "value" : STRING, the text of the JOKE
// "created_at": DATETIME, the creation date time
// "updated_at": DATETIME, the last updated date time
// "categories": STRING[], the list of categories for the JOKE

import { randomUUID } from "crypto";

export class Jokes {
    constructor(item?: any) {
      if (item) {
        for (const key of Object.keys(this)) {
          this[key] = item[key];
        }
      }
    }
    id: string = randomUUID();
    icon_url: string;
    url: string; // inizializzare al default di [base_domain]/view/joke/[id]
    value: string;
    created_at: string = new Date().toUTCString();
    updated_at: string = new Date().toUTCString();
    categories: Array<string> = [];
  }
  