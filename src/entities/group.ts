import {AutoIncrement, BackReference, entity, MaxLength, MinLength, PrimaryKey, Reference, Unique} from "@deepkit/type";
import {User} from "./user";

@entity.name('group')
export class Group {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date;
    users?: User[] & BackReference
    constructor(
        public name: string & Unique & MinLength<2> & MaxLength<16>,
    ) {
    }
}