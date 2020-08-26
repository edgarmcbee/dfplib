/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-responsive.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Inject, forwardRef, Input } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpResponsiveDirective = /** @class */ (function () {
    function DfpResponsiveDirective(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ad.addResponsiveMapping(this.getState());
    };
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewWidth", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[0] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DfpResponsiveDirective.prototype, "viewHeight", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val > 0) {
                this.viewport[1] = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} size
     * @return {?}
     */
    DfpResponsiveDirective.prototype.addSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.adSizes.push(size);
    };
    /**
     * @return {?}
     */
    DfpResponsiveDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    };
    DfpResponsiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-responsive'
                },] }
    ];
    /** @nocollapse */
    DfpResponsiveDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] }
    ]; };
    DfpResponsiveDirective.propDecorators = {
        viewport: [{ type: Input }],
        adSizes: [{ type: Input }],
        viewWidth: [{ type: Input }],
        viewHeight: [{ type: Input }]
    };
    return DfpResponsiveDirective;
}());
export { DfpResponsiveDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRDtJQVFFLGdDQUVVLEVBQWtCO1FBQWxCLE9BQUUsR0FBRixFQUFFLENBQWdCO1FBTG5CLGFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQUcsRUFBRSxDQUFDO0lBS2xCLENBQUM7Ozs7SUFFTCx5Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxzQkFDSSw2Q0FBUzs7Ozs7UUFEYixVQUNjLEdBQVc7WUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFDSSw4Q0FBVTs7Ozs7UUFEZCxVQUNlLEdBQVc7WUFDeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsd0NBQU87Ozs7SUFBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQseUNBQVE7OztJQUFSO1FBQ0UsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBeENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFKUSxjQUFjLHVCQVdsQixNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxFQUFDOzs7MkJBSnpDLEtBQUs7MEJBQ0wsS0FBSzs0QkFXTCxLQUFLOzZCQU9MLEtBQUs7O0lBaUJSLDZCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7U0F0Q1ksc0JBQXNCOzs7SUFFakMsMENBQTJCOztJQUMzQix5Q0FBc0I7Ozs7O0lBR3BCLG9DQUMwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXG59KVxuZXhwb3J0IGNsYXNzIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHZpZXdwb3J0ID0gWzAsIDBdO1xuICBASW5wdXQoKSBhZFNpemVzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWQuYWRkUmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3V2lkdGgodmFsOiBudW1iZXIpIHtcbiAgICBpZiAodmFsID4gMCkge1xuICAgICAgdGhpcy52aWV3cG9ydFswXSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdwb3J0WzFdID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGFkZFNpemUoc2l6ZSkge1xuICAgIHRoaXMuYWRTaXplcy5wdXNoKHNpemUpO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxuICAgICAgYWRTaXplczogdGhpcy5hZFNpemVzXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==