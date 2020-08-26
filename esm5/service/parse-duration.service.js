/**
 * @fileoverview added by tsickle
 * Generated from: service/parse-duration.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DFPDurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPDurationError, _super);
    function DFPDurationError(interval) {
        return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
    }
    return DFPDurationError;
}(Error));
var ParseDurationService = /** @class */ (function () {
    function ParseDurationService() {
    }
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    ParseDurationService.prototype.convertToMilliseconds = /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    function (time, unit) {
        console.assert(/^(m?s|min|h)$/g.test(unit));
        if (unit === 'ms') {
            return time;
        }
        if (unit === 's') {
            return time * 1000;
        }
        if (unit === 'min') {
            return time * 60 * 1000;
        }
        return time * 60 * 60 * 1000;
    };
    /**
     * @param {?} match
     * @return {?}
     */
    ParseDurationService.prototype.convert = /**
     * @param {?} match
     * @return {?}
     */
    function (match) {
        /** @type {?} */
        var time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    };
    /**
     * @param {?} interval
     * @return {?}
     */
    ParseDurationService.prototype.parseDuration = /**
     * @param {?} interval
     * @return {?}
     */
    function (interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError("'" + interval + "' must be of number or string type");
        }
        /** @type {?} */
        var match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    };
    ParseDurationService.decorators = [
        { type: Injectable }
    ];
    return ParseDurationService;
}());
export { ParseDurationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUErQiw0Q0FBSztJQUNsQywwQkFBWSxRQUFRO2VBQ2xCLGtCQUFNLHdCQUFzQixRQUFRLFFBQUssQ0FBQztJQUM1QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBK0IsS0FBSyxHQUluQztBQUVEO0lBQUE7SUE0Q0EsQ0FBQzs7Ozs7O0lBekNDLG9EQUFxQjs7Ozs7SUFBckIsVUFBc0IsSUFBSSxFQUFFLElBQUk7UUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBQ25DLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUFFLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztTQUFFO1FBQ3pDLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUFFLE9BQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FBRTtRQUVoRCxPQUFPLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELHNDQUFPOzs7O0lBQVAsVUFBUSxLQUFLOztZQUNMLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBRXhDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxRQUFRO1FBRXBCLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFJLFFBQVEsdUNBQW9DLENBQUMsQ0FBQztTQUN2RTs7WUFFSyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQTFDRixVQUFVOztJQTRDWCwyQkFBQztDQUFBLEFBNUNELElBNENDO1NBM0NZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgREZQRHVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoaW50ZXJ2YWwpIHtcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlRHVyYXRpb25TZXJ2aWNlIHtcblxuICBjb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgdW5pdCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KC9eKG0/c3xtaW58aCkkL2cudGVzdCh1bml0KSk7XG5cbiAgICBpZiAodW5pdCA9PT0gJ21zJykgeyByZXR1cm4gdGltZTsgfVxuICAgIGlmICh1bml0ID09PSAncycpIHsgcmV0dXJuIHRpbWUgKiAxMDAwOyB9XG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XG5cbiAgICByZXR1cm4gdGltZSAqIDYwICogNjAgKiAxMDAwO1xuICB9XG5cbiAgY29udmVydChtYXRjaCkge1xuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcblxuICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDIpIHsgcmV0dXJuIHRpbWU7IH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCBtYXRjaFsyXSk7XG4gIH1cblxuICBwYXJzZUR1cmF0aW9uKGludGVydmFsKSB7XG5cbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xuICB9XG5cbn1cbiJdfQ==