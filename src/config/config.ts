import {MinLength} from "@deepkit/type";

export class Config {
    pageTitle: string & MinLength<2> = 'Cool site';
    domain: string = 'example.com';
    debug: boolean = false;
}
