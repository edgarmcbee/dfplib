/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-ad-responsive.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef, HostListener } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpRefreshService } from '../service/dfp-refresh.service';
var DfpAdResponsiveDirective = /** @class */ (function () {
    function DfpAdResponsiveDirective(elementRef, ad, dfpRefresh) {
        var _this = this;
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.slot = event.slot;
        }));
    }
    /**
     * @return {?}
     */
    DfpAdResponsiveDirective.prototype.normalizeIframe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        var winWidth = window.innerWidth;
        /** @type {?} */
        var state = this.ad.getState();
        /** @type {?} */
        var width = 0;
        state.sizes.forEach((/**
         * @param {?} size
         * @return {?}
         */
        function (size) {
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
            function (slot) {
                _this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                _this.iframe = _this.getIframe();
            }));
        }
    };
    /**
     * @return {?}
     */
    DfpAdResponsiveDirective.prototype.getIframe = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ad = this.elementRef.nativeElement;
        /** @type {?} */
        var iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    };
    DfpAdResponsiveDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-ad[responsive]'
                },] }
    ];
    /** @nocollapse */
    DfpAdResponsiveDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DfpAdDirective; })),] }] },
        { type: DfpRefreshService }
    ]; };
    DfpAdResponsiveDirective.propDecorators = {
        normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
    };
    return DfpAdResponsiveDirective;
}());
export { DfpAdResponsiveDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLFVBQVUsRUFDckIsTUFBTSxFQUFFLFVBQVUsRUFDbEIsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTtJQVNJLGtDQUNZLFVBQXNCLEVBRXRCLEVBQWtCLEVBQ2xCLFVBQTZCO1FBSnpDLGlCQVNDO1FBUlcsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixPQUFFLEdBQUYsRUFBRSxDQUFnQjtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUVyQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFHRCxrREFBZTs7O0lBRGY7UUFBQSxpQkE4QkM7UUE1QkcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBRW5DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOztZQUVwRCxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVU7O1lBRTlCLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTs7WUFDMUIsS0FBSyxHQUFHLENBQUM7UUFFYixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLElBQUk7WUFDcEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFO2dCQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RELEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsSUFBSTtnQkFDM0QsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkMsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7O1lBQ1UsRUFBRSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTs7WUFDN0MsTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxNQUFNLENBQUM7U0FDakI7SUFDTCxDQUFDOztnQkExREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7aUJBQ2pDOzs7O2dCQVZjLFVBQVU7Z0JBS2hCLGNBQWMsdUJBY2QsTUFBTSxTQUFDLFVBQVU7Ozt3QkFBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsRUFBQztnQkFidkMsaUJBQWlCOzs7a0NBc0JyQixZQUFZLFNBQUMsZUFBZTs7SUF1Q2pDLCtCQUFDO0NBQUEsQUEzREQsSUEyREM7U0F4RFksd0JBQXdCOzs7Ozs7SUFFakMsMENBQWtDOzs7OztJQUNsQywrQ0FBNEI7Ozs7O0lBQzVCLHdDQUFrQjs7Ozs7SUFHZCw4Q0FBOEI7Ozs7O0lBQzlCLHNDQUMwQjs7Ozs7SUFDMUIsOENBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LCBmb3J3YXJkUmVmLFxuICAgIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2RmcC1hZFtyZXNwb25zaXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIHtcblxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICBwcml2YXRlIGlmcmFtZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzbG90OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxuICAgICAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcbiAgICAgICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbG90ID0gZXZlbnQuc2xvdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gICAgbm9ybWFsaXplSWZyYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5hZC5pc0hpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5pZnJhbWUgfHwgdGhpcy5nZXRJZnJhbWUoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlmcmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gdGhpcy5pZnJhbWVXaWR0aCB8fCArdGhpcy5pZnJhbWUud2lkdGg7XG5cbiAgICAgICAgY29uc3Qgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCksXG4gICAgICAgICAgICB3aWR0aCA9IDA7XG5cbiAgICAgICAgc3RhdGUuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgIGlmIChzaXplWzBdIDwgd2luV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHdpZHRoLCBzaXplWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLnNpemVzLmxlbmd0aCA+IDEgJiYgd2lkdGggIT09IHRoaXMuaWZyYW1lV2lkdGgpIHtcbiAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xuICAgICAgICAgICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgc3RhdGUucmVmcmVzaCkudGhlbihzbG90ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3Jlc2l6ZScsIHNsb3Q6IHNsb3QgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmdldElmcmFtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IGFkOiBFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBpZnJhbWUgPSBhZC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgaWYgKGlmcmFtZSAmJiAraWZyYW1lLndpZHRoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==