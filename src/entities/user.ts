import {
    AutoIncrement,
    BackReference,
    Email,
    entity,
    MaxLength,
    MinLength,
    PrimaryKey,
    Reference,
    Unique
} from "@deepkit/type";
import {Group} from "./group";

@entity.name('user')
export class User {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date;
    firstName?: string;
    lastName?: string;

    constructor(
        public name: string & Unique & MinLength<2> & MaxLength<16>,
        public email: string & Unique & Email,
        public group?: Group & Reference
    ) {
        this.firstName = name.split(' ')[0]
        this.lastName = name.split(' ')[1]
    }
}