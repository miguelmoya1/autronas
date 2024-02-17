import { loggerInterceptor } from './logger.interceptor';

describe('LoggerInterceptor', () => {
  it('should be created', () => {
    const interceptor = loggerInterceptor;
    expect(interceptor).toBeTruthy();
  });
});
