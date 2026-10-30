import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
}
function isJwtPayload(value: unknown): value is JwtPayload {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return (
    'sub' in value &&
    'email' in value &&
    typeof value.sub === 'string' &&
    typeof value.email === 'string'
  );
}
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader: string | undefined = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: object = await this.jwtService.verifyAsync<object>(token);
      if (!isJwtPayload(payload)) {
        throw new UnauthorizedException();
      }
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
