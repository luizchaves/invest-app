import request from 'supertest';
import server from './index.js';

let createdInvestment;

describe('Invest App', () => {
  describe('Investment Endpoints', () => {
    describe('POST /api/investments', () => {
      it('should create a new investment', async () => {
        const response = await request(server).post('/api/investments').send({
          name: 'Tesouro Selic 2029',
          value: 20000,
        });

        createdInvestment = response.body;

        expect(response.statusCode).toBe(201);
      });

      it('should not create a new investment without name or value', async () => {
        let response = await request(server).post('/api/investments').send({
          name: 'Tesouro Selic 2029',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Error when passing parameters');

        response = await request(server).post('/api/investments').send();

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Error when passing parameters');
      });
    });

    describe('GET /api/investments', () => {
      it('should show all investments', async () => {
        const response = await request(server).get('/api/investments');

        expect(response.statusCode).toBe(200);
      });

      it('should list the valid investment', async () => {
        const response = await request(server).get('/api/investments');

        const hasValidInvestment = response.body.some(
          (investment) => investment.name === createdInvestment.name
        );

        expect(hasValidInvestment).toBeTruthy();
      });

      it('should show all investments by name', async () => {
        const response = await request(server).get(
          '/api/investments?name=Selic'
        );

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /api/investments/:investmentId', () => {
      it('should show a investment by id', async () => {
        const response = await request(server).get(
          `/api/investments/${createdInvestment.id}`
        );

        expect(response.statusCode).toBe(200);

        expect(response.body.name).toBe(createdInvestment.name);
      });

      it('should not show a investment with invalid id', async () => {
        const response = await request(server).get(`/api/investments/a`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message).toBe('Investment not found');
      });
    });

    describe('PUT /api/investments/:investmentId', () => {
      const updatedInvestment = {
        name: 'Tesouro Selic 2029',
        value: 25000,
      };

      it('should update a investment', async () => {
        const response = await request(server)
          .put(`/api/investments/${createdInvestment.id}`)
          .send(updatedInvestment);

        expect(response.statusCode).toBe(200);
      });

      it('should list an updated investment', async () => {
        const response = await request(server).get('/api/investments');

        const hasValidInvestment = response.body.some(
          (investment) => investment.address === updatedInvestment.address
        );

        expect(hasValidInvestment).toBeTruthy();
      });

      it('should not update a investment without name or address', async () => {
        const response = await request(server)
          .put(`/api/investments/${createdInvestment.id}`)
          .send({
            name: 'Tesouro Selic 2029',
          });

        expect(response.statusCode).toBe(400);
      });

      it('should not update a investment with invalid id', async () => {
        const response = await request(server)
          .put(`/api/investments/a`)
          .send(updatedInvestment);

        expect(response.statusCode).toBe(404);

        expect(response.body.message).toBe('Investment not found');
      });
    });

    describe('DELETE /api/investments/:investmentId', () => {
      it('should remove a investment', async () => {
        const response = await request(server).delete(
          `/api/investments/${createdInvestment.id}`
        );

        expect(response.statusCode).toBe(204);
      });

      it('should not delete a investment with invalid id', async () => {
        const response = await request(server).delete(`/api/investments/a`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message).toBe('Investment not found');
      });
    });
  });
});
