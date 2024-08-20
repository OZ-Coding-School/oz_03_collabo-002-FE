import { http, HttpResponse } from 'msw';
import classList from './data/classList.json';
import reviews from './data/reviews.json';

export const handlers = [
  // Intercept "GET /user" requests
  http.get('/classlist', () => {
    return HttpResponse.json(classList);
  }),
  http.get('/reviews', () => {
    return HttpResponse.json(reviews);
  }),
];
