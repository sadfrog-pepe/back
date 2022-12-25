import { AccessTokenPayload } from "./access-token.payload";

export class RefreshTokenPayload extends AccessTokenPayload {
	key: string;
}
