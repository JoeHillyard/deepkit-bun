import {User} from "../entities/user";
import {Group} from "../entities/group";
import {PGDatabase} from "../providers/db.provider";

export class HelloWorldService {
    constructor(private database: PGDatabase) {}

    find() {
        return this.database.query(User).find();
    }

    async create(user: User) {
        const newGroup = new Group(`${user.name}\`s Group`)
        const newUser = new User(user.name, user.email, newGroup)
        await this.database.persist(newUser, newGroup);
    }
}