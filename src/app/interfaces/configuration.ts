import { WebAuthConfig } from './web-auth-config';

export interface Configuration {
    WebAuthConfig: WebAuthConfig;
    connection: string;
    proxyUrl?: string;
}
