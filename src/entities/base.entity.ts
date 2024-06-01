import {AutoIncrement, PrimaryKey} from "@deepkit/type";

export class BaseEntity {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date;
    updated: Date = new Date;
}