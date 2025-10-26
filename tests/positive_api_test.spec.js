// positive_api_test.spec.js
const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);
const baseUrl = 'https://reqres.in/api/users';

// JSON Schema for the full response
const responseSchema = {
  type: "object",
  required: ["page", "per_page", "total", "total_pages", "data", "support"],
  // note to self: meta is an optional field, common in any other API
  properties: {
    page: { type: "number" },
    per_page: { type: "number" },
    total: { type: "number" },
    total_pages: { type: "number" },
    data: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "email", "first_name", "last_name", "avatar"],
        properties: {
          id: { type: "number" },
          email: { type: "string", format: "email" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          avatar: { type: "string" }
        }
      }
    },
    support: {
      type: "object",
      required: ["url", "text"],
      properties: {
        url: { type: "string" },
        text: { type: "string" }
      }
    }
  }
};

test.describe('Reqres.in Users API - Positive Scenarios with Schema Validation', () => {

  // P001 & P002 – Valid Page Parameter (page=1 and page=2)
  [1, 2].forEach(page => {
    test(`P00${page} - Valid Page Parameter (page=${page})`, async ({ request }) => {
      const response = await request.get(`${baseUrl}?page=${page}`);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.page).toBe(page);
      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.data.length).toBeGreaterThan(0);

      // Validate structure using AJV
      const validate = ajv.compile(responseSchema);
      const valid = validate(body);
      expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
    });
  });

  // P003 – Default Page When Parameter Absent
  test('P003 - Default Page When Parameter Absent', async ({ request }) => {
    const response = await request.get(baseUrl);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(1);

    const validate = ajv.compile(responseSchema);
    const valid = validate(body);
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
  });

  // P004 – Response Structure Validation
  test('P004 - Response Structure Validation', async ({ request }) => {
    const response = await request.get(`${baseUrl}?page=2`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    const validate = ajv.compile(responseSchema);
    const valid = validate(body);
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
  });

  // P005 – User Object Field Validation
  test('P005 - User Object Field Validation', async ({ request }) => {
    const response = await request.get(`${baseUrl}?page=2`);
    const body = await response.json();

    body.data.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(user).toHaveProperty('avatar');
    });

    // Validate each object structure with AJV
    const validate = ajv.compile(responseSchema.properties.data);
    const valid = validate(body.data);
    expect(valid, JSON.stringify(validate.errors)).toBeTruthy();
  });

  // P006 – Header Validation
  test('P006 - Header Validation', async ({ request }) => {
    const response = await request.get(`${baseUrl}?page=2`);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  // P007 – Response Time Validation
  test('P007 - Response Time Validation', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${baseUrl}?page=2`);
    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000); // < 2 seconds
  });

});


