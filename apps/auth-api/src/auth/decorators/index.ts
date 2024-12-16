import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { TokenPayload } from "../dto";
import { IS_PUBLIC_KEY } from "../guards/authGuard";

export const JwtTokenPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TokenPayload;
  }
);

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
