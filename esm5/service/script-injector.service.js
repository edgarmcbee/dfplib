/**
 * @fileoverview added by tsickle
 * Generated from: service/script-injector.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
var ScriptInjectorService = /** @class */ (function () {
    function ScriptInjectorService(httpError) {
        this.httpError = httpError;
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.completeURL = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.createScript = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    };
    /**
     * @private
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.promiseScript = /**
     * @private
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    function (script, url) {
        var _this = this;
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            script.onload = (/**
             * @return {?}
             */
            function () {
                resolve(script);
            });
            script.onerror = (/**
             * @return {?}
             */
            function () {
                reject({
                    path: url,
                    loaded: false
                });
            });
        }));
        promise.catch((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
        }));
        return promise;
    };
    /**
     * @param {?} script
     * @return {?}
     */
    ScriptInjectorService.prototype.injectScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        /** @type {?} */
        var head = document.head || document.querySelector('head');
        head.appendChild(script);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.scriptInjector = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    };
    ScriptInjectorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScriptInjectorService.ctorParameters = function () { return [
        { type: HttpErrorService }
    ]; };
    return ScriptInjectorService;
}());
export { ScriptInjectorService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScriptInjectorService.prototype.httpError;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFHRSwrQkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDOzs7Ozs7SUFFNUMsMkNBQVc7Ozs7O0lBQW5CLFVBQW9CLEdBQUc7O1lBQ2YsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVE7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBRU8sNENBQVk7Ozs7O0lBQXBCLFVBQXFCLEdBQUc7O1lBQ2hCLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUUvQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBRU8sNkNBQWE7Ozs7OztJQUFyQixVQUFzQixNQUFNLEVBQUUsR0FBRztRQUFqQyxpQkFrQkM7O1lBakJPLE9BQU8sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMxQyxNQUFNLENBQUMsTUFBTTs7O1lBQUc7Z0JBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQSxDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU87OztZQUFHO2dCQUNmLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxNQUFNLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU8sQ0FBQyxLQUFLOzs7O1FBQUMsVUFBQSxRQUFRO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLHNCQUFtQixHQUFHLE9BQUcsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsTUFBTTs7WUFDWCxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLEdBQUc7O1lBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDOztnQkFqREYsVUFBVTs7OztnQkFGRixnQkFBZ0I7O0lBcUR6Qiw0QkFBQztDQUFBLEFBbkRELElBbURDO1NBbERZLHFCQUFxQjs7Ozs7O0lBRXBCLDBDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vaHR0cC1lcnJvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcmlwdEluamVjdG9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwRXJyb3I6IEh0dHBFcnJvclNlcnZpY2UpIHsgfVxuXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XG4gICAgY29uc3Qgc3NsID0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgIHJldHVybiAoc3NsID8gJ2h0dHBzOicgOiAnaHR0cDonKSArIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NyaXB0KHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbXBsZXRlVVJMKHVybCk7XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBwYXRoOiB1cmwsXG4gICAgICAgICAgbG9hZGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBwcm9taXNlLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMuaHR0cEVycm9yLmh0dHBFcnJvcih7IHN0YXR1czogNDAwIH0sIGBsb2FkaW5nIHNjcmlwdCBcIiR7dXJsfVwiYCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluamVjdFNjcmlwdChzY3JpcHQpIHtcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG5cbiAgc2NyaXB0SW5qZWN0b3IodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5jcmVhdGVTY3JpcHQodXJsKTtcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xuICAgIHJldHVybiB0aGlzLnByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpO1xuICB9XG5cbn1cbiJdfQ==