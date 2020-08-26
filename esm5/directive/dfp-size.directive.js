/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-size.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, forwardRef, Optional } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpResponsiveDirective } from './dfp-responsive.directive';
var DfpSizeDirective = /** @class */ (function () {
    function DfpSizeDirective(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    DfpSizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var target = this.resp || this.ad;
        /** @type {?} */
        var innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    };
    DfpSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-size'
                },] }
    ];
    /** @nocollapse */
    DfpSizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] },
        { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpResponsiveDirective; })),] }] }
    ]; };
    DfpSizeDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return DfpSizeDirective;
}());
export { DfpSizeDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXNpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFO0lBUUUsMEJBQ1UsVUFBc0IsRUFFdEIsRUFBa0IsRUFFbEIsSUFBNEI7UUFKNUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixPQUFFLEdBQUYsRUFBRSxDQUFnQjtRQUVsQixTQUFJLEdBQUosSUFBSSxDQUF3QjtJQUNsQyxDQUFDOzs7O0lBRUwsbUNBQVE7OztJQUFSOztZQUNRLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFOztZQUNqQyxTQUFTLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUztRQUU3RCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Z0JBekJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtpQkFDckI7Ozs7Z0JBUG1CLFVBQVU7Z0JBRXJCLGNBQWMsdUJBYWxCLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLEVBQUM7Z0JBWm5DLHNCQUFzQix1QkFjMUIsUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixFQUFDOzs7d0JBUDdELEtBQUs7eUJBQ0wsS0FBSzs7SUFxQlIsdUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXhCWSxnQkFBZ0I7OztJQUUzQixpQ0FBdUI7O0lBQ3ZCLGtDQUF3Qjs7Ozs7SUFHdEIsc0NBQThCOzs7OztJQUM5Qiw4QkFDMEI7Ozs7O0lBQzFCLGdDQUNvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtc2l6ZSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwU2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUpKVxuICAgIHByaXZhdGUgcmVzcDogRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMucmVzcCB8fCB0aGlzLmFkLFxuICAgICAgaW5uZXJUZXh0OiBzdHJpbmcgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG5cbiAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodCkge1xuICAgICAgdGFyZ2V0LmFkZFNpemUoW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XSk7XG4gICAgfSBlbHNlIGlmIChpbm5lclRleHQudHJpbSgpICE9PSAnJykge1xuICAgICAgdGFyZ2V0LmFkZFNpemUoaW5uZXJUZXh0KTtcbiAgICB9XG4gIH1cblxufVxuIl19