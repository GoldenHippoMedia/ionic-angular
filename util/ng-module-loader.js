import { Compiler, Injectable } from '@angular/core';
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 */
var NgModuleLoader = (function () {
    function NgModuleLoader(_compiler) {
        this._compiler = _compiler;
    }
    NgModuleLoader.prototype.load = function (loadPromise) {
        var offlineMode = this._compiler instanceof Compiler;
        return offlineMode ? loadPrecompiledFactory(loadPromise) : loadAndCompile(this._compiler, loadPromise);
    };
    NgModuleLoader.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgModuleLoader.ctorParameters = function () { return [
        { type: Compiler, },
    ]; };
    return NgModuleLoader;
}());
export { NgModuleLoader };
function loadAndCompile(compiler, loadPromise) {
    return loadPromise()
        .then(mod => compiler.compileModuleAsync(mod));
}
function loadPrecompiledFactory(loadPromise) {
    return loadPromise();
}
//# sourceMappingURL=ng-module-loader.js.map