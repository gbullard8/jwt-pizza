import { test, expect } from 'playwright-test-coverage';


test('home page', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toBe('JWT Pizza');
});

test('buy pizza with login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Order now' }).click();
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('1');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await page.getByRole('button', { name: 'Pay now' }).click();
    await expect(page.getByRole('main')).toContainText('0.008 ₿');
});
test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
            { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
            { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const franchiseRes = [
            {
                id: 2,
                name: 'LotaPizza',
                stores: [
                    { id: 4, name: 'Lehi' },
                    { id: 5, name: 'Springville' },
                    { id: 6, name: 'American Fork' },
                ],
            },
            { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
    });

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        const orderReq = {
            items: [
                { menuId: 1, description: 'Veggie', price: 0.0038 },
                { menuId: 2, description: 'Pepperoni', price: 0.0042 },
            ],
            storeId: '4',
            franchiseId: 2,
        };
        const orderRes = {
            order: {
                items: [
                    { menuId: 1, description: 'Veggie', price: 0.0038 },
                    { menuId: 2, description: 'Pepperoni', price: 0.0042 },
                ],
                storeId: '4',
                franchiseId: 2,
                id: 23,
            },
            jwt: 'eyJpYXQ',
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(orderReq);
        await route.fulfill({ json: orderRes });
    });

    await page.goto('/');

    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();

    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();

    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();
});

test.describe('About Page Tests', () => {


    test('should render the main image', async ({ page }) => {
        await page.goto('/about');
        const mainImage = page.locator("img[src='jwt-pizza-logo.png']");
        await expect(mainImage).toBeVisible();
    });

    test('should render all employee images with tooltips', async ({ page }) => {
        await page.goto('/about');

        const employees = [
            { name: 'James', src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80' },
            { name: 'Maria', src: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80' },
            { name: 'Anna', src: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80' },
            { name: 'Brian', src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80' },
        ];

        for (const employee of employees) {
            const employeeImage = page.locator(`img[src='${employee.src}']`);
            await expect(employeeImage).toBeVisible();

            await employeeImage.hover();
            const tooltip = page.locator(`text=${employee.name}`);
            await expect(tooltip).toBeVisible();
        }
    });

    test('should display correct section headings', async ({ page }) => {
        await page.goto('/about');
        const heading = page.locator('h2', { hasText: 'Our employees' });
        await expect(heading).toBeVisible();
    });

    test('should have correct paragraphs text', async ({ page }) => {
        await page.goto('/about');

        const paragraphTexts = [
            'At JWT Pizza, our amazing employees are the secret behind our delicious pizzas.',
            'Our talented employees at JWT Pizza are true artisans.',
            'JWT Pizza is home to a team of pizza enthusiasts who are truly passionate about their craft.',
            'At JWT Pizza, our employees are more than just pizza makers. They are culinary artists who are deeply passionate about their craft.',
        ];

        for (const text of paragraphTexts) {
            const paragraph = page.locator(`text=${text}`);
            await expect(paragraph).toBeVisible();
        }
    });
});

