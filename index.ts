import {App} from '@deepkit/app';
import {httpMiddleware} from '@deepkit/http';
import {createCrudRoutes, FrameworkModule} from "@deepkit/framework";
import {RpcController} from "./src/rpc.controller";
import {PGDatabase} from "./src/providers/db.provider";
import {User} from "./src/entities/user";
import {Group} from "./src/entities/group";
import {myMiddlewareFunction} from "./src/middlewares/test.middleware";
import {Config} from "./src/config/config";
import {HelloWorldService} from "./src/services/test.service";
import {TestController} from "./src/controllers/test.controller";

void new App({
    config: Config,
    controllers: [TestController, RpcController],
    providers: [
        PGDatabase,
        HelloWorldService
    ],
    middlewares: [
        httpMiddleware.for(myMiddlewareFunction),
    ],
    imports: [
        createCrudRoutes([User, Group]),
        new FrameworkModule({
                debug: true,
                migrateOnStartup: true,
            }
        )
    ]
}).run();