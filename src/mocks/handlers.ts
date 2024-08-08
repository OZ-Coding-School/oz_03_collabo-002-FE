import { http, HttpResponse } from 'msw';
import classList from './data/classList.json';

export const handlers = [
  // Intercept "GET /user" requests
  http.get('/classlist', () => {
    return HttpResponse.json(classList);
  }),
];
