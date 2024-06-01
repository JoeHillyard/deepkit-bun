import {Database} from "@deepkit/orm";
import {PostgresDatabaseAdapter} from "@deepkit/postgres";
import {User} from "../entities/user";
import {Group} from "../entities/group";

export class PGDatabase extends Database {
    constructor() {
        super(
            new PostgresDatabaseAdapter({
                host: 'localhost',
                port: 5432,
                database: 'deepkit',
                user: 'postgres',
                password: 'postgres',
            }),
            [User, Group]
        );
    }
}