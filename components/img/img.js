import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, Renderer, ViewEncapsulation } from '@angular/core';
import { Content } from '../content/content';
import { DomController } from '../../platform/dom-controller';
import { isPresent, isTrueProperty } from '../../util/util';
import { Platform } from '../../platform/platform';
/**
 * @name Img
 * @description
 * Two of the biggest cuprits of scroll jank is starting up a new HTTP
 * request, and rendering images. These two reasons is largely why
 * `ion-img` was created. The standard HTML `img` element is often a large
 * source of these problems, and what makes matters worse is that the app
 * does not have fine-grained control of requests and rendering for each
 * `img` element.
 *
 * The `ion-img` component is similar to the standard `img` element,
 * but it also adds features in order to provide improved performance.
 * Features include only loading images which are visible, using web workers
 * for HTTP requests, preventing jank while scrolling and in-memory caching.
 *
 * Note that `ion-img` also comes with a few more restrictions in comparison
 * to the standard `img` element. A good rule is, if there are only a few
 * images to be rendered on a page, then the standard `img` is probably
 * best. However, if a page has the potential for hundreds or even thousands
 * of images within a scrollable area, then `ion-img` would be better suited
 * for the job.
 *
 * > Note: `ion-img` is only meant to be used inside of [virtual-scroll](/docs/api/components/virtual-scroll/VirtualScroll/)
 *
 *
 * ### Lazy Loading
 *
 * Lazy loading images refers to only loading images which are actually
 * visible within the user's viewport. This also means that images which are
 * not viewable on the initial load would not be downloaded or rendered. Next,
 * as the user scrolls, each image which becomes visible is then requested
 * then rendered on-demand.
 *
 * The benefits of this approach is that unnecessary and resource intensive
 * HTTP requests are not started, valuable bandwidth isn't wasted, and this
 * allows the browser to free up resources which would be wasted on images
 * which are not even viewable. For example, animated GIFs are enourmous
 * performance drains, however, with `ion-img` the app is able to dedicate
 * resources to just the viewable images. But again, if the problems listed
 * above are not problems within your app, then the standard `img` element
 * may be best.
 *
 *
 * ### Image Dimensions
 *
 * By providing image dimensions up front, Ionic is able to accurately size
 * up the image's location within the viewport, which helps lazy load only
 * images which are viewable. Image dimensions can either by set as
 * properties, inline styles, or external stylesheets. It doesn't matter
 * which method of setting dimensions is used, but it's important that somehow
 * each `ion-img` has been given an exact size.
 *
 * For example, by default `<ion-avatar>` and `<ion-thumbnail>` already come
 * with exact sizes when placed within an `<ion-item>`. By giving each image
 * an exact size, this then further locks in the size of each `ion-item`,
 * which again helps improve scroll performance.
 *
 * ```html
 * <!-- dimensions set using attributes -->
 * <ion-img width="80" height="80" src="..."></ion-img>
 *
 * <!-- dimensions set using input properties -->
 * <ion-img [width]="imgWidth" [height]="imgHeight" src="..."></ion-img>
 *
 * <!-- dimensions set using inline styles -->
 * <ion-img style="width: 80px; height: 80px;" src="..."></ion-img>
 * ```
 *
 * Additionally, each `ion-img` uses the `object-fit: cover` CSS property.
 * What this means is that the actual rendered image will center itself within
 * it's container. Or to really get detailed: The image is sized to maintain
 * its aspect ratio while filling the containing element???s entire content box.
 * Its concrete object size is resolved as a cover constraint against the
 * element???s used width and height.
 *
 * ### Future Optimizations
 *
 * Future goals are to place image requests within web workers, and cache
 * images in-memory as datauris. This method has proven to be effective,
 * however there are some current limitations with Cordova which we are
 * currently working on.
 *
 */
var Img = (function () {
    function Img(_elementRef, _renderer, _plt, _content, _dom) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._plt = _plt;
        this._content = _content;
        this._dom = _dom;
        /** @internal */
        this._cache = true;
        /** @internal */
        this._w = '';
        /** @internal */
        this._h = '';
        /** @internal */
        this._wQ = '';
        /** @internal */
        this._hQ = '';
        /**
         * @input {string}  Set the `alt` attribute which gets assigned to
         * the inner `img` element.
         */
        this.alt = '';
        if (!this._content) {
            console.warn("ion-img can only be used within an ion-content");
        }
        else {
            this._content.addImg(this);
        }
        this._isLoaded(false);
    }
    Object.defineProperty(Img.prototype, "src", {
        /**
         * @input {string} The source of the image.
         */
        get: function () {
            return this._src;
        },
        set: function (newSrc) {
            // if the source hasn't changed, then um, let's not change it
            if (newSrc !== this._src) {
                // we're changing the source
                // so abort any active http requests
                // and render the image empty
                this.reset();
                // update to the new src
                this._src = newSrc;
                // Are they using an actual datauri already,
                // or reset any existing datauri we might be holding onto
                this._hasLoaded = newSrc.indexOf('data:') === 0;
                // run update to kick off requests or render if everything is good
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    Img.prototype.reset = function () {
        if (this._requestingSrc) {
            // abort any active requests
            (void 0) /* console.debug */;
            this._srcAttr('');
            this._requestingSrc = null;
        }
        if (this._renderedSrc) {
            // clear out the currently rendered img
            (void 0) /* console.debug */;
            this._renderedSrc = null;
            this._isLoaded(false);
        }
    };
    /**
     * @hidden
     */
    Img.prototype.update = function () {
        var _this = this;
        // only attempt an update if there is an active src
        // and the content containing the image considers it updatable
        if (this._src && this._content.isImgsUpdatable()) {
            if (this.canRequest && (this._src !== this._renderedSrc && this._src !== this._requestingSrc) && !this._hasLoaded) {
                // only begin the request if we "can" request
                // begin the image request if the src is different from the rendered src
                // and if we don't already has a tmpDataUri
                (void 0) /* console.debug */;
                this._requestingSrc = this._src;
                this._isLoaded(false);
                this._srcAttr(this._src);
                // set the dimensions of the image if we do have different data
                this._setDims();
            }
            if (this.canRender && this._hasLoaded && this._src !== this._renderedSrc) {
                // we can render and we have a datauri to render
                this._renderedSrc = this._src;
                this._setDims();
                this._dom.write(function () {
                    if (_this._hasLoaded) {
                        (void 0) /* console.debug */;
                        _this._isLoaded(true);
                        _this._srcAttr(_this._src);
                    }
                });
            }
        }
    };
    /**
     * @internal
     */
    Img.prototype._isLoaded = function (isLoaded) {
        var renderer = this._renderer;
        var ele = this._elementRef.nativeElement;
        renderer.setElementClass(ele, 'img-loaded', isLoaded);
        renderer.setElementClass(ele, 'img-unloaded', !isLoaded);
    };
    /**
     * @internal
     */
    Img.prototype._srcAttr = function (srcAttr) {
        var imgEle = this._img;
        var renderer = this._renderer;
        if (imgEle && imgEle.src !== srcAttr) {
            renderer.setElementAttribute(this._img, 'src', srcAttr);
            renderer.setElementAttribute(this._img, 'alt', this.alt);
        }
    };
    Object.defineProperty(Img.prototype, "top", {
        /**
         * @hidden
         */
        get: function () {
            var bounds = this._getBounds();
            return bounds && bounds.top || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img.prototype, "bottom", {
        /**
         * @hidden
         */
        get: function () {
            var bounds = this._getBounds();
            return bounds && bounds.bottom || 0;
        },
        enumerable: true,
        configurable: true
    });
    Img.prototype._getBounds = function () {
        if (this._bounds) {
            // we've been manually passed bounds data
            // this is probably from Virtual Scroll items
            return this._bounds;
        }
        if (!this._rect) {
            // we don't have bounds from virtual scroll
            // so let's do the raw DOM lookup w/ getBoundingClientRect
            this._rect = this._elementRef.nativeElement.getBoundingClientRect();
            (void 0) /* console.debug */;
        }
        return this._rect;
    };
    Object.defineProperty(Img.prototype, "bounds", {
        /**
         * @input {any}  Sets the bounding rectangle of the element relative to the viewport.
         * When using `VirtualScroll`, each virtual item should pass its bounds to each
         * `ion-img`. The passed in data object should include `top` and `bottom` properties.
         */
        set: function (b) {
            if (isPresent(b)) {
                this._bounds = b;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img.prototype, "cache", {
        /**
         * @input {boolean}  After an image has been successfully downloaded, it can be cached
         * in-memory. This is useful for `VirtualScroll` by allowing image responses to be
         * cached, and not rendered, until after scrolling has completed, which allows for
         * smoother scrolling.
         */
        get: function () {
            return this._cache;
        },
        set: function (val) {
            this._cache = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img.prototype, "width", {
        /**
         * @input {string}  Image width. If this property is not set it's important that
         * the dimensions are still set using CSS. If the dimension is just a number it
         * will assume the `px` unit.
         */
        set: function (val) {
            this._wQ = getUnitValue(val);
            this._setDims();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Img.prototype, "height", {
        /**
         * @input {string}  Image height. If this property is not set it's important that
         * the dimensions are still set using CSS. If the dimension is just a number it
         * will assume the `px` unit.
         */
        set: function (val) {
            this._hQ = getUnitValue(val);
            this._setDims();
        },
        enumerable: true,
        configurable: true
    });
    Img.prototype._setDims = function () {
        var _this = this;
        // only set the dimensions if we can render
        // and only if the dimensions have changed from when we last set it
        if (this.canRender && (this._w !== this._wQ || this._h !== this._hQ)) {
            var wrapperEle = this._elementRef.nativeElement;
            var renderer = this._renderer;
            this._dom.write(function () {
                if (_this._w !== _this._wQ) {
                    _this._w = _this._wQ;
                    renderer.setElementStyle(wrapperEle, 'width', _this._w);
                }
                if (_this._h !== _this._hQ) {
                    _this._h = _this._hQ;
                    renderer.setElementStyle(wrapperEle, 'height', _this._h);
                }
            });
        }
    };
    /**
     * @hidden
     */
    Img.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._img = this._elementRef.nativeElement.firstChild;
        this._unreg = this._plt.registerListener(this._img, 'load', function () {
            _this._hasLoaded = true;
            _this.update();
        }, { passive: true });
    };
    /**
     * @hidden
     */
    Img.prototype.ngOnDestroy = function () {
        this._unreg && this._unreg();
        this._content && this._content.removeImg(this);
    };
    Img.decorators = [
        { type: Component, args: [{
                    selector: 'ion-img',
                    template: '<img>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    Img.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
        { type: Platform, },
        { type: Content, decorators: [{ type: Optional },] },
        { type: DomController, },
    ]; };
    Img.propDecorators = {
        'src': [{ type: Input },],
        'bounds': [{ type: Input },],
        'cache': [{ type: Input },],
        'width': [{ type: Input },],
        'height': [{ type: Input },],
        'alt': [{ type: Input },],
    };
    return Img;
}());
export { Img };
function getUnitValue(val) {
    if (isPresent(val)) {
        if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
                return val;
            }
            if (val.length) {
                return val + 'px';
            }
        }
        else if (typeof val === 'number') {
            return val + 'px';
        }
    }
    return '';
}
//# sourceMappingURL=img.js.map