
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'
import {countCategory} from '../src/core/jokes.core';
import { Jokes } from '../src/store/models/joke.model';

const mockdata:Array<Jokes> = [ {
    "categories": [],
    "created_at": "2020-01-05 13:42:18.823766",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "NFxaKElARJOKRgUoYAHVBg",
    "updated_at": "2020-01-05 13:42:18.823766",
    "url": "https://api.chucknorris.io/jokes/NFxaKElARJOKRgUoYAHVBg",
    "value": "You can't spell Love without L O, you can't spell is without I S, you can't spell SILO without LOIS. Chuck Norris"
  },
  {
    "categories": ["explicit"],
    "created_at": "2020-01-05 13:42:18.823766",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "AZCXmffOQ7O1ixa3WEHdTg",
    "updated_at": "2020-01-05 13:42:18.823766",
    "url": "https://api.chucknorris.io/jokes/AZCXmffOQ7O1ixa3WEHdTg",
    "value": "I dont know why people make Chuck Norris jokes. chuck is just a dick, and oh hey how did you g"
  },
  {
    "categories": ["explicit"],
    "created_at": "2020-01-05 13:42:18.823766",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "wEmndQnfS3-8EAGrRTHrTA",
    "updated_at": "2020-01-05 13:42:18.823766",
    "url": "https://api.chucknorris.io/jokes/wEmndQnfS3-8EAGrRTHrTA",
    "value": "If he wanted to, Chuck Norris could give himself a barium enema with his own dick."
  },
  {
    "categories": ["explicit"],
    "created_at": "2020-01-05 13:42:18.823766",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "4e-gBFzHQD23ez_B-Bz1nA",
    "updated_at": "2020-01-05 13:42:18.823766",
    "url": "https://api.chucknorris.io/jokes/4e-gBFzHQD23ez_B-Bz1nA",
    "value": "Chuck Norris where's a black belt around the beard that he grows on his dick"
  },
  {
    "categories": ["explicit"],
    "created_at": "2020-01-05 13:42:18.823766",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "P3J2ohC2Q0yxmG5LK3ggPw",
    "updated_at": "2020-01-05 13:42:18.823766",
    "url": "https://api.chucknorris.io/jokes/P3J2ohC2Q0yxmG5LK3ggPw",
    "value": "Chuck Norris invented the dickslap."
  }];

describe('core jokse', () => {
    it('count category', async () => {
        const result:Record<string,number> = countCategory(mockdata);
        expect(result).toBeDefined();
        expect(Object.keys(result).length).toBeGreaterThan(0);
        expect(result['explicit']).toBe(4);
    })
    it('count category no category', async () => {
        let _mock = [...mockdata];
        _mock = _mock.filter(x => x.categories?.length === 0)
        const result:Record<string,number> = countCategory(_mock);
        expect(result).toBeDefined();
        expect(Object.keys(result).length).toBe(0);
        expect(result['explicit']).toBeUndefined();
    })
})