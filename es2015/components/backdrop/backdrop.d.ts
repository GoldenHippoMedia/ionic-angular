import { ElementRef, Renderer2 } from '@angular/core';
/**
 * @hidden
 */
export declare class Backdrop {
    private _elementRef;
    private _renderer;
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    getNativeElement(): HTMLElement;
    setElementClass(className: string, add: boolean): void;
}
