import { RefreshInterceptor } from './refresh.interceptor';
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const refreshInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshInterceptor,
  multi: true,
};
