/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-id-generator.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DfpIDGeneratorService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC92aWRlby8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8scUJBQXFCO0lBRGxDO1FBR1UsaUJBQVksR0FBRyxFQUFFLENBQUM7SUFrQzVCLENBQUM7Ozs7O0lBaENDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUTs7WUFDcEIsRUFBRSxHQUFHLElBQUk7UUFFYixHQUFHOztrQkFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEQsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQzFCLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFN0IsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxPQUFvQjtRQUNqQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvRCxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbkI7O2NBRUssRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6RCxJQUFJLE9BQU8sRUFBRTtZQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFFakMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxFQUFFO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7O1lBbkNGLFVBQVU7Ozs7Ozs7SUFHVCw2Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XG5cbiAgZ2VuZXJhdGVJRCh0eXBlID0gJ2RmcC1hZCcpIHtcbiAgICBsZXQgaWQgPSBudWxsO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgICAgaWQgPSB0eXBlICsgJy0nICsgbnVtYmVyO1xuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgaXNUYWtlbihpZCkge1xuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcbiAgfVxuXG4gIGlzVW5pcXVlKGlkKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xuICB9XG5cbn1cbiJdfQ==