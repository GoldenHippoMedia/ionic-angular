import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Tab } from './tab';
/**
 * @hidden
 */
export declare class TabButton extends Ion implements OnInit {
    disHover: boolean;
    hasTitle: boolean;
    hasIcon: boolean;
    hasTitleOnly: boolean;
    hasIconOnly: boolean;
    hasBadge: boolean;
    layout: string;
    tab: Tab;
    ionSelect: EventEmitter<Tab>;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(): boolean;
    updateHref(href: string): void;
}
