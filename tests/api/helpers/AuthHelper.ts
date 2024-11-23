import { APIRequestContext } from '@playwright/test';
import NodeRSA from 'node-rsa';

export class AuthHelper {
    private apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async encryptPass(password: string){
        const publicKey = `-----BEGIN PUBLIC KEY-----
            MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGlDIZx/inPdN0BPZFITp0d8z8mL
            9c2ptxTFz7rDi+K2GOSyk78KnN7OhDvlKeB/MO0g/uxzXMrqztAbs2aV68eGcpUl
            zdrXgMfNnYiMYwE6mz0pahLxib3qlQpngJpcxUQ4zTkfgRlnlSIYZrbOYwYasqgE
            PMGnAgf9ng2B5PbVAgMBAAE=
            -----END PUBLIC KEY-----`

        // Initialize NodeRSA instance
        const key: NodeRSA = new NodeRSA();

        // Import the public key
        key.importKey(publicKey, 'public');

        // Set encryption options to use RSA-only padding (PKCS1)
        key.setOptions({ encryptionScheme: 'pkcs1' });

        // Encrypt the message with the public key
        const encrypted: string = key.encrypt(password, 'base64');
        console.log('Encrypted Text:', encrypted);
        return encrypted
    }

    async login(email: string, password: string) {
        const encrypted = await this.encryptPass(password)
        const response = await this.apiContext.post('https://mitraku-dev-api-kong.on-premise.mitrais-dev.com/api/v1/users/login', {
            data: {
                email: email,
                password: encrypted
            }
        });
    
        const token = await response.json();
        return token.data.access_token
    }
}
