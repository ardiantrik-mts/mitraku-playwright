import { test, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AuthHelper } from '../helpers/authHelper';
import { testData } from '../../utils/testData';

let apiContext
let token
const userId = testData.usersCollection.validUser.userId

test.beforeEach(async ({ playwright }) => {
    let authHelper: AuthHelper

    apiContext = await playwright.request.newContext({
        baseURL: 'https://mitraku-dev-api-kong.on-premise.mitrais-dev.com'
    })

    authHelper = new AuthHelper(apiContext)
    token = await authHelper.login(testData.usersCollection.validUser.email, testData.usersCollection.validUser.password)
});

test.afterEach(async () => {
    await apiContext.dispose()
});

test.describe('User Service Tests', () => {
    let authHelper: AuthHelper

    test('POST - Register User (Merchant)', async ({ playwright }) => {
        const password = "Qwe123!@#"

        authHelper = new AuthHelper(apiContext)
        const encryptedPass = await authHelper.encryptPass(password)

        const response = await apiContext.post('/api/v1/users/register',{
            data: {
                "email": faker.internet.username()+"@yopmail.com",
                "name": faker.person.fullName(),
                "password": encryptedPass,
                "phone_number": "628"+faker.number.int({ max: 99999 })+faker.number.int({ max: 999999 }),
                "is_agree_term_condition": true,
                "address": "",
                "role_id": [
                    "1",
                    "2"
                ]

            }
        })

        expect(response.status()).toBe(200)
    });

    test('GET - Show Profile', async ({ playwright }) => {
        const response = await apiContext.get('/api/v1/users/'+userId,{
            headers: {
                'Authorization': 'Bearer '+token,
              },
        })
        expect(response.status()).toBe(200)
    });

    test('PUT - Show Profile', async ({ playwright }) => {
        const response = await apiContext.put('/api/v1/users/'+userId,{
            headers: {
                'Authorization': 'Bearer '+token,
              },
            data: {
                "address": faker.location.streetAddress({ useFullAddress: true }),
                "name": faker.person.fullName(),
                "phoneNumber": "628"+faker.number.int({ max: 99999 })+faker.number.int({ max: 999999 })
            }
        })
        expect(response.status()).toBe(200)
    });
  });