import {HelloWorldService} from "../services/test.service";
import {http, HttpBody} from "@deepkit/http";
import {User} from "../entities/user";
import View from "../../view";

export class TestController {
    constructor(private helloService: HelloWorldService) {
    }

    @http.GET('/')
    hello(): Promise<User[]> {
        return this.helloService.find();
    }

    @http.POST('/')
    create(user: HttpBody<User>): void {
        this.helloService.create(user);
    }

    @http.GET('/view')
    view() {
        const name = 'John Doe';

        return View({name})
    }
}