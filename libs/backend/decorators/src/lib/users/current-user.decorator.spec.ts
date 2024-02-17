import { CurrentUser } from './current-user.decorator';

describe('UserDecorator', () => {
  describe('JWTCurrentUser', () => {
    it('should be defined', () => {
      expect(CurrentUser).toBeDefined();
    });

    it('should return a function', () => {
      expect(typeof CurrentUser()).toBe('function');
    });
  });
});
