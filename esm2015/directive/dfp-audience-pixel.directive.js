/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-audience-pixel.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class DfpAudiencePixelDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRCxNQUFNLE9BQU8seUJBQXlCOzs7OztJQU1wQyxZQUMrQixVQUFrQixFQUN2QyxVQUFzQjtRQURELGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM1QixDQUFDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7O2tCQUN4QixNQUFNLEdBQUcsSUFBSSxHQUFHLGNBQWM7O2dCQUU1QixNQUFNLEdBQUcsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakM7O2dCQUVHLElBQUksR0FBRyxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksR0FBRyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1Qjs7a0JBRUssS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBRTNDLEtBQUssQ0FBQyxHQUFHLEdBQUcsZ0RBQWdELENBQUM7WUFDN0QsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sV0FBVyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUVuRSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUVuQixLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBUTRDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBbEJWLFVBQVU7OztxQkFhcEIsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7Ozs7SUFGTiwyQ0FBd0I7O0lBQ3hCLDhDQUEyQjs7SUFDM0IseUNBQXNCOzs7OztJQUdwQiwrQ0FBK0M7Ozs7O0lBQy9DLCtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgSW5qZWN0LFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLWF1ZGllbmNlLXBpeGVsJ1xufSlcbmV4cG9ydCBjbGFzcyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcbiAgQElucHV0KCkgc2VnbWVudElkOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBwaWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgYXhlbCA9IE1hdGgucmFuZG9tKCksXG4gICAgICAgIHJhbmRvbSA9IGF4ZWwgKiAxMDAwMDAwMDAwMDAwMDtcblxuICAgICAgbGV0IGFkVW5pdCA9ICcnO1xuICAgICAgaWYgKHRoaXMuYWRVbml0KSB7XG4gICAgICAgIGFkVW5pdCA9IGBkY19pdT0ke3RoaXMuYWRVbml0fWA7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcGlkID0gJyc7XG4gICAgICBpZiAodGhpcy5wcGlkKSB7XG4gICAgICAgIHBwaWQgPSBgcHBpZD0ke3RoaXMucHBpZH1gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICBwaXhlbC5zcmMgPSAnaHR0cHM6Ly9wdWJhZHMuZy5kb3VibGVjbGljay5uZXQvYWN0aXZpdHk7b3JkPSc7XG4gICAgICBwaXhlbC5zcmMgKz0gYCR7cmFuZG9tfTtkY19zZWc9JHt0aGlzLnNlZ21lbnRJZH07JHthZFVuaXR9JHtwcGlkfWA7XG5cbiAgICAgIHBpeGVsLndpZHRoID0gMTtcbiAgICAgIHBpeGVsLmhlaWdodCA9IDE7XG4gICAgICBwaXhlbC5ib3JkZXIgPSAnMCc7XG5cbiAgICAgIHBpeGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kKHBpeGVsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==