import {App} from '@deepkit/app';
import {http, HttpBody} from '@deepkit/http';
import {createCrudRoutes, FrameworkModule} from "@deepkit/framework";
import {AutoIncrement, Email, entity, MaxLength, MinLength, PrimaryKey, Unique} from "@deepkit/type";
import {Database} from "@deepkit/orm";
import {PostgresDatabaseAdapter} from "@deepkit/postgres";
import View from './view.tsx'
import {RpcController} from "./src/rpc.controller";
import {provide} from "@deepkit/injector";
import {BrokerBus} from "@deepkit/broker";


@entity.name('user')
class User {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date;
    firstName?: string;
    lastName?: string;

    constructor(
        public name: string & Unique & MinLength<2> & MaxLength<16>,
        public email: string & Unique & Email,
    ) {
        this.firstName = name.split(' ')[0]
        this.lastName = name.split(' ')[1]
    }
}

@entity.name('user')
class User {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date;
    firstName?: string;
    lastName?: string;

    constructor(
        public name: string & Unique & MinLength<2> & MaxLength<16>,
        public email: string & Unique & Email,
    ) {
        this.firstName = name.split(' ')[0]
        this.lastName = name.split(' ')[1]
    }
}


class Config {
    pageTitle: string & MinLength<2> = 'Cool site';
    domain: string = 'example.com';
    debug: boolean = false;
}

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
            [User]
        );
    }
}

export class HelloWorldService {
    constructor(private database: PGDatabase) {
    }

    find() {
        return this.database.query(User).find();
    }

    async create(user: User) {
        await this.database.persist(new User(user.name, user.email));
    }
}


class MyHttpController {
    constructor(private helloService: HelloWorldService) {
    }

    @http.GET('/')
    hello(): Promise<User[]> {
        // console.log(stringifyResolvedType(typeOf<User>()))
        return this.helloService.find();
    }

    @http.POST('/')
    create(user: HttpBody<User>): void {
        this.helloService.create(user);
    }

    @http.GET('/view')
    view() {
        const name = 'John Doe';

        return <View/>
    }
}

new App({
    config: Config,
    controllers: [MyHttpController, RpcController],
    providers: [
        PGDatabase,
        HelloWorldService
    ],
    imports: [
        createCrudRoutes([User]),
        new FrameworkModule({
                debug: true,
                migrateOnStartup: true,
            }
        )
    ]
}).run();