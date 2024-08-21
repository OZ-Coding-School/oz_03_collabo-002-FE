import { http, HttpResponse } from 'msw';
import classList from './data/classList.json';
import history from './data//payment_history.json';
import user from './data/user.json';
import reviews from './data/reviews.json';

export const handlers = [
  // Intercept "GET /user" requests
  http.get('/classlist', () => {
    return HttpResponse.json(classList);
  }),
  http.get('/reviews', () => {
    return HttpResponse.json(reviews);
  }),
  http.get('/api/v1/history', () => {
    return HttpResponse.json(history);
  }),
  http.get('/api/v1/user', () => {
    return HttpResponse.json(user);
  }),
];
