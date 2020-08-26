/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DFP_CONFIG } from './injection_token';
import { DfpConfig } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export var GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
var DFPConfigurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPConfigurationError, _super);
    function DFPConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPConfigurationError;
}(Error));
var DfpService = /** @class */ (function () {
    function DfpService(platformId, idleLoad, config, scriptInjector) {
        var _this = this;
        this.platformId = platformId;
        this.config = config;
        this.scriptInjector = scriptInjector;
        this.enableVideoAds = false;
        this.personalizedAds = true;
        this.collapseIfEmpty = true;
        this.centering = false;
        this.location = null;
        this.ppid = null;
        this.globalTargeting = null;
        this.forceSafeFrame = false;
        this.safeFrameConfig = null;
        this.loadGPT = true;
        this.loaded = false;
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var win = window;
            /** @type {?} */
            var googletag = win.googletag || {};
            this.dfpConfig();
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push((/**
             * @return {?}
             */
            function () {
                _this.setup();
            }));
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                var loadScript = (/**
                 * @return {?}
                 */
                function () {
                    _this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((/**
                     * @param {?} script
                     * @return {?}
                     */
                    function (script) {
                        _this.loaded = true;
                    })).catch((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { }));
                });
                if (idleLoad) {
                    idleLoad.request(loadScript);
                }
                else {
                    loadScript();
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    DfpService.prototype.dfpConfig = /**
     * @private
     * @return {?}
     */
    function () {
        for (var key in this.config) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.config[key];
            }
        }
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addSafeFrameConfig = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.safeFrameConfig) {
            return false;
        }
        if (typeof this.safeFrameConfig !== 'object') {
            throw new DFPConfigurationError('FrameConfig must be an object');
        }
        pubads.setSafeFrameConfig(this.safeFrameConfig);
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addTargeting = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.globalTargeting) {
            return false;
        }
        if (typeof this.globalTargeting !== 'object') {
            throw new DFPConfigurationError('Targeting must be an object');
        }
        for (var key in this.globalTargeting) {
            if (this.globalTargeting.hasOwnProperty(key)) {
                pubads.setTargeting(key, this.globalTargeting[key]);
            }
        }
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addLocation = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.location) {
            return false;
        }
        if (typeof this.location === 'string') {
            pubads.setLocation(this.location);
            return;
        }
        if (!Array.isArray(this.location)) {
            throw new DFPConfigurationError('Location must be an ' +
                'array or string');
        }
        pubads.setLocation.apply(pubads, this.location);
    };
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    DfpService.prototype.addPPID = /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    function (pubads) {
        if (!this.ppid) {
            return false;
        }
        if (typeof this.ppid !== 'string') {
            throw new DFPConfigurationError('PPID must be a string');
        }
        pubads.setPublisherProvidedId(this.ppid);
    };
    /**
     * @private
     * @return {?}
     */
    DfpService.prototype.setup = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var win = window;
        /** @type {?} */
        var googletag = win.googletag;
        /** @type {?} */
        var pubads = googletag.pubads();
        if (this.enableVideoAds) {
            pubads.enableVideoAds();
        }
        // personalizedAds is default
        if (this.personalizedAds === false) {
            pubads.setRequestNonPersonalizedAds(1);
        }
        if (this.collapseIfEmpty) {
            pubads.collapseEmptyDivs();
        }
        // We always refresh ourselves
        pubads.disableInitialLoad();
        pubads.setForceSafeFrame(this.forceSafeFrame);
        pubads.setCentering(this.centering);
        this.addLocation(pubads);
        this.addPPID(pubads);
        this.addTargeting(pubads);
        this.addSafeFrameConfig(pubads);
        // pubads.enableSyncRendering();
        pubads.enableAsyncRendering();
        if (this.config.singleRequestMode !== true) {
            if (this.config.enableVideoAds) {
                pubads.enableVideoAds();
            }
            googletag.enableServices();
        }
    };
    /**
     * @return {?}
     */
    DfpService.prototype.hasLoaded = /**
     * @return {?}
     */
    function () {
        return this.loaded;
    };
    /**
     * @param {?} task
     * @return {?}
     */
    DfpService.prototype.defineTask = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var win = window;
            /** @type {?} */
            var googletag = win.googletag;
            googletag.cmd.push(task);
        }
    };
    DfpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DfpService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: IdleService, decorators: [{ type: Optional }] },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: ScriptInjectorService }
    ]; };
    return DfpService;
}());
export { DfpService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.enableVideoAds;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.personalizedAds;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.collapseIfEmpty;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.centering;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.location;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.ppid;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.globalTargeting;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.forceSafeFrame;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.safeFrameConfig;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.loadGPT;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DfpService.prototype.scriptInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbEUsTUFBTSxLQUFPLGVBQWUsR0FBRywyQ0FBMkM7QUFFMUU7SUFBb0MsaURBQUs7SUFBekM7O0lBQTRDLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFBN0MsQ0FBb0MsS0FBSyxHQUFJO0FBRTdDO0lBeUJFLG9CQUMrQixVQUFrQixFQUNuQyxRQUFxQixFQUNMLE1BQWlCLEVBQ3JDLGNBQXFDO1FBSi9DLGlCQStCQztRQTlCOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUVuQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQTFCdkMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztR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QUFyS0QsSUFxS0M7U0FwS1ksVUFBVTs7Ozs7O0lBRXJCLG9DQUErQjs7Ozs7SUFFL0IscUNBQStCOzs7OztJQUUvQixxQ0FBK0I7Ozs7O0lBRS9CLCtCQUEwQjs7Ozs7SUFFMUIsOEJBQXdCOzs7OztJQUV4QiwwQkFBb0I7Ozs7O0lBRXBCLHFDQUErQjs7Ozs7SUFFL0Isb0NBQStCOzs7OztJQUUvQixxQ0FBK0I7Ozs7O0lBRS9CLDZCQUF1Qjs7Ozs7SUFFdkIsNEJBQXVCOzs7OztJQUdyQixnQ0FBK0M7Ozs7O0lBRS9DLDRCQUE2Qzs7Ozs7SUFDN0Msb0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KS5jYXRjaChlPT57fSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpZGxlTG9hZCkge1xuICAgICAgICAgIGlkbGVMb2FkLnJlcXVlc3QobG9hZFNjcmlwdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZFNjcmlwdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZnBDb25maWcoKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpc1trZXldID0gdGhpcy5jb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMuc2FmZUZyYW1lQ29uZmlnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zYWZlRnJhbWVDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdGcmFtZUNvbmZpZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBwdWJhZHMuc2V0U2FmZUZyYW1lQ29uZmlnKHRoaXMuc2FmZUZyYW1lQ29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0aW5nKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbFRhcmdldGluZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1RhcmdldGluZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7XG4gICAgICBpZiAodGhpcy5nbG9iYWxUYXJnZXRpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBwdWJhZHMuc2V0VGFyZ2V0aW5nKGtleSwgdGhpcy5nbG9iYWxUYXJnZXRpbmdba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2NhdGlvbihwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMubG9jYXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMubG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBwdWJhZHMuc2V0TG9jYXRpb24odGhpcy5sb2NhdGlvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubG9jYXRpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdMb2NhdGlvbiBtdXN0IGJlIGFuICcgK1xuICAgICAgICAnYXJyYXkgb3Igc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcHViYWRzLnNldExvY2F0aW9uLmFwcGx5KHB1YmFkcywgdGhpcy5sb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFkZFBQSUQocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLnBwaWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBwaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdQUElEIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0UHVibGlzaGVyUHJvdmlkZWRJZCh0aGlzLnBwaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cCgpIHtcbiAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcsXG4gICAgICBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgfVxuXG4gICAgLy8gcGVyc29uYWxpemVkQWRzIGlzIGRlZmF1bHRcbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICBwdWJhZHMuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2xsYXBzZUlmRW1wdHkpIHtcbiAgICAgIHB1YmFkcy5jb2xsYXBzZUVtcHR5RGl2cygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFsd2F5cyByZWZyZXNoIG91cnNlbHZlc1xuICAgIHB1YmFkcy5kaXNhYmxlSW5pdGlhbExvYWQoKTtcblxuICAgIHB1YmFkcy5zZXRGb3JjZVNhZmVGcmFtZSh0aGlzLmZvcmNlU2FmZUZyYW1lKTtcbiAgICBwdWJhZHMuc2V0Q2VudGVyaW5nKHRoaXMuY2VudGVyaW5nKTtcblxuICAgIHRoaXMuYWRkTG9jYXRpb24ocHViYWRzKTtcbiAgICB0aGlzLmFkZFBQSUQocHViYWRzKTtcbiAgICB0aGlzLmFkZFRhcmdldGluZyhwdWJhZHMpO1xuICAgIHRoaXMuYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcyk7XG5cbiAgICAvLyBwdWJhZHMuZW5hYmxlU3luY1JlbmRlcmluZygpO1xuICAgIHB1YmFkcy5lbmFibGVBc3luY1JlbmRlcmluZygpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlICE9PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgICB9XG4gICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGhhc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gIH1cblxuICBkZWZpbmVUYXNrKHRhc2spIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWc7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2godGFzayk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==