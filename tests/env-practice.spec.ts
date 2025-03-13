import test from "@playwright/test";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test('example test: env vars', async ({ page }) => {
    console.log(process.env.USER_NAME ?? 'default_username');
    console.log(process.env.PASSWORD ?? 'default_password');
});