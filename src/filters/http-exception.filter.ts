import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        console.log(host + " " + exception.message);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            messgae: exception.message,
        });
    }
}
