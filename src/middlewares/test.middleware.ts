import {HttpRequest, HttpResponse} from "@deepkit/http";

export function myMiddlewareFunction(request: HttpRequest, response: HttpResponse, next: (err?: any) => void) {
    response.setHeader('middleware', '1');
    next();
}