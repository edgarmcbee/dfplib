/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-value.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpTargetingDirective } from './dfp-targeting.directive';
var DfpValueDirective = /** @class */ (function () {
    function DfpValueDirective(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    DfpValueDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    };
    DfpValueDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-value'
                },] }
    ];
    /** @nocollapse */
    DfpValueDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpTargetingDirective; })),] }] }
    ]; };
    return DfpValueDirective;
}());
export { DfpValueDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZhbHVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUVuQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRTtJQUtFLDJCQUNVLFVBQXNCLEVBRXRCLFNBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFdEIsY0FBUyxHQUFULFNBQVMsQ0FBdUI7SUFDdEMsQ0FBQzs7OztJQUVMLG9DQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7O2dCQWJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztpQkFDdEI7Ozs7Z0JBVFksVUFBVTtnQkFLZCxxQkFBcUIsdUJBU3pCLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixFQUFDOztJQVFuRCx3QkFBQztDQUFBLEFBZkQsSUFlQztTQVpZLGlCQUFpQjs7Ozs7O0lBRzFCLHVDQUE4Qjs7Ozs7SUFDOUIsc0NBQ3dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbmplY3QsIGZvcndhcmRSZWYsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RmcC12YWx1ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwVmFsdWVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwVGFyZ2V0aW5nRGlyZWN0aXZlKSlcbiAgICBwcml2YXRlIHRhcmdldGluZzogRGZwVGFyZ2V0aW5nRGlyZWN0aXZlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50YXJnZXRpbmcuYWRkVmFsdWUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcbiAgfVxuXG59XG4iXX0=