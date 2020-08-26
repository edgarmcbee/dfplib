/**
 * @fileoverview added by tsickle
 * Generated from: directive/dfp-audience-pixel.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var DfpAudiencePixelDirective = /** @class */ (function () {
    function DfpAudiencePixelDirective(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    DfpAudiencePixelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var axel = Math.random();
            /** @type {?} */
            var random = axel * 10000000000000;
            /** @type {?} */
            var adUnit = '';
            if (this.adUnit) {
                adUnit = "dc_iu=" + this.adUnit;
            }
            /** @type {?} */
            var ppid = '';
            if (this.ppid) {
                ppid = "ppid=" + this.ppid;
            }
            /** @type {?} */
            var pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += random + ";dc_seg=" + this.segmentId + ";" + adUnit + ppid;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    };
    DfpAudiencePixelDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-audience-pixel'
                },] }
    ];
    /** @nocollapse */
    DfpAudiencePixelDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef }
    ]; };
    DfpAudiencePixelDirective.propDecorators = {
        adUnit: [{ type: Input }],
        segmentId: [{ type: Input }],
        ppid: [{ type: Input }]
    };
    return DfpAudiencePixelDirective;
}());
export { DfpAudiencePixelDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUNyQixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRDtJQVNFLG1DQUMrQixVQUFrQixFQUN2QyxVQUFzQjtRQURELGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM1QixDQUFDOzs7O0lBRUwsNENBQVE7OztJQUFSO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O2dCQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTs7Z0JBQ3hCLE1BQU0sR0FBRyxJQUFJLEdBQUcsY0FBYzs7Z0JBRTVCLE1BQU0sR0FBRyxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLE1BQU0sR0FBRyxXQUFTLElBQUksQ0FBQyxNQUFRLENBQUM7YUFDakM7O2dCQUVHLElBQUksR0FBRyxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksR0FBRyxVQUFRLElBQUksQ0FBQyxJQUFNLENBQUM7YUFDNUI7O2dCQUVLLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUUzQyxLQUFLLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1lBQzdELEtBQUssQ0FBQyxHQUFHLElBQU8sTUFBTSxnQkFBVyxJQUFJLENBQUMsU0FBUyxTQUFJLE1BQU0sR0FBRyxJQUFNLENBQUM7WUFFbkUsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFbkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRWxDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7O2dCQTFDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7Ozs7Z0JBUTRDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO2dCQWxCVixVQUFVOzs7eUJBYXBCLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOztJQW9DUixnQ0FBQztDQUFBLEFBM0NELElBMkNDO1NBeENZLHlCQUF5Qjs7O0lBRXBDLDJDQUF3Qjs7SUFDeEIsOENBQTJCOztJQUMzQix5Q0FBc0I7Ozs7O0lBR3BCLCtDQUErQzs7Ozs7SUFDL0MsK0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBJbmplY3QsXG4gIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkZnAtYXVkaWVuY2UtcGl4ZWwnXG59KVxuZXhwb3J0IGNsYXNzIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xuICBASW5wdXQoKSBzZWdtZW50SWQ6IG51bWJlcjtcbiAgQElucHV0KCkgcHBpZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCBheGVsID0gTWF0aC5yYW5kb20oKSxcbiAgICAgICAgcmFuZG9tID0gYXhlbCAqIDEwMDAwMDAwMDAwMDAwO1xuXG4gICAgICBsZXQgYWRVbml0ID0gJyc7XG4gICAgICBpZiAodGhpcy5hZFVuaXQpIHtcbiAgICAgICAgYWRVbml0ID0gYGRjX2l1PSR7dGhpcy5hZFVuaXR9YDtcbiAgICAgIH1cblxuICAgICAgbGV0IHBwaWQgPSAnJztcbiAgICAgIGlmICh0aGlzLnBwaWQpIHtcbiAgICAgICAgcHBpZCA9IGBwcGlkPSR7dGhpcy5wcGlkfWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBpeGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgIHBpeGVsLnNyYyA9ICdodHRwczovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9hY3Rpdml0eTtvcmQ9JztcbiAgICAgIHBpeGVsLnNyYyArPSBgJHtyYW5kb219O2RjX3NlZz0ke3RoaXMuc2VnbWVudElkfTske2FkVW5pdH0ke3BwaWR9YDtcblxuICAgICAgcGl4ZWwud2lkdGggPSAxO1xuICAgICAgcGl4ZWwuaGVpZ2h0ID0gMTtcbiAgICAgIHBpeGVsLmJvcmRlciA9ICcwJztcblxuICAgICAgcGl4ZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmQocGl4ZWwpO1xuICAgIH1cbiAgfVxufVxuIl19