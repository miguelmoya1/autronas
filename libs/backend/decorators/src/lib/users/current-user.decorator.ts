import { UserEntity } from '@autronas/backend/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const type = context.getType();
    const isHttp = type === 'http';
    const isSocket = type === 'ws';

    let user: UserEntity | null = null;

    if (isHttp) {
      const req = context.switchToHttp().getRequest();
      user = req.user;
    }

    if (isSocket) {
      const client = context.switchToWs().getClient();
      user = client.user;
    }

    return user;
  },
);
