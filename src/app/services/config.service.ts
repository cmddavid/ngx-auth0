import { Optional } from '@angular/core';
import { Configuration } from '../interfaces/configuration';

//@Injectable()
export class ConfigService {
    proxyUrl: string;
    constructor(@Optional() config: Configuration) {}
}
