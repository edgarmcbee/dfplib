import { InjectionToken, Injectable, Inject, PLATFORM_ID, NgZone, Optional, EventEmitter, Injector, Directive, ElementRef, Input, Output, forwardRef, HostListener, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { from, timer } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: service/injection_token.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DFP_CONFIG = new InjectionToken('dfpConfig');

/**
 * @fileoverview added by tsickle
 * Generated from: service/idle.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IdleService {
    /**
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(platformId, zone) {
        /** @type {?} */
        const win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            (fun) => {
                return win.requestIdleCallback(fun);
            });
        }
        else {
            this.requestIdleCallback = (/**
             * @param {?} fun
             * @return {?}
             */
            (fun) => {
                return zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => win.setTimeout(fun, 50)));
            });
        }
    }
    /**
     * @param {?} fun
     * @return {?}
     */
    request(fun) {
        this.requestIdleCallback(fun);
    }
}
IdleService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IdleService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    IdleService.prototype.requestIdleCallback;
}

/**
 * @fileoverview added by tsickle
 * Generated from: service/http-error.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HttpErrorService {
    constructor() {
        this.isErrorCode = (/**
         * @param {?} code
         * @return {?}
         */
        function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        });
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    httpError(response, message) {
        console.log(`Error (${response.status}) ${message ? message : ''}`);
    }
}
HttpErrorService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}

/**
 * @fileoverview added by tsickle
 * Generated from: service/parse-duration.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DFPDurationError extends Error {
    /**
     * @param {?} interval
     */
    constructor(interval) {
        super(`Invalid interval: '${interval}'ls`);
    }
}
class ParseDurationService {
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    convertToMilliseconds(time, unit) {
        console.assert(/^(m?s|min|h)$/g.test(unit));
        if (unit === 'ms') {
            return time;
        }
        if (unit === 's') {
            return time * 1000;
        }
        if (unit === 'min') {
            return time * 60 * 1000;
        }
        return time * 60 * 60 * 1000;
    }
    /**
     * @param {?} match
     * @return {?}
     */
    convert(match) {
        /** @type {?} */
        const time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    }
    /**
     * @param {?} interval
     * @return {?}
     */
    parseDuration(interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError(`'${interval}' must be of number or string type`);
        }
        /** @type {?} */
        const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    }
}
ParseDurationService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * Generated from: service/script-injector.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScriptInjectorService {
    /**
     * @param {?} httpError
     */
    constructor(httpError) {
        this.httpError = httpError;
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    completeURL(url) {
        /** @type {?} */
        const ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    createScript(url) {
        /** @type {?} */
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    }
    /**
     * @private
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    promiseScript(script, url) {
        /** @type {?} */
        const promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            script.onload = (/**
             * @return {?}
             */
            () => {
                resolve(script);
            });
            script.onerror = (/**
             * @return {?}
             */
            () => {
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
        response => {
            this.httpError.httpError({ status: 400 }, `loading script "${url}"`);
        }));
        return promise;
    }
    /**
     * @param {?} script
     * @return {?}
     */
    injectScript(script) {
        /** @type {?} */
        const head = document.head || document.querySelector('head');
        head.appendChild(script);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    scriptInjector(url) {
        /** @type {?} */
        const script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    }
}
ScriptInjectorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScriptInjectorService.ctorParameters = () => [
    { type: HttpErrorService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScriptInjectorService.prototype.httpError;
}

/**
 * @fileoverview added by tsickle
 * Generated from: class/dfp-errors.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DFPIncompleteError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} missingName
     * @param {?=} isAttribute
     */
    constructor(directiveName, missingName, isAttribute) {
        super(`Incomplete definition of '${directiveName}': ` +
            `Missing ${isAttribute ? 'attribute' : 'child directive'} ` +
            `'${missingName}'.`);
    }
}
class DFPTypeError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} attributeName
     * @param {?} wrongValue
     * @param {?} expectedType
     */
    constructor(directiveName, attributeName, wrongValue, expectedType) {
        super(`Wrong type for attribute '${attributeName}' on ` +
            `directive '${directiveName}': Expected ${expectedType}` +
            `, got ${typeof wrongValue}`);
    }
}
class DFPMissingParentError extends Error {
    /**
     * @param {?} directiveName
     * @param {...?} parents
     */
    constructor(directiveName, ...parents) {
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        let parentMessage;
        if (parents.length > 1) {
            parents = parents.map((/**
             * @param {?} p
             * @return {?}
             */
            p => `'${p}'`));
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += ` or ${parents[parents.length - 1]}`;
        }
        else {
            parentMessage = ` '${parents[0]}'`;
        }
        super(`Invalid use of '${directiveName}' directive. ` +
            `Missing parent directive${parentMessage}.`);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: class/dfp-config.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpTargeting {
}
class DfpConfig {
}
if (false) {
    /** @type {?} */
    DfpConfig.prototype.idleLoad;
    /** @type {?} */
    DfpConfig.prototype.onSameNavigation;
    /** @type {?} */
    DfpConfig.prototype.singleRequestMode;
    /** @type {?} */
    DfpConfig.prototype.enableVideoAds;
    /** @type {?} */
    DfpConfig.prototype.personalizedAds;
    /** @type {?} */
    DfpConfig.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpConfig.prototype.centering;
    /** @type {?} */
    DfpConfig.prototype.location;
    /** @type {?} */
    DfpConfig.prototype.ppid;
    /** @type {?} */
    DfpConfig.prototype.globalTargeting;
    /** @type {?} */
    DfpConfig.prototype.forceSafeFrame;
    /** @type {?} */
    DfpConfig.prototype.safeFrameConfig;
    /** @type {?} */
    DfpConfig.prototype.loadGPT;
}

/**
 * @fileoverview added by tsickle
 * Generated from: class/google-slot.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function GoogleSlot() { }
if (false) {
    /** @type {?} */
    GoogleSlot.prototype.renderEnded;
    /**
     * @param {?} service
     * @return {?}
     */
    GoogleSlot.prototype.addService = function (service) { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.clearCategoryExclusions = function () { };
    /**
     * @param {?} opt_key
     * @return {?}
     */
    GoogleSlot.prototype.clearTargeting = function (opt_key) { };
    /**
     * @param {?} sizeMapping
     * @return {?}
     */
    GoogleSlot.prototype.defineSizeMapping = function (sizeMapping) { };
    /**
     * @param {?} key
     * @return {?}
     */
    GoogleSlot.prototype.get = function (key) { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getAdUnitPath = function () { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getAttributeKeys = function () { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getCategoryExclusions = function () { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getResponseInformation = function () { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getSlotElementId = function () { };
    /**
     * @param {?} key
     * @return {?}
     */
    GoogleSlot.prototype.getTargeting = function (key) { };
    /**
     * @return {?}
     */
    GoogleSlot.prototype.getTargetingKeys = function () { };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    GoogleSlot.prototype.set = function (key, value) { };
    /**
     * @param {?} categoryExclusion
     * @return {?}
     */
    GoogleSlot.prototype.setCategoryExclusion = function (categoryExclusion) { };
    /**
     * @param {?} value
     * @return {?}
     */
    GoogleSlot.prototype.setClickUrl = function (value) { };
    /**
     * @param {?} collapse
     * @param {?} opt_collapseBeforeAdFetch
     * @return {?}
     */
    GoogleSlot.prototype.setCollapseEmptyDiv = function (collapse, opt_collapseBeforeAdFetch) { };
    /**
     * @param {?} forceSafeFrame
     * @return {?}
     */
    GoogleSlot.prototype.setForceSafeFrame = function (forceSafeFrame) { };
    /**
     * @param {?} config
     * @return {?}
     */
    GoogleSlot.prototype.setSafeFrameConfig = function (config) { };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    GoogleSlot.prototype.setTargeting = function (key, value) { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: class/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
class DfpService {
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

/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-id-generator.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpIDGeneratorService {
    constructor() {
        this.generatedIDs = {};
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    generateID(type = 'dfp-ad') {
        /** @type {?} */
        let id = null;
        do {
            /** @type {?} */
            const number = Math.random().toString().slice(2);
            id = type + '-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    dfpIDGenerator(element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        const id = this.generateID(element.tagName.toLowerCase());
        if (element) {
            element.id = id;
        }
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isTaken(id) {
        return id in this.generatedIDs;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isUnique(id) {
        return !this.isTaken(id);
    }
}
DfpIDGeneratorService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpIDGeneratorService.prototype.generatedIDs;
}

/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-refresh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DFPRefreshError extends Error {
}
class DfpRefreshService {
    /**
     * @param {?} config
     * @param {?} inject
     * @param {?} parseDuration
     */
    constructor(config, inject, parseDuration) {
        this.config = config;
        this.inject = inject;
        this.parseDuration = parseDuration;
        this.refreshEvent = new EventEmitter();
        this.refreshSlots = [];
        this.intervals = {};
    }
    /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    slotRefresh(slot, refreshInterval, initRefresh = false) {
        /** @type {?} */
        const deferred = from([slot]).toPromise();
        /** @type {?} */
        const task = { slot: slot, deferred: deferred };
        deferred.then((/**
         * @return {?}
         */
        () => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
            }
        }));
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    googletag.display(s.getSlotElementId());
                }));
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            }));
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} slot
     * @return {THIS}
     */
    cancelInterval(slot) {
        if (!(/** @type {?} */ (this)).hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = (/** @type {?} */ (this)).intervals[(/** @type {?} */ (this)).slotIntervalKey(slot)];
        interval.unsubscribe();
        delete (/** @type {?} */ (this)).intervals[slot];
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @private
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push((/**
             * @return {?}
             */
            () => {
                googletag.pubads().refresh();
            }));
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push((/**
         * @return {?}
         */
        () => {
            googletag.pubads().refresh(tasks.map((/**
             * @param {?} task
             * @return {?}
             */
            task => task.slot)));
            tasks.forEach((/**
             * @param {?} task
             * @return {?}
             */
            task => {
                Promise.resolve(task.slot);
            }));
        }));
    }
    /**
     * @private
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        }));
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @private
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    validateInterval(milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    hiddenCheck(element) {
        if (typeof (window) !== 'undefined' && element != null) {
            /** @type {?} */
            const css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    }
}
DfpRefreshService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfpRefreshService.ctorParameters = () => [
    { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
    { type: Injector },
    { type: ParseDurationService }
];
if (false) {
    /** @type {?} */
    DfpRefreshService.prototype.refreshEvent;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.refreshSlots;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.singleRequest;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.intervals;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.inject;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.parseDuration;
}

/**
 * @fileoverview added by tsickle
 * Generated from: service/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-ad.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpRefreshEvent {
}
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
class DfpAdDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} dfp
     * @param {?} dfpIDGenerator
     * @param {?} dfpRefresh
     * @param {?} config
     * @param {?} router
     */
    constructor(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.dfp = dfp;
        this.dfpIDGenerator = dfpIDGenerator;
        this.dfpRefresh = dfpRefresh;
        this.config = config;
        this.personalizedAds = this.config.personalizedAds;
        this.afterRefresh = new EventEmitter();
        this.sizes = [];
        this.responsiveMapping = [];
        this.targetings = [];
        this.exclusions = [];
        this.scripts = [];
        if (isPlatformBrowser(this.platformId)) {
            this.dfpRefresh.refreshEvent.subscribe((/**
             * @param {?} slot
             * @return {?}
             */
            slot => {
                if (slot === this.slot) {
                    this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            }));
            if (router) {
                this.onSameNavigation = router.events.pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => event instanceof NavigationEnd)))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (this.slot && !this.refresh && this.config.onSameNavigation === 'refresh') {
                        this.refreshContent.call(this);
                    }
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask((/**
             * @return {?}
             */
            () => {
                this.defineSlot();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    setResponsiveMapping(slot) {
        /** @type {?} */
        const ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        const sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach((/**
         * @param {?} mapping
         * @return {?}
         */
        mapping => {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        }));
        slot.defineSizeMapping(sizeMapping.build());
    }
    /**
     * @private
     * @return {?}
     */
    defineSlot() {
        /** @type {?} */
        const ad = this.getState();
        /** @type {?} */
        const element = this.elementRef.nativeElement;
        this.slot = googletag.defineSlot(ad.adUnit, ad.sizes, element.id);
        if (this.forceSafeFrame !== undefined && ad.forceSafeFrame === !this.config.forceSafeFrame) {
            this.slot.setForceSafeFrame(ad.forceSafeFrame);
        }
        if (this.personalizedAds === false) {
            this.slot.set('requestNonPersonalizedAds', 1);
            googletag.pubads().setRequestNonPersonalizedAds(1);
        }
        if (ad.clickUrl) {
            this.slot.setClickUrl(ad.clickUrl);
        }
        if (ad.collapseIfEmpty) {
            this.slot.setCollapseEmptyDiv(true, true);
        }
        if (ad.safeFrameConfig) {
            this.slot.setSafeFrameConfig((JSON.parse(ad.safeFrameConfig)));
        }
        googletag.pubads().addEventListener('slotRenderEnded', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.slot === this.slot) {
                this.afterRefresh.emit({ type: 'renderEnded', slot: this.slot, data: event });
            }
        }));
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach((/**
         * @param {?} targeting
         * @return {?}
         */
        targeting => {
            this.slot.setTargeting(targeting.key, targeting.values);
        }));
        ad.exclusions.forEach((/**
         * @param {?} exclusion
         * @return {?}
         */
        exclusion => {
            this.slot.setCategoryExclusion(exclusion);
        }));
        ad.scripts.forEach((/**
         * @param {?} script
         * @return {?}
         */
        script => { script(this.slot); }));
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    }
    /**
     * @private
     * @return {?}
     */
    refreshContent() {
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then((/**
         * @param {?} slot
         * @return {?}
         */
        slot => {
            this.afterRefresh.emit({ type: 'init', slot: slot });
        }));
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            sizes: this.sizes,
            responsiveMapping: this.responsiveMapping,
            targetings: this.targetings,
            exclusions: this.exclusions,
            adUnit: this.adUnit,
            forceSafeFrame: this.forceSafeFrame === true,
            safeFrameConfig: this.safeFrameConfig,
            clickUrl: this.clickUrl,
            refresh: this.refresh,
            personalizedAds: this.personalizedAds === this.config.personalizedAds,
            scripts: this.scripts,
            collapseIfEmpty: this.collapseIfEmpty === true
        });
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.sizes.push(size);
    }
    /**
     * @param {?} mapping
     * @return {?}
     */
    addResponsiveMapping(mapping) {
        this.responsiveMapping.push(mapping);
    }
    /**
     * @param {?} targeting
     * @return {?}
     */
    addTargeting(targeting) {
        this.targetings.push(targeting);
    }
    /**
     * @param {?} exclusion
     * @return {?}
     */
    addExclusion(exclusion) {
        this.exclusions.push(exclusion);
    }
    /**
     * @param {?} script
     * @return {?}
     */
    addScript(script) {
        this.scripts.push(script);
    }
}
DfpAdDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad'
            },] }
];
/** @nocollapse */
DfpAdDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: DfpService },
    { type: DfpIDGeneratorService },
    { type: DfpRefreshService },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: Router, decorators: [{ type: Optional }] }
];
DfpAdDirective.propDecorators = {
    adUnit: [{ type: Input }],
    clickUrl: [{ type: Input }],
    forceSafeFrame: [{ type: Input }],
    safeFrameConfig: [{ type: Input }],
    refresh: [{ type: Input }],
    personalizedAds: [{ type: Input }],
    collapseIfEmpty: [{ type: Input }],
    afterRefresh: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DfpAdDirective.prototype.adUnit;
    /** @type {?} */
    DfpAdDirective.prototype.clickUrl;
    /** @type {?} */
    DfpAdDirective.prototype.forceSafeFrame;
    /** @type {?} */
    DfpAdDirective.prototype.safeFrameConfig;
    /** @type {?} */
    DfpAdDirective.prototype.refresh;
    /** @type {?} */
    DfpAdDirective.prototype.personalizedAds;
    /** @type {?} */
    DfpAdDirective.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpAdDirective.prototype.afterRefresh;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.sizes;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.responsiveMapping;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.targetings;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.exclusions;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.scripts;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.slot;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.onSameNavigation;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfp;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfpIDGenerator;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.dfpRefresh;
    /**
     * @type {?}
     * @private
     */
    DfpAdDirective.prototype.config;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-ad-responsive.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            this.slot = event.slot;
        }));
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach((/**
         * @param {?} size
         * @return {?}
         */
        size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        }));
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then((/**
             * @param {?} slot
             * @return {?}
             */
            slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            }));
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] }
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.iframe;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.iframeWidth;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.slot;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.ad;
    /**
     * @type {?}
     * @private
     */
    DfpAdResponsiveDirective.prototype.dfpRefresh;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-responsive.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpResponsiveDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addResponsiveMapping(this.getState());
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewWidth(val) {
        if (val > 0) {
            this.viewport[0] = val;
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewHeight(val) {
        if (val > 0) {
            this.viewport[1] = val;
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.adSizes.push(size);
    }
    /**
     * @return {?}
     */
    getState() {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    }
}
DfpResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-responsive'
            },] }
];
/** @nocollapse */
DfpResponsiveDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] }
];
DfpResponsiveDirective.propDecorators = {
    viewport: [{ type: Input }],
    adSizes: [{ type: Input }],
    viewWidth: [{ type: Input }],
    viewHeight: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpResponsiveDirective.prototype.viewport;
    /** @type {?} */
    DfpResponsiveDirective.prototype.adSizes;
    /**
     * @type {?}
     * @private
     */
    DfpResponsiveDirective.prototype.ad;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-size.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpSizeDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} resp
     */
    constructor(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const target = this.resp || this.ad;
        /** @type {?} */
        const innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    }
}
DfpSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-size'
            },] }
];
/** @nocollapse */
DfpSizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] },
    { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpResponsiveDirective)),] }] }
];
DfpSizeDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpSizeDirective.prototype.width;
    /** @type {?} */
    DfpSizeDirective.prototype.height;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.ad;
    /**
     * @type {?}
     * @private
     */
    DfpSizeDirective.prototype.resp;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-targeting.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpTargetingDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.values = [];
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (val instanceof Array) {
            val.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => this.addValue(v)));
        }
        else {
            this.addValue(val);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const targeting = this.getState();
        this.ad.addTargeting(targeting);
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addValue(value) {
        if (value && !this.values.find((/**
         * @param {?} item
         * @return {?}
         */
        item => item === value))) {
            this.values.push(value);
        }
    }
}
DfpTargetingDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-targeting'
            },] }
];
/** @nocollapse */
DfpTargetingDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] }
];
DfpTargetingDirective.propDecorators = {
    key: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpTargetingDirective.prototype.key;
    /**
     * @type {?}
     * @private
     */
    DfpTargetingDirective.prototype.values;
    /**
     * @type {?}
     * @private
     */
    DfpTargetingDirective.prototype.ad;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-exclusion.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpExclusionDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     */
    constructor(elementRef, ad) {
        this.elementRef = elementRef;
        this.ad = ad;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addExclusion(this.elementRef.nativeElement.innerText);
    }
}
DfpExclusionDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-exclusion'
            },] }
];
/** @nocollapse */
DfpExclusionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpAdDirective)),] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpExclusionDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpExclusionDirective.prototype.ad;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-value.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpValueDirective {
    /**
     * @param {?} elementRef
     * @param {?} targeting
     */
    constructor(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    }
}
DfpValueDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-value'
            },] }
];
/** @nocollapse */
DfpValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DfpTargetingDirective)),] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpValueDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    DfpValueDirective.prototype.targeting;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-audience-pixel.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DfpAudiencePixelDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     */
    constructor(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const axel = Math.random();
            /** @type {?} */
            const random = axel * 10000000000000;
            /** @type {?} */
            let adUnit = '';
            if (this.adUnit) {
                adUnit = `dc_iu=${this.adUnit}`;
            }
            /** @type {?} */
            let ppid = '';
            if (this.ppid) {
                ppid = `ppid=${this.ppid}`;
            }
            /** @type {?} */
            const pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += `${random};dc_seg=${this.segmentId};${adUnit}${ppid}`;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    }
}
DfpAudiencePixelDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-audience-pixel'
            },] }
];
/** @nocollapse */
DfpAudiencePixelDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef }
];
DfpAudiencePixelDirective.propDecorators = {
    adUnit: [{ type: Input }],
    segmentId: [{ type: Input }],
    ppid: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.adUnit;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.segmentId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.ppid;
    /**
     * @type {?}
     * @private
     */
    DfpAudiencePixelDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    DfpAudiencePixelDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: directive/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: dfp.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-dfp.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DFP_CONFIG, DfpAdDirective, DfpAdResponsiveDirective, DfpAudiencePixelDirective, DfpExclusionDirective, DfpIDGeneratorService, DfpModule, DfpRefreshService, DfpResponsiveDirective, DfpService, DfpSizeDirective, DfpTargetingDirective, DfpValueDirective, HttpErrorService, IdleService, ParseDurationService, ScriptInjectorService, DfpAdDirective as ɵa, DFP_CONFIG as ɵb, DfpService as ɵc, IdleService as ɵd, DfpConfig as ɵe, ScriptInjectorService as ɵf, HttpErrorService as ɵg, DfpIDGeneratorService as ɵh, DfpRefreshService as ɵi, ParseDurationService as ɵj, DfpSizeDirective as ɵk, DfpResponsiveDirective as ɵl, DfpAdResponsiveDirective as ɵm, DfpTargetingDirective as ɵn, DfpExclusionDirective as ɵo, DfpValueDirective as ɵp, DfpAudiencePixelDirective as ɵq };
//# sourceMappingURL=ngx-dfp.js.map
