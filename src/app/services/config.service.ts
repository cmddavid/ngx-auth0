import { Injectable, Optional } from '@angular/core';
import { Configuration } from '../interfaces/configuration';

//@Injectable()
export class ConfigService {
    constructor(@Optional() config: Configuration) {}
}
