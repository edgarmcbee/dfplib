/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-ad.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Output, EventEmitter, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DfpService, } from '../service/dfp.service';
import { DfpIDGeneratorService, } from '../service/dfp-id-generator.service';
import { DfpRefreshService } from '../service/dfp-refresh.service';
import { DFPIncompleteError, DfpConfig } from '../class';
import { DFP_CONFIG } from '../service/injection_token';
var DfpRefreshEvent = /** @class */ (function () {
    function DfpRefreshEvent() {
    }
    return DfpRefreshEvent;
}());
export { DfpRefreshEvent };
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
var DfpAdDirective = /** @class */ (function () {
    function DfpAdDirective(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        var _this = this;
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
            function (slot) {
                if (slot === _this.slot) {
                    _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            }));
            if (router) {
                this.onSameNavigation = router.events.pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event instanceof NavigationEnd; })))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                        _this.refreshContent.call(_this);
                    }
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask((/**
             * @return {?}
             */
            function () {
                _this.defineSlot();
            }));
        }
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    DfpAdDirective.prototype.setResponsiveMapping = /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        /** @type {?} */
        var ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        var sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach((/**
         * @param {?} mapping
         * @return {?}
         */
        function (mapping) {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        }));
        slot.defineSizeMapping(sizeMapping.build());
    };
    /**
     * @private
     * @return {?}
     */
    DfpAdDirective.prototype.defineSlot = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ad = this.getState();
        /** @type {?} */
        var element = this.elementRef.nativeElement;
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
        function (event) {
            if (event.slot === _this.slot) {
                _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: event });
            }
        }));
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach((/**
         * @param {?} targeting
         * @return {?}
         */
        function (targeting) {
            _this.slot.setTargeting(targeting.key, targeting.values);
        }));
        ad.exclusions.forEach((/**
         * @param {?} exclusion
         * @return {?}
         */
        function (exclusion) {
            _this.slot.setCategoryExclusion(exclusion);
        }));
        ad.scripts.forEach((/**
         * @param {?} script
         * @return {?}
         */
        function (script) { script(_this.slot); }));
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    };
    /**
     * @private
     * @return {?}
     */
    DfpAdDirective.prototype.refreshContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then((/**
         * @param {?} slot
         * @return {?}
         */
        function (slot) {
            _this.afterRefresh.emit({ type: 'init', slot: slot });
        }));
    };
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    };
    Object.defineProperty(DfpAdDirective.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpAdDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DfpAdDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.sizes.push(size);
    };
    /**
     * @param {?} mapping
     * @return {?}
     */
    DfpAdDirective.prototype.addResponsiveMapping = /**
     * @param {?} mapping
     * @return {?}
     */
    function (mapping) {
        this.responsiveMapping.push(mapping);
    };
    /**
     * @param {?} targeting
     * @return {?}
     */
    DfpAdDirective.prototype.addTargeting = /**
     * @param {?} targeting
     * @return {?}
     */
    function (targeting) {
        this.targetings.push(targeting);
    };
    /**
     * @param {?} exclusion
     * @return {?}
     */
    DfpAdDirective.prototype.addExclusion = /**
     * @param {?} exclusion
     * @return {?}
     */
    function (exclusion) {
        this.exclusions.push(exclusion);
    };
    /**
     * @param {?} script
     * @return {?}
     */
    DfpAdDirective.prototype.addScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        this.scripts.push(script);
    };
    DfpAdDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-ad'
                },] }
    ];
    /** @nocollapse */
    DfpAdDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: DfpService },
        { type: DfpIDGeneratorService },
        { type: DfpRefreshService },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
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
    return DfpAdDirective;
}());
export { DfpAdDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDTyxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFDaEUsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsR0FBRyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsR0FBRyxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxrQkFBa0IsRUFBYyxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXhEO0lBQUE7SUFJQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLCtCQUFhOztJQUNiLCtCQUFVOztJQUNWLCtCQUFXOztBQUdiO0lBNkJFLHdCQUMrQixVQUFrQixFQUN2QyxVQUFzQixFQUN0QixHQUFlLEVBQ2YsY0FBcUMsRUFDckMsVUFBNkIsRUFDVCxNQUFpQixFQUNqQyxNQUFjO1FBUDVCLGlCQXdCQztRQXZCOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQVk7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OUMsTUFBTSxTQUFDLFdBQVc7Z0JBdkRWLFVBQVU7Z0JBVWQsVUFBVTtnQkFDVixxQkFBcUI7Z0JBQ3JCLGlCQUFpQjtnQkFFZSxTQUFTLHVCQThDN0MsTUFBTSxTQUFDLFVBQVU7Z0JBdkRiLE1BQU0sdUJBd0RWLFFBQVE7Ozt5QkEvQlYsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSzswQkFDTCxLQUFLO2tDQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFFTCxNQUFNOztJQWtNVCxxQkFBQztDQUFBLEFBL01ELElBK01DO1NBNU1ZLGNBQWM7OztJQUV6QixnQ0FBd0I7O0lBQ3hCLGtDQUEwQjs7SUFDMUIsd0NBQWlDOztJQUNqQyx5Q0FBaUM7O0lBQ2pDLGlDQUF5Qjs7SUFDekIseUNBQWdFOztJQUNoRSx5Q0FBa0M7O0lBRWxDLHNDQUEyRTs7Ozs7SUFFM0UsK0JBQW1COzs7OztJQUVuQiwyQ0FBK0I7Ozs7O0lBRS9CLG9DQUF3Qjs7Ozs7SUFFeEIsb0NBQXdCOzs7OztJQUV4QixpQ0FBcUI7Ozs7O0lBRXJCLDhCQUF5Qjs7Ozs7SUFFekIsMENBQXVDOzs7OztJQUdyQyxvQ0FBK0M7Ozs7O0lBQy9DLG9DQUE4Qjs7Ozs7SUFDOUIsNkJBQXVCOzs7OztJQUN2Qix3Q0FBNkM7Ozs7O0lBQzdDLG9DQUFxQzs7Ozs7SUFDckMsZ0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJbmplY3QsIFBMQVRGT1JNX0lELCBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEZnBTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yLCBHb29nbGVTbG90LCBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi4vc2VydmljZS9pbmplY3Rpb25fdG9rZW4nO1xuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoRXZlbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIHNsb3Q6IGFueTtcbiAgZGF0YT86IGFueTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgY2xpY2tVcmw6IHN0cmluZztcbiAgQElucHV0KCkgZm9yY2VTYWZlRnJhbWU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNhZmVGcmFtZUNvbmZpZzogc3RyaW5nO1xuICBASW5wdXQoKSByZWZyZXNoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcnNvbmFsaXplZEFkczogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcztcbiAgQElucHV0KCkgY29sbGFwc2VJZkVtcHR5OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBhZnRlclJlZnJlc2g6IEV2ZW50RW1pdHRlcjxEZnBSZWZyZXNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgc2l6ZXMgPSBbXTtcblxuICBwcml2YXRlIHJlc3BvbnNpdmVNYXBwaW5nID0gW107XG5cbiAgcHJpdmF0ZSB0YXJnZXRpbmdzID0gW107XG5cbiAgcHJpdmF0ZSBleGNsdXNpb25zID0gW107XG5cbiAgcHJpdmF0ZSBzY3JpcHRzID0gW107XG5cbiAgcHJpdmF0ZSBzbG90OiBHb29nbGVTbG90O1xuXG4gIHByaXZhdGUgb25TYW1lTmF2aWdhdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRmcDogRGZwU2VydmljZSxcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZSxcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwUmVmcmVzaC5yZWZyZXNoRXZlbnQuc3Vic2NyaWJlKHNsb3QgPT4ge1xuICAgICAgICBpZiAoc2xvdCA9PT0gdGhpcy5zbG90KSB7XG4gICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZWZyZXNoJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocm91dGVyKSB7XG4gICAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbiA9IHJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiAhdGhpcy5yZWZyZXNoICYmIHRoaXMuY29uZmlnLm9uU2FtZU5hdmlnYXRpb24gPT09ICdyZWZyZXNoJykge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50LmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnAuZGVmaW5lVGFzaygoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVmaW5lU2xvdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgZ29vZ2xldGFnLmRlc3Ryb3lTbG90cyhbdGhpcy5zbG90XSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9uU2FtZU5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UmVzcG9uc2l2ZU1hcHBpbmcoc2xvdCkge1xuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpO1xuXG4gICAgaWYgKGFkLnJlc3BvbnNpdmVNYXBwaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemVNYXBwaW5nID0gZ29vZ2xldGFnLnNpemVNYXBwaW5nKCk7XG5cbiAgICBhZC5yZXNwb25zaXZlTWFwcGluZy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xuICAgICAgc2l6ZU1hcHBpbmcuYWRkU2l6ZShtYXBwaW5nLnZpZXdwb3J0U2l6ZSwgbWFwcGluZy5hZFNpemVzKTtcbiAgICB9KTtcblxuICAgIHNsb3QuZGVmaW5lU2l6ZU1hcHBpbmcoc2l6ZU1hcHBpbmcuYnVpbGQoKSk7XG4gIH1cblxuICBwcml2YXRlIGRlZmluZVNsb3QoKSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZC5hZFVuaXQsIGFkLnNpemVzLCBlbGVtZW50LmlkKTtcblxuICAgIGlmICh0aGlzLmZvcmNlU2FmZUZyYW1lICE9PSB1bmRlZmluZWQgJiYgYWQuZm9yY2VTYWZlRnJhbWUgPT09ICF0aGlzLmNvbmZpZy5mb3JjZVNhZmVGcmFtZSkge1xuICAgICAgdGhpcy5zbG90LnNldEZvcmNlU2FmZUZyYW1lKGFkLmZvcmNlU2FmZUZyYW1lKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0KCdyZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzJywgMSk7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY2xpY2tVcmwpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDbGlja1VybChhZC5jbGlja1VybCk7XG4gICAgfVxuXG4gICAgaWYgKGFkLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgdGhpcy5zbG90LnNldENvbGxhcHNlRW1wdHlEaXYodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGFkLnNhZmVGcmFtZUNvbmZpZykge1xuICAgICAgdGhpcy5zbG90LnNldFNhZmVGcmFtZUNvbmZpZyhcbiAgICAgICAgKEpTT04ucGFyc2UoYWQuc2FmZUZyYW1lQ29uZmlnKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ29vZ2xldGFnLnB1YmFkcygpLmFkZEV2ZW50TGlzdGVuZXIoJ3Nsb3RSZW5kZXJFbmRlZCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnNsb3QgPT09IHRoaXMuc2xvdCkge1xuICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlbmRlckVuZGVkJywgc2xvdDogdGhpcy5zbG90LCBkYXRhOiBldmVudCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2V0UmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5zbG90KTtcblxuICAgIGFkLnRhcmdldGluZ3MuZm9yRWFjaCh0YXJnZXRpbmcgPT4ge1xuICAgICAgdGhpcy5zbG90LnNldFRhcmdldGluZyh0YXJnZXRpbmcua2V5LCB0YXJnZXRpbmcudmFsdWVzKTtcbiAgICB9KTtcblxuICAgIGFkLmV4Y2x1c2lvbnMuZm9yRWFjaChleGNsdXNpb24gPT4ge1xuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XG4gICAgfSk7XG5cbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XG5cbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDb250ZW50KCkge1xuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAnaW5pdCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2RmcC1zaXplJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdhZC11bml0JywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXG4gICAgICByZXNwb25zaXZlTWFwcGluZzogdGhpcy5yZXNwb25zaXZlTWFwcGluZyxcbiAgICAgIHRhcmdldGluZ3M6IHRoaXMudGFyZ2V0aW5ncyxcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcbiAgICAgIGFkVW5pdDogdGhpcy5hZFVuaXQsXG4gICAgICBmb3JjZVNhZmVGcmFtZTogdGhpcy5mb3JjZVNhZmVGcmFtZSA9PT0gdHJ1ZSxcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXG4gICAgICBjbGlja1VybDogdGhpcy5jbGlja1VybCxcbiAgICAgIHJlZnJlc2g6IHRoaXMucmVmcmVzaCxcbiAgICAgIHBlcnNvbmFsaXplZEFkczogdGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcyxcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcbiAgICAgIGNvbGxhcHNlSWZFbXB0eTogdGhpcy5jb2xsYXBzZUlmRW1wdHkgPT09IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLnB1c2gobWFwcGluZyk7XG4gIH1cblxuICBhZGRUYXJnZXRpbmcodGFyZ2V0aW5nKSB7XG4gICAgdGhpcy50YXJnZXRpbmdzLnB1c2godGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGFkZEV4Y2x1c2lvbihleGNsdXNpb24pIHtcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xuICB9XG5cbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0cy5wdXNoKHNjcmlwdCk7XG4gIH1cblxufVxuIl19