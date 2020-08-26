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
export class DfpRefreshEvent {
}
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
export class DfpAdDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDTyxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFDaEUsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLFVBQVUsR0FBRyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsR0FBRyxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxrQkFBa0IsRUFBYyxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXhELE1BQU0sT0FBTyxlQUFlO0NBSTNCOzs7SUFIQywrQkFBYTs7SUFDYiwrQkFBVTs7SUFDViwrQkFBVzs7QUFNYixNQUFNLE9BQU8sY0FBYzs7Ozs7Ozs7OztJQTBCekIsWUFDK0IsVUFBa0IsRUFDdkMsVUFBc0IsRUFDdEIsR0FBZSxFQUNmLGNBQXFDLEVBQ3JDLFVBQTZCLEVBQ1QsTUFBaUIsRUFDakMsTUFBYztRQU5HLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsbUJBQWMsR0FBZCxj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QUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLO3NCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUVMLE1BQU07Ozs7SUFSUCxnQ0FBd0I7O0lBQ3hCLGtDQUEwQjs7SUFDMUIsd0NBQWlDOztJQUNqQyx5Q0FBaUM7O0lBQ2pDLGlDQUF5Qjs7SUFDekIseUNBQWdFOztJQUNoRSx5Q0FBa0M7O0lBRWxDLHNDQUEyRTs7Ozs7SUFFM0UsK0JBQW1COzs7OztJQUVuQiwyQ0FBK0I7Ozs7O0lBRS9CLG9DQUF3Qjs7Ozs7SUFFeEIsb0NBQXdCOzs7OztJQUV4QixpQ0FBcUI7Ozs7O0lBRXJCLDhCQUF5Qjs7Ozs7SUFFekIsMENBQXVDOzs7OztJQUdyQyxvQ0FBK0M7Ozs7O0lBQy9DLG9DQUE4Qjs7Ozs7SUFDOUIsNkJBQXVCOzs7OztJQUN2Qix3Q0FBNkM7Ozs7O0lBQzdDLG9DQUFxQzs7Ozs7SUFDckMsZ0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJbmplY3QsIFBMQVRGT1JNX0lELCBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEZnBTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yLCBHb29nbGVTbG90LCBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi4vc2VydmljZS9pbmplY3Rpb25fdG9rZW4nO1xuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoRXZlbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIHNsb3Q6IGFueTtcbiAgZGF0YT86IGFueTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWFkJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgY2xpY2tVcmw6IHN0cmluZztcbiAgQElucHV0KCkgZm9yY2VTYWZlRnJhbWU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNhZmVGcmFtZUNvbmZpZzogc3RyaW5nO1xuICBASW5wdXQoKSByZWZyZXNoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcnNvbmFsaXplZEFkczogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcztcbiAgQElucHV0KCkgY29sbGFwc2VJZkVtcHR5OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBhZnRlclJlZnJlc2g6IEV2ZW50RW1pdHRlcjxEZnBSZWZyZXNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgc2l6ZXMgPSBbXTtcblxuICBwcml2YXRlIHJlc3BvbnNpdmVNYXBwaW5nID0gW107XG5cbiAgcHJpdmF0ZSB0YXJnZXRpbmdzID0gW107XG5cbiAgcHJpdmF0ZSBleGNsdXNpb25zID0gW107XG5cbiAgcHJpdmF0ZSBzY3JpcHRzID0gW107XG5cbiAgcHJpdmF0ZSBzbG90OiBHb29nbGVTbG90O1xuXG4gIHByaXZhdGUgb25TYW1lTmF2aWdhdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRmcDogRGZwU2VydmljZSxcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZSxcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwUmVmcmVzaC5yZWZyZXNoRXZlbnQuc3Vic2NyaWJlKHNsb3QgPT4ge1xuICAgICAgICBpZiAoc2xvdCA9PT0gdGhpcy5zbG90KSB7XG4gICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZWZyZXNoJywgc2xvdDogc2xvdCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocm91dGVyKSB7XG4gICAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbiA9IHJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiAhdGhpcy5yZWZyZXNoICYmIHRoaXMuY29uZmlnLm9uU2FtZU5hdmlnYXRpb24gPT09ICdyZWZyZXNoJykge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50LmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5kZnAuZGVmaW5lVGFzaygoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVmaW5lU2xvdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgZ29vZ2xldGFnLmRlc3Ryb3lTbG90cyhbdGhpcy5zbG90XSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9uU2FtZU5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UmVzcG9uc2l2ZU1hcHBpbmcoc2xvdCkge1xuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpO1xuXG4gICAgaWYgKGFkLnJlc3BvbnNpdmVNYXBwaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemVNYXBwaW5nID0gZ29vZ2xldGFnLnNpemVNYXBwaW5nKCk7XG5cbiAgICBhZC5yZXNwb25zaXZlTWFwcGluZy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xuICAgICAgc2l6ZU1hcHBpbmcuYWRkU2l6ZShtYXBwaW5nLnZpZXdwb3J0U2l6ZSwgbWFwcGluZy5hZFNpemVzKTtcbiAgICB9KTtcblxuICAgIHNsb3QuZGVmaW5lU2l6ZU1hcHBpbmcoc2l6ZU1hcHBpbmcuYnVpbGQoKSk7XG4gIH1cblxuICBwcml2YXRlIGRlZmluZVNsb3QoKSB7XG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZC5hZFVuaXQsIGFkLnNpemVzLCBlbGVtZW50LmlkKTtcblxuICAgIGlmICh0aGlzLmZvcmNlU2FmZUZyYW1lICE9PSB1bmRlZmluZWQgJiYgYWQuZm9yY2VTYWZlRnJhbWUgPT09ICF0aGlzLmNvbmZpZy5mb3JjZVNhZmVGcmFtZSkge1xuICAgICAgdGhpcy5zbG90LnNldEZvcmNlU2FmZUZyYW1lKGFkLmZvcmNlU2FmZUZyYW1lKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNsb3Quc2V0KCdyZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzJywgMSk7XG4gICAgICBnb29nbGV0YWcucHViYWRzKCkuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcbiAgICB9XG5cbiAgICBpZiAoYWQuY2xpY2tVcmwpIHtcbiAgICAgIHRoaXMuc2xvdC5zZXRDbGlja1VybChhZC5jbGlja1VybCk7XG4gICAgfVxuXG4gICAgaWYgKGFkLmNvbGxhcHNlSWZFbXB0eSkge1xuICAgICAgdGhpcy5zbG90LnNldENvbGxhcHNlRW1wdHlEaXYodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGFkLnNhZmVGcmFtZUNvbmZpZykge1xuICAgICAgdGhpcy5zbG90LnNldFNhZmVGcmFtZUNvbmZpZyhcbiAgICAgICAgKEpTT04ucGFyc2UoYWQuc2FmZUZyYW1lQ29uZmlnKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ29vZ2xldGFnLnB1YmFkcygpLmFkZEV2ZW50TGlzdGVuZXIoJ3Nsb3RSZW5kZXJFbmRlZCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnNsb3QgPT09IHRoaXMuc2xvdCkge1xuICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlbmRlckVuZGVkJywgc2xvdDogdGhpcy5zbG90LCBkYXRhOiBldmVudCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2V0UmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5zbG90KTtcblxuICAgIGFkLnRhcmdldGluZ3MuZm9yRWFjaCh0YXJnZXRpbmcgPT4ge1xuICAgICAgdGhpcy5zbG90LnNldFRhcmdldGluZyh0YXJnZXRpbmcua2V5LCB0YXJnZXRpbmcudmFsdWVzKTtcbiAgICB9KTtcblxuICAgIGFkLmV4Y2x1c2lvbnMuZm9yRWFjaChleGNsdXNpb24gPT4ge1xuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XG4gICAgfSk7XG5cbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XG5cbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDb250ZW50KCkge1xuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAnaW5pdCcsIHNsb3Q6IHNsb3QgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2RmcC1zaXplJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdhZC11bml0JywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXG4gICAgICByZXNwb25zaXZlTWFwcGluZzogdGhpcy5yZXNwb25zaXZlTWFwcGluZyxcbiAgICAgIHRhcmdldGluZ3M6IHRoaXMudGFyZ2V0aW5ncyxcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcbiAgICAgIGFkVW5pdDogdGhpcy5hZFVuaXQsXG4gICAgICBmb3JjZVNhZmVGcmFtZTogdGhpcy5mb3JjZVNhZmVGcmFtZSA9PT0gdHJ1ZSxcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXG4gICAgICBjbGlja1VybDogdGhpcy5jbGlja1VybCxcbiAgICAgIHJlZnJlc2g6IHRoaXMucmVmcmVzaCxcbiAgICAgIHBlcnNvbmFsaXplZEFkczogdGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IHRoaXMuY29uZmlnLnBlcnNvbmFsaXplZEFkcyxcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcbiAgICAgIGNvbGxhcHNlSWZFbXB0eTogdGhpcy5jb2xsYXBzZUlmRW1wdHkgPT09IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLnB1c2gobWFwcGluZyk7XG4gIH1cblxuICBhZGRUYXJnZXRpbmcodGFyZ2V0aW5nKSB7XG4gICAgdGhpcy50YXJnZXRpbmdzLnB1c2godGFyZ2V0aW5nKTtcbiAgfVxuXG4gIGFkZEV4Y2x1c2lvbihleGNsdXNpb24pIHtcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xuICB9XG5cbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0cy5wdXNoKHNjcmlwdCk7XG4gIH1cblxufVxuIl19