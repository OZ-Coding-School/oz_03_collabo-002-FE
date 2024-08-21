import { http, HttpResponse } from 'msw';
import classList from './data/classList.json';
import reviews from './data/reviews.json';
import qna from './data/qna.json';

export const handlers = [
  // Intercept "GET /user" requests
  http.get('/classlist', () => {
    return HttpResponse.json(classList);
  }),
  http.get('/reviews', () => {
    return HttpResponse.json(reviews);
  }),
  http.get(`/api/v1/question/:id`, () => {
    return HttpResponse.json(qna);
  }),
];
