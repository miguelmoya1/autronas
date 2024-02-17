import { headersInterceptor } from './headers.interceptor';

describe('HeadersInterceptor', () => {
  it('should be created', () => {
    const interceptor = headersInterceptor;
    expect(interceptor).toBeTruthy();
  });
});
