/**
 * @fileoverview added by tsickle
 * Generated from: service/http-error.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService() {
        this.isErrorCode = (/**
         * @param {?} code
         * @return {?}
         */
        function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        });
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    HttpErrorService.prototype.httpError = /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    function (response, message) {
        console.log("Error (" + response.status + ") " + (message ? message : ''));
    };
    HttpErrorService.decorators = [
        { type: Injectable }
    ];
    return HttpErrorService;
}());
export { HttpErrorService };
if (false) {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBT0UsZ0JBQVc7Ozs7UUFBRyxVQUFVLElBQUk7WUFDMUIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQ3pCLENBQUMsRUFBQztJQUVKLENBQUM7Ozs7OztJQVhDLG9DQUFTOzs7OztJQUFULFVBQVUsUUFBUSxFQUFFLE9BQU87UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLFFBQVEsQ0FBQyxNQUFNLFdBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Z0JBTEYsVUFBVTs7SUFjWCx1QkFBQztDQUFBLEFBZEQsSUFjQztTQWJZLGdCQUFnQjs7O0lBTTNCLHVDQUtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yU2VydmljZSB7XG5cbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yICgke3Jlc3BvbnNlLnN0YXR1c30pICR7bWVzc2FnZSA/IG1lc3NhZ2UgOiAnJ31gKTtcbiAgfVxuXG4gIGlzRXJyb3JDb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVbMF0gIT09ICcyJztcbiAgfTtcblxufVxuIl19