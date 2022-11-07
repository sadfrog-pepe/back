import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		if (err || !user) {
			return new UnauthorizedException(
				"handle request error by local auth guard"
			);
		}
		return user;
	}
}
