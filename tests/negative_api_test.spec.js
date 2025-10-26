// negative_api_test.spec.js
import { test, expect } from '@playwright/test';

test.describe('Reqres.in Users API - Negative Scenarios', () => {

    test('N001 - Unauthorized Access Sample: Page 12', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=12');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });

    test('N002 - Invalid Page Parameter (Alphabetic)', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=abc');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });

    test('N003 - Non-Existing Page Number', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=999');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });

    test('N004 - Unsupported Method (POST)', async ({ request }) => {
        const response = await request.post('https://reqres.in/api/users?page=2');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });

    test('N005 - Negative Page Number', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=-1');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });

    test('N006 - Malformed Query Parameter', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page==2');
        expect.soft(response.status(), 'Expected 401 Unauthorized').toBe(401);
    });
});