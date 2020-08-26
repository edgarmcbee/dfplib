/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DFP_CONFIG } from './injection_token';
import { DfpConfig } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
export class DfpService {
    /**
     * @param {?} platformId
     * @param {?} idleLoad
     * @param {?} config
     * @param {?} scriptInjector
     */
    constructor(platformId, idleLoad, config, scriptInjector) {
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
            const win = window;
            /** @type {?} */
            const googletag = win.googletag || {};
            this.dfpConfig();
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push((/**
             * @return {?}
             */
            () => {
                this.setup();
            }));
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                const loadScript = (/**
                 * @return {?}
                 */
                () => {
                    this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((/**
                     * @param {?} script
                     * @return {?}
                     */
                    (script) => {
                        this.loaded = true;
                    })).catch((/**
                     * @param {?} e
                     * @return {?}
                     */
                    e => { }));
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
    dfpConfig() {
        for (const key in this.config) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.config[key];
            }
        }
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addSafeFrameConfig(pubads) {
        if (!this.safeFrameConfig) {
            return false;
        }
        if (typeof this.safeFrameConfig !== 'object') {
            throw new DFPConfigurationError('FrameConfig must be an object');
        }
        pubads.setSafeFrameConfig(this.safeFrameConfig);
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addTargeting(pubads) {
        if (!this.globalTargeting) {
            return false;
        }
        if (typeof this.globalTargeting !== 'object') {
            throw new DFPConfigurationError('Targeting must be an object');
        }
        for (const key in this.globalTargeting) {
            if (this.globalTargeting.hasOwnProperty(key)) {
                pubads.setTargeting(key, this.globalTargeting[key]);
            }
        }
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addLocation(pubads) {
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
    }
    /**
     * @private
     * @param {?} pubads
     * @return {?}
     */
    addPPID(pubads) {
        if (!this.ppid) {
            return false;
        }
        if (typeof this.ppid !== 'string') {
            throw new DFPConfigurationError('PPID must be a string');
        }
        pubads.setPublisherProvidedId(this.ppid);
    }
    /**
     * @private
     * @return {?}
     */
    setup() {
        /** @type {?} */
        const win = window;
        /** @type {?} */
        const googletag = win.googletag;
        /** @type {?} */
        const pubads = googletag.pubads();
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
    }
    /**
     * @return {?}
     */
    hasLoaded() {
        return this.loaded;
    }
    /**
     * @param {?} task
     * @return {?}
     */
    defineTask(task) {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const win = window;
            /** @type {?} */
            const googletag = win.googletag;
            googletag.cmd.push(task);
        }
    }
}
DfpService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfpService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: IdleService, decorators: [{ type: Optional }] },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: ScriptInjectorService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRSxNQUFNLE9BQU8sZUFBZSxHQUFHLDJDQUEyQztBQUUxRSxNQUFNLHFCQUFzQixTQUFRLEtBQUs7Q0FBSTtBQUc3QyxNQUFNLE9BQU8sVUFBVTs7Ozs7OztJQXdCckIsWUFDK0IsVUFBa0IsRUFDbkMsUUFBcUIsRUFDTCxNQUFpQixFQUNyQyxjQUFxQztRQUhoQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRW5CLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDckMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBMUJ2QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUVaLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLFlBQU8sR0FB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RXBCLHFDQUErQjs7Ozs7SUFFL0Isb0NBQStCOzs7OztJQUUvQixxQ0FBK0I7Ozs7O0lBRS9CLDZCQUF1Qjs7Ozs7SUFFdkIsNEJBQXVCOzs7OztJQUdyQixnQ0FBK0M7Ozs7O0lBRS9DLDRCQUE2Qzs7Ozs7SUFDN0Msb0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xuXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xuXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcblxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcblxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xuXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xuXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0pO1xuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcblxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9KS5jYXRjaChlPT57fSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpZGxlTG9hZCkge1xuICAgICAgICAgIGlkbGVMb2FkLnJlcXVlc3QobG9hZFNjcmlwdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZFNjcmlwdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZnBDb25maWcoKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpc1trZXldID0gdGhpcy5jb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMuc2FmZUZyYW1lQ29uZmlnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zYWZlRnJhbWVDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdGcmFtZUNvbmZpZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBwdWJhZHMuc2V0U2FmZUZyYW1lQ29uZmlnKHRoaXMuc2FmZUZyYW1lQ29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGFyZ2V0aW5nKHB1YmFkcykge1xuICAgIGlmICghdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbFRhcmdldGluZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1RhcmdldGluZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7XG4gICAgICBpZiAodGhpcy5nbG9iYWxUYXJnZXRpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBwdWJhZHMuc2V0VGFyZ2V0aW5nKGtleSwgdGhpcy5nbG9iYWxUYXJnZXRpbmdba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2NhdGlvbihwdWJhZHMpIHtcbiAgICBpZiAoIXRoaXMubG9jYXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMubG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBwdWJhZHMuc2V0TG9jYXRpb24odGhpcy5sb2NhdGlvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubG9jYXRpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdMb2NhdGlvbiBtdXN0IGJlIGFuICcgK1xuICAgICAgICAnYXJyYXkgb3Igc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcHViYWRzLnNldExvY2F0aW9uLmFwcGx5KHB1YmFkcywgdGhpcy5sb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFkZFBQSUQocHViYWRzKSB7XG4gICAgaWYgKCF0aGlzLnBwaWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBwaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdQUElEIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBwdWJhZHMuc2V0UHVibGlzaGVyUHJvdmlkZWRJZCh0aGlzLnBwaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cCgpIHtcbiAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcbiAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcsXG4gICAgICBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVWaWRlb0Fkcykge1xuICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgfVxuXG4gICAgLy8gcGVyc29uYWxpemVkQWRzIGlzIGRlZmF1bHRcbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICBwdWJhZHMuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2xsYXBzZUlmRW1wdHkpIHtcbiAgICAgIHB1YmFkcy5jb2xsYXBzZUVtcHR5RGl2cygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFsd2F5cyByZWZyZXNoIG91cnNlbHZlc1xuICAgIHB1YmFkcy5kaXNhYmxlSW5pdGlhbExvYWQoKTtcblxuICAgIHB1YmFkcy5zZXRGb3JjZVNhZmVGcmFtZSh0aGlzLmZvcmNlU2FmZUZyYW1lKTtcbiAgICBwdWJhZHMuc2V0Q2VudGVyaW5nKHRoaXMuY2VudGVyaW5nKTtcblxuICAgIHRoaXMuYWRkTG9jYXRpb24ocHViYWRzKTtcbiAgICB0aGlzLmFkZFBQSUQocHViYWRzKTtcbiAgICB0aGlzLmFkZFRhcmdldGluZyhwdWJhZHMpO1xuICAgIHRoaXMuYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcyk7XG5cbiAgICAvLyBwdWJhZHMuZW5hYmxlU3luY1JlbmRlcmluZygpO1xuICAgIHB1YmFkcy5lbmFibGVBc3luY1JlbmRlcmluZygpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlICE9PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcbiAgICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XG4gICAgICB9XG4gICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGhhc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gIH1cblxuICBkZWZpbmVUYXNrKHRhc2spIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWc7XG4gICAgICBnb29nbGV0YWcuY21kLnB1c2godGFzayk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==