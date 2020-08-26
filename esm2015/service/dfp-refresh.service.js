/**
 * @fileoverview added by tsickle
 * Generated from: service/dfp-refresh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig } from '../class';
import { DFP_CONFIG } from './injection_token';
import { ParseDurationService } from './parse-duration.service';
class DFPRefreshError extends Error {
}
export class DfpRefreshService {
    /**
     * @param {?} config
     * @param {?} inject
     * @param {?} parseDuration
     */
    constructor(config, inject, parseDuration) {
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
    slotRefresh(slot, refreshInterval, initRefresh = false) {
        /** @type {?} */
        const deferred = from([slot]).toPromise();
        /** @type {?} */
        const task = { slot: slot, deferred: deferred };
        deferred.then((/**
         * @return {?}
         */
        () => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
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
            () => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    googletag.display(s.getSlotElementId());
                }));
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            }));
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} slot
     * @return {THIS}
     */
    cancelInterval(slot) {
        if (!(/** @type {?} */ (this)).hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = (/** @type {?} */ (this)).intervals[(/** @type {?} */ (this)).slotIntervalKey(slot)];
        interval.unsubscribe();
        delete (/** @type {?} */ (this)).intervals[slot];
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @private
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push((/**
             * @return {?}
             */
            () => {
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
        () => {
            googletag.pubads().refresh(tasks.map((/**
             * @param {?} task
             * @return {?}
             */
            task => task.slot)));
            tasks.forEach((/**
             * @param {?} task
             * @return {?}
             */
            task => {
                Promise.resolve(task.slot);
            }));
        }));
    }
    /**
     * @private
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        }));
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @private
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @private
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    validateInterval(milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    hiddenCheck(element) {
        if (typeof (window) !== 'undefined' && element != null) {
            /** @type {?} */
            const css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    }
}
DfpRefreshService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DfpRefreshService.ctorParameters = () => [
    { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
    { type: Injector },
    { type: ParseDurationService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLE1BQU0sZUFBZ0IsU0FBUSxLQUFLO0NBQUk7QUFLdkMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBTzVCLFlBRVUsTUFBaUIsRUFDakIsTUFBZ0IsRUFDaEIsYUFBbUM7UUFGbkMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQVQ3QyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFPbkIsQ0FBQzs7Ozs7OztJQUVMLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBZ0IsRUFBRSxXQUFXLEdBQUcsS0FBSzs7Y0FDL0MsUUFBUSxHQUFpQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTs7Y0FDckQsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFR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QUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLElBQUk7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVPLGdCQUFnQixDQUFDLFlBQVksRUFBRSxhQUFhO1FBQ2xELElBQUksWUFBWSxHQUFHLElBQUksRUFBRTtZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFnQjtRQUMxQixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTs7a0JBQ2hELEdBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1lBQzVDLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU0sSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQTNIRixVQUFVOzs7O1lBUkYsU0FBUyx1QkFpQmIsUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVO1lBdEJXLFFBQVE7WUFPNUMsb0JBQW9COzs7O0lBUzNCLHlDQUFxRDs7Ozs7SUFDckQseUNBQTBCOzs7OztJQUMxQiwwQ0FBb0M7Ozs7O0lBQ3BDLHNDQUF1Qjs7Ozs7SUFHckIsbUNBQ3lCOzs7OztJQUN6QixtQ0FBd0I7Ozs7O0lBQ3hCLDBDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwsIEluamVjdG9yLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciwgZnJvbSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xuXG5jbGFzcyBERlBSZWZyZXNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cblxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaFNlcnZpY2Uge1xuXG4gIHJlZnJlc2hFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVmcmVzaFNsb3RzID0gW107XG4gIHByaXZhdGUgc2luZ2xlUmVxdWVzdDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGludGVydmFscyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREZQX0NPTkZJRylcbiAgICBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcbiAgICBwcml2YXRlIHBhcnNlRHVyYXRpb246IFBhcnNlRHVyYXRpb25TZXJ2aWNlXG4gICkgeyB9XG5cbiAgc2xvdFJlZnJlc2goc2xvdCwgcmVmcmVzaEludGVydmFsPywgaW5pdFJlZnJlc2ggPSBmYWxzZSkge1xuICAgIGNvbnN0IGRlZmVycmVkOiBQcm9taXNlPGFueT4gPSBmcm9tKFtzbG90XSkudG9Qcm9taXNlKCksXG4gICAgICB0YXNrID0geyBzbG90OiBzbG90LCBkZWZlcnJlZDogZGVmZXJyZWQgfTtcblxuICAgIGRlZmVycmVkLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsSW50ZXJ2YWwoc2xvdCk7XG4gICAgICB9XG4gICAgICBpZiAocmVmcmVzaEludGVydmFsKSB7XG4gICAgICAgIHRoaXMuYWRkU2xvdEludGVydmFsKHRhc2ssIHJlZnJlc2hJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgPT09IHRydWUgJiYgaW5pdFJlZnJlc2gpIHtcbiAgICAgIC8vIFVzZSBhIHRpbWVyIHRvIGhhbmRsZSByZWZyZXNoIG9mIGEgc2luZ2xlIHJlcXVlc3QgbW9kZVxuICAgICAgdGhpcy5yZWZyZXNoU2xvdHMucHVzaChzbG90KTtcbiAgICAgIGlmICh0aGlzLnNpbmdsZVJlcXVlc3QgJiYgIXRoaXMuc2luZ2xlUmVxdWVzdC5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNpbmdsZVJlcXVlc3QgPSB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcbiAgICAgICAgcHViYWRzLmVuYWJsZVNpbmdsZVJlcXVlc3QoKTtcbiAgICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgZ29vZ2xldGFnLmRpc3BsYXkocy5nZXRTbG90RWxlbWVudElkKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHViYWRzLnJlZnJlc2godGhpcy5yZWZyZXNoU2xvdHMpO1xuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cyA9IFtdO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcbiAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZlcnJlZDtcbiAgfVxuXG4gIGNhbmNlbEludGVydmFsKHNsb3QpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XG4gICAgICB0aHJvdyBuZXcgREZQUmVmcmVzaEVycm9yKCdObyBpbnRlcnZhbCBmb3IgZ2l2ZW4gc2xvdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVydmFsOiBTdWJzY3JpcHRpb24gPSB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KV07XG4gICAgaW50ZXJ2YWwudW5zdWJzY3JpYmUoKTtcbiAgICBkZWxldGUgdGhpcy5pbnRlcnZhbHNbc2xvdF07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgaGFzU2xvdEludGVydmFsKHNsb3QpIHtcbiAgICByZXR1cm4gdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCkgaW4gdGhpcy5pbnRlcnZhbHM7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2godGFza3M/KSB7XG4gICAgaWYgKHRhc2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XG4gICAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGFza3MubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKHRhc2tzLm1hcCh0YXNrID0+IHRhc2suc2xvdCkpO1xuICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRhc2suc2xvdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkU2xvdEludGVydmFsKHRhc2ssIGludGVydmFsKSB7XG4gICAgY29uc3QgcGFyc2VkSW50ZXJ2YWwgPSB0aGlzLnBhcnNlRHVyYXRpb24ucGFyc2VEdXJhdGlvbihpbnRlcnZhbCk7XG4gICAgdGhpcy52YWxpZGF0ZUludGVydmFsKHBhcnNlZEludGVydmFsLCBpbnRlcnZhbCk7XG5cbiAgICBjb25zdCByZWZyZXNoID0gdGltZXIocGFyc2VkSW50ZXJ2YWwsIHBhcnNlZEludGVydmFsKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5pbmplY3QuZ2V0KERPQ1VNRU5UKTtcbiAgICAgIGlmICghdGhpcy5oaWRkZW5DaGVjayhkb2MuZ2V0RWxlbWVudEJ5SWQodGFzay5zbG90LmdldFNsb3RFbGVtZW50SWQoKSkpKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xuICAgICAgICB0aGlzLnJlZnJlc2hFdmVudC5lbWl0KHRhc2suc2xvdCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleSh0YXNrLnNsb3QpXSA9IHJlZnJlc2g7XG5cbiAgICByZXR1cm4gcmVmcmVzaDtcbiAgfVxuXG4gIHByaXZhdGUgc2xvdEludGVydmFsS2V5KHNsb3QpIHtcbiAgICByZXR1cm4gc2xvdC5nZXRTbG90SWQoKS5nZXREb21JZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUludGVydmFsKG1pbGxpc2Vjb25kcywgYmVmb3JlUGFyc2luZykge1xuICAgIGlmIChtaWxsaXNlY29uZHMgPCAxMDAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NhcmVmdWw6ICR7YmVmb3JlUGFyc2luZ30gaXMgcXVpdGUgYSBsb3cgaW50ZXJ2YWwhJyk7XG4gICAgfVxuICB9XG5cbiAgaGlkZGVuQ2hlY2soZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmIGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICBpZiAoY3NzLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGRlbkNoZWNrKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19