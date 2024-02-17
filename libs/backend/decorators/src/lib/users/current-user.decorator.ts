import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@sleep-valley/backend/entities';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
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
});
