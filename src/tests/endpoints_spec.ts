import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the movies endpoint', async () => {
    request.get('/movies').expect(200);
  });
  it('gets the users-list endpoint', async () => {
    request.get('/users-list').expect(200);
  });
  it('gets the users endpoint', async () => {
    request.get('/users').expect(200);
  });
  it('posts the users endpoint', async () => {
    request.post('/movies').expect(200);
  });

  it('posts the users endpoint', async () => {
    request.post('/users').expect(200);
  });
  it('posts the users-list endpoint', async () => {
    request.post('/users-list').expect(200);
  });
});
