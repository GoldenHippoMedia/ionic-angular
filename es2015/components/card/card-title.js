import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * @hidden
 */
export class CardTitle extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-title');
    }
}
CardTitle.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-title'
            },] },
];
/** @nocollapse */
CardTitle.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer2, },
];
//# sourceMappingURL=card-title.js.map