import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt-refresh") {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const { user } = request;
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		if (err || !user) {
			return new UnauthorizedException(
				"handle request error by jwt-refresh auth guard"
			);
		}
		return user;
	}
}
