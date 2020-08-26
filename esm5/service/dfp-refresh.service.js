/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-refresh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig } from '../class';
import { DFP_CONFIG } from './injection_token';
import { ParseDurationService } from './parse-duration.service';
var DFPRefreshError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPRefreshError, _super);
    function DFPRefreshError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPRefreshError;
}(Error));
var DfpRefreshService = /** @class */ (function () {
    function DfpRefreshService(config, inject, parseDuration) {
        this.config = config;
        this.inject = inject;
        this.parseDuration = parseDuration;
        this.refreshEvent = new EventEmitter();
        this.refreshSlots = [];
        this.intervals = {};
    }
    /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    DfpRefreshService.prototype.slotRefresh = /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    function (slot, refreshInterval, initRefresh) {
        var _this = this;
        if (initRefresh === void 0) { initRefresh = false; }
        /** @type {?} */
        var deferred = from([slot]).toPromise();
        /** @type {?} */
        var task = { slot: slot, deferred: deferred };
        deferred.then((/**
         * @return {?}
         */
        function () {
            if (_this.hasSlotInterval(slot)) {
                _this.cancelInterval(slot);
            }
            if (refreshInterval) {
                _this.addSlotInterval(task, refreshInterval);
            }
        }));
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                _this.refreshSlots.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    googletag.display(s.getSlotElementId());
                }));
                pubads.refresh(_this.refreshSlots);
                _this.refreshSlots = [];
            }));
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} slot
     * @return {THIS}
     */
    DfpRefreshService.prototype.cancelInterval = /**
     * @template THIS
     * @this {THIS}
     * @param {?} slot
     * @return {THIS}
     */
    function (slot) {
        if (!(/** @type {?} */ (this)).hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        var interval = (/** @type {?} */ (this)).intervals[(/** @type {?} */ (this)).slotIntervalKey(slot)];
        interval.unsubscribe();
        delete (/** @type {?} */ (this)).intervals[slot];
        return (/** @type {?} */ (this));
    };
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.hasSlotInterval = /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    };
    /**
     * @private
     * @param {?=} tasks
     * @return {?}
     */
    DfpRefreshService.prototype.refresh = /**
     * @private
     * @param {?=} tasks
     * @return {?}
     */
    function (tasks) {
        if (tasks === undefined) {
            googletag.cmd.push((/**
             * @return {?}
             */
            function () {
                googletag.pubads().refresh();
            }));
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push((/**
         * @return {?}
         */
        function () {
            googletag.pubads().refresh(tasks.map((/**
             * @param {?} task
             * @return {?}
             */
            function (task) { return task.slot; })));
            tasks.forEach((/**
             * @param {?} task
             * @return {?}
             */
            function (task) {
                Promise.resolve(task.slot);
            }));
        }));
    };
    /**
     * @private
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    DfpRefreshService.prototype.addSlotInterval = /**
     * @private
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    function (task, interval) {
        var _this = this;
        /** @type {?} */
        var parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        var refresh = timer(parsedInterval, parsedInterval).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var doc = _this.inject.get(DOCUMENT);
            if (!_this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                _this.refresh([task]);
                _this.refreshEvent.emit(task.slot);
            }
        }));
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    };
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.slotIntervalKey = /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return slot.getSlotId().getDomId();
    };
    /**
     * @private
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    DfpRefreshService.prototype.validateInterval = /**
     * @private
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    function (milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpRefreshService.prototype.hiddenCheck = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (typeof (window) !== 'undefined' && element != null) {
            /** @type {?} */
            var css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    };
    DfpRefreshService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DfpRefreshService.ctorParameters = function () { return [
        { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
        { type: Injector },
        { type: ParseDurationService }
    ]; };
    return DfpRefreshService;
}());
export { DfpRefreshService };
if (false) {
    /** @type {?} */
    DfpRefreshService.prototype.refreshEvent;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.refreshSlots;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.singleRequest;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.intervals;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.inject;
    /**
     * @type {?}
     * @private
     */
    DfpRefreshService.prototype.parseDuration;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTtJQUE4QiwyQ0FBSztJQUFuQzs7SUFBc0MsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUF2QyxDQUE4QixLQUFLLEdBQUk7QUFJdkM7SUFRRSwyQkFFVSxNQUFpQixFQUNqQixNQUFnQixFQUNoQixhQUFtQztRQUZuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVDdDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQU9uQixDQUFDOzs7Ozs7O0lBRUwsdUNBQVc7Ozs7OztJQUFYLFVBQVksSUFBSSxFQUFFLGVBQWdCLEVBQUUsV0FBbUI7UUFBdkQsaUJBbUNDO1FBbkNtQyw0QkFBQSxFQUFBLG1CQUFtQjs7WUFDL0MsUUFBUSxHQUFpQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMs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LG1DQUF3Qjs7Ozs7SUFDeEIsMENBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCwgSW5qZWN0b3IsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XG5cbmNsYXNzIERGUFJlZnJlc2hFcnJvciBleHRlbmRzIEVycm9yIHsgfVxuXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoU2VydmljZSB7XG5cbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSByZWZyZXNoU2xvdHMgPSBbXTtcbiAgcHJpdmF0ZSBzaW5nbGVSZXF1ZXN0OiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxuICAgIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcbiAgKSB7IH1cblxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVmZXJyZWQ6IFByb21pc2U8YW55PiA9IGZyb20oW3Nsb3RdKS50b1Byb21pc2UoKSxcbiAgICAgIHRhc2sgPSB7IHNsb3Q6IHNsb3QsIGRlZmVycmVkOiBkZWZlcnJlZCB9O1xuXG4gICAgZGVmZXJyZWQudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSA9PT0gdHJ1ZSAmJiBpbml0UmVmcmVzaCkge1xuICAgICAgLy8gVXNlIGEgdGltZXIgdG8gaGFuZGxlIHJlZnJlc2ggb2YgYSBzaW5nbGUgcmVxdWVzdCBtb2RlXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xuICAgICAgaWYgKHRoaXMuc2luZ2xlUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVSZXF1ZXN0LmNsb3NlZCkge1xuICAgICAgICB0aGlzLnNpbmdsZVJlcXVlc3QudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdCA9IHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xuICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwdWJhZHMucmVmcmVzaCh0aGlzLnJlZnJlc2hTbG90cyk7XG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xuICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuICB9XG5cbiAgY2FuY2VsSW50ZXJ2YWwoc2xvdCkge1xuICAgIGlmICghdGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcbiAgICBpbnRlcnZhbC51bnN1YnNjcmliZSgpO1xuICAgIGRlbGV0ZSB0aGlzLmludGVydmFsc1tzbG90XTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTbG90SW50ZXJ2YWwoc2xvdCkge1xuICAgIHJldHVybiB0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KSBpbiB0aGlzLmludGVydmFscztcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCh0YXNrcz8pIHtcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0YXNrcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2godGFza3MubWFwKHRhc2sgPT4gdGFzay5zbG90KSk7XG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTbG90SW50ZXJ2YWwodGFzaywgaW50ZXJ2YWwpIHtcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcbiAgICB0aGlzLnZhbGlkYXRlSW50ZXJ2YWwocGFyc2VkSW50ZXJ2YWwsIGludGVydmFsKTtcblxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmluamVjdC5nZXQoRE9DVU1FTlQpO1xuICAgICAgaWYgKCF0aGlzLmhpZGRlbkNoZWNrKGRvYy5nZXRFbGVtZW50QnlJZCh0YXNrLnNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKSkpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEV2ZW50LmVtaXQodGFzay5zbG90KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHRhc2suc2xvdCldID0gcmVmcmVzaDtcblxuICAgIHJldHVybiByZWZyZXNoO1xuICB9XG5cbiAgcHJpdmF0ZSBzbG90SW50ZXJ2YWxLZXkoc2xvdCkge1xuICAgIHJldHVybiBzbG90LmdldFNsb3RJZCgpLmdldERvbUlkKCk7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlSW50ZXJ2YWwobWlsbGlzZWNvbmRzLCBiZWZvcmVQYXJzaW5nKSB7XG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FyZWZ1bDogJHtiZWZvcmVQYXJzaW5nfSBpcyBxdWl0ZSBhIGxvdyBpbnRlcnZhbCEnKTtcbiAgICB9XG4gIH1cblxuICBoaWRkZW5DaGVjayhlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=