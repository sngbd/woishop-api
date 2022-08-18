const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('GET List Category', () => {
  test('There are 3 categories in total', async () => {
    const { body } = await api
      .get('/api/products/categories')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe("Categories found");
    expect(data).toHaveLength(3);
  })
});

describe('GET Single Product', () => {
  test('Product with id 3 is found', async () => {
    const { body } = await api
      .get('/api/products/3')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe("Product found");
    expect(data.id).toBe(3);
  });

  test('Product with id 6 is not found', async () => {
    const { body } = await api
      .get('/api/products/6')
      .expect(404);
    const { success, message, data } = body;

    expect(success).toBe(false);
    expect(message).toBe("Product not found");
    expect(data).toEqual({});
  });
});

describe('GET List Product by Category', () => {
  test('Category smartphones is found', async () => {
    const { body } = await api
      .get('/api/products/categories/smartphones')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe("Category found");
    expect(data.every(d => d.category === "smartphones")).toBe(true);
  });

  test('Category fashion is not found', async () => {
    const { body } = await api
      .get('/api/products/categories/fashion')
      .expect(404);
    const { success, message, data } = body;

    expect(success).toBe(false);
    expect(message).toBe("Category not found");
    expect(data).toEqual({});
  });
});

describe('GET List All Product', () => {
  test('Products are returned as json', async () => {
    await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('There are 5 products in total', async () => {
    const { body } = await api
      .get('/api/products')
      .expect(200);
    const { success, message, data } = body;

    expect(success).toBe(true);
    expect(message).toBe("Products found");
    expect(data).toHaveLength(5);
  });
});