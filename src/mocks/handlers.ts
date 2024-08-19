import { http, HttpResponse } from 'msw';
import classList from './data/classList.json';
import history from './data//payment_history.json';
import user from './data/user.json';

export const handlers = [
  // Intercept "GET /user" requests
  http.get('/classlist', () => {
    return HttpResponse.json(classList);
  }),
  http.get('/api/v1/history', () => {
    return HttpResponse.json(history);
  }),
  http.get('/api/v1/user', () => {
    return HttpResponse.json(user);
  }),
];
