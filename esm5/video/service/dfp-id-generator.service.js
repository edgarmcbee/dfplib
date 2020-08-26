/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-id-generator.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var DfpIDGeneratorService = /** @class */ (function () {
    function DfpIDGeneratorService() {
        this.generatedIDs = {};
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    DfpIDGeneratorService.prototype.generateID = /**
     * @param {?=} type
     * @return {?}
     */
    function (type) {
        if (type === void 0) { type = 'dfp-ad'; }
        /** @type {?} */
        var id = null;
        do {
            /** @type {?} */
            var number = Math.random().toString().slice(2);
            id = type + '-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpIDGeneratorService.prototype.dfpIDGenerator = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        var id = this.generateID(element.tagName.toLowerCase());
        if (element) {
            element.id = id;
        }
        return id;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isTaken = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return id in this.generatedIDs;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isUnique = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return !this.isTaken(id);
    };
    DfpIDGeneratorService.decorators = [
        { type: Injectable }
    ];
    return DfpIDGeneratorService;
}());
export { DfpIDGeneratorService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DfpIDGeneratorService.prototype.generatedIDs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC92aWRlby8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBR1UsaUJBQVksR0FBRyxFQUFFLENBQUM7SUFrQzVCLENBQUM7Ozs7O0lBaENDLDBDQUFVOzs7O0lBQVYsVUFBVyxJQUFlO1FBQWYscUJBQUEsRUFBQSxlQUFlOztZQUNwQixFQUFFLEdBQUcsSUFBSTtRQUViLEdBQUc7O2dCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7U0FDMUIsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLE9BQW9CO1FBQ2pDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQy9ELE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQjs7WUFFSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pELElBQUksT0FBTyxFQUFFO1lBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUVqQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsdUNBQU87Ozs7SUFBUCxVQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLEVBQUU7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDOztnQkFuQ0YsVUFBVTs7SUFxQ1gsNEJBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXBDWSxxQkFBcUI7Ozs7OztJQUVoQyw2Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XG5cbiAgZ2VuZXJhdGVJRCh0eXBlID0gJ2RmcC1hZCcpIHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgICAgaWQgPSB0eXBlICsgJy0nICsgbnVtYmVyO1xuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgaXNUYWtlbihpZCkge1xuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcbiAgfVxuXG4gIGlzVW5pcXVlKGlkKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xuICB9XG5cbn1cbiJdfQ==