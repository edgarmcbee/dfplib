/**
 * @fileoverview added by tsickle
 * Generated from: service/parse-duration.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
class DFPDurationError extends Error {
    /**
     * @param {?} interval
     */
    constructor(interval) {
        super(`Invalid interval: '${interval}'ls`);
    }
}
export class ParseDurationService {
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    convertToMilliseconds(time, unit) {
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
    }
    /**
     * @param {?} match
     * @return {?}
     */
    convert(match) {
        /** @type {?} */
        const time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    }
    /**
     * @param {?} interval
     * @return {?}
     */
    parseDuration(interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError(`'${interval}' must be of number or string type`);
        }
        /** @type {?} */
        const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    }
}
ParseDurationService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE1BQU0sZ0JBQWlCLFNBQVEsS0FBSzs7OztJQUNsQyxZQUFZLFFBQVE7UUFDbEIsS0FBSyxDQUFDLHNCQUFzQixRQUFRLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQUUvQixxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDbkMsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQUUsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDekMsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUFFO1FBRWhELE9BQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQUs7O2NBQ0wsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFeEMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFFBQVE7UUFFcEIsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDL0MsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksUUFBUSxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3ZFOztjQUVLLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDO1FBRTNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7O1lBMUNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNsYXNzIERGUER1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGludGVydmFsKSB7XG4gICAgc3VwZXIoYEludmFsaWQgaW50ZXJ2YWw6ICcke2ludGVydmFsfSdsc2ApO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYXJzZUR1cmF0aW9uU2VydmljZSB7XG5cbiAgY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIHVuaXQpIHtcbiAgICBjb25zb2xlLmFzc2VydCgvXihtP3N8bWlufGgpJC9nLnRlc3QodW5pdCkpO1xuXG4gICAgaWYgKHVuaXQgPT09ICdtcycpIHsgcmV0dXJuIHRpbWU7IH1cbiAgICBpZiAodW5pdCA9PT0gJ3MnKSB7IHJldHVybiB0aW1lICogMTAwMDsgfVxuICAgIGlmICh1bml0ID09PSAnbWluJykgeyByZXR1cm4gdGltZSAqIDYwICogMTAwMDsgfVxuXG4gICAgcmV0dXJuIHRpbWUgKiA2MCAqIDYwICogMTAwMDtcbiAgfVxuXG4gIGNvbnZlcnQobWF0Y2gpIHtcbiAgICBjb25zdCB0aW1lID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG5cbiAgICBpZiAobWF0Y2gubGVuZ3RoID09PSAyKSB7IHJldHVybiB0aW1lOyB9XG5cbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgbWF0Y2hbMl0pO1xuICB9XG5cbiAgcGFyc2VEdXJhdGlvbihpbnRlcnZhbCkge1xuXG4gICAgaWYgKGludGVydmFsID09PSB1bmRlZmluZWQgfHwgaW50ZXJ2YWwgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBERlBEdXJhdGlvbkVycm9yKGludGVydmFsKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGludGVydmFsID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGludGVydmFsO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAnJHtpbnRlcnZhbH0nIG11c3QgYmUgb2YgbnVtYmVyIG9yIHN0cmluZyB0eXBlYCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2ggPSBpbnRlcnZhbC5tYXRjaCgvKCg/OlxcZCspPy4/XFxkKykobT9zfG1pbnxoKT8vKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBERlBEdXJhdGlvbkVycm9yKGludGVydmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0KG1hdGNoKTtcbiAgfVxuXG59XG4iXX0=