const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('GET List Category', () => {
  test('There are 4 categories in total', async () => {
    const { body } = await api
      .get('/api/products/categories')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe('All categories found');
    expect(data).toHaveLength(4);
  });
});

describe('GET Single Product', () => {
  test('Product with id 3 is found', async () => {
    const id = 3;
    const { body } = await api
      .get(`/api/products/${id}`)
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe(`Product with id '${id}' found`);
    expect(data.id).toBe(3);
  });

  test('Product with id 11 is not found', async () => {
    const id = 11;
    const { body } = await api
      .get(`/api/products/${id}`)
      .expect(404);
    const { success, message, data } = body;

    expect(success).toBe(false);
    expect(message).toBe(`Product with id '${id}' not found`);
    expect(data).toEqual({});
  });
});

describe('GET List Product by Category', () => {
  test('Category smartphones is found', async () => {
    const category = 'smartphones';
    const { body } = await api
      .get(`/api/products/categories/${category}`)
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe(`Category '${category}' found`);
    expect(data.every((d) => d.category === 'smartphones')).toBe(true);
  });

  test('Category fashion is not found', async () => {
    const category = 'fashion';
    const { body } = await api
      .get(`/api/products/categories/${category}`)
      .expect(404);
    const { success, message, data } = body;

    expect(success).toBe(false);
    expect(message).toBe(`Category '${category}' not found`);
    expect(data).toEqual({});
  });
});

describe('GET List All Product', () => {
  test('Products are returned as json', async () => {
    await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('There are 5 products in total', async () => {
    const { body } = await api
      .get('/api/products')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe('All products found');
    expect(data).toHaveLength(10);
  });
});
