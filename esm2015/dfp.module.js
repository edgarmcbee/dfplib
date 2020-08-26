/**
 * @fileoverview added by tsickle
 * Generated from: dfp.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DFP_CONFIG } from './service/injection_token';
import { IdleService } from './service/idle.service';
import { HttpErrorService } from './service/http-error.service';
import { ParseDurationService } from './service/parse-duration.service';
import { ScriptInjectorService } from './service/script-injector.service';
import { DfpService } from './service/dfp.service';
import { DfpIDGeneratorService } from './service/dfp-id-generator.service';
import { DfpRefreshService } from './service/dfp-refresh.service';
import { DfpAdDirective } from './directive/dfp-ad.directive';
import { DfpSizeDirective } from './directive/dfp-size.directive';
import { DfpResponsiveDirective } from './directive/dfp-responsive.directive';
import { DfpAdResponsiveDirective } from './directive/dfp-ad-responsive.directive';
import { DfpTargetingDirective } from './directive/dfp-targeting.directive';
import { DfpExclusionDirective } from './directive/dfp-exclusion.directive';
import { DfpValueDirective } from './directive/dfp-value.directive';
import { DfpAudiencePixelDirective } from './directive/dfp-audience-pixel.directive';
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
export class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkZnAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O01BRS9FLFVBQVUsR0FBRztJQUNqQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0lBQy9ELHlCQUF5QjtDQUMxQjs7TUFFSyxRQUFRLEdBQUc7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixVQUFVLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0NBQ3JEO0FBZ0JELE1BQU0sT0FBTyxTQUFTOzs7OztJQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWtCO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7YUFDaEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBdkJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsRUFFUjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osR0FBRyxVQUFVO2lCQUNkO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxHQUFHLFFBQVE7aUJBQ1o7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLEdBQUcsVUFBVTtpQkFDZDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGZwQ29uZmlnLCB9IGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vc2VydmljZS9pbmplY3Rpb25fdG9rZW4nO1xuXG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9pZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9odHRwLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Uvc2NyaXB0LWluamVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGZwU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9kZnAuc2VydmljZSc7XG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwU2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1zaXplLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBFeGNsdXNpb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZnBWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC12YWx1ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hdWRpZW5jZS1waXhlbC5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBEZnBBZERpcmVjdGl2ZSxcbiAgRGZwU2l6ZURpcmVjdGl2ZSxcbiAgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSxcbiAgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlLFxuICBEZnBUYXJnZXRpbmdEaXJlY3RpdmUsIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSwgRGZwVmFsdWVEaXJlY3RpdmUsXG4gIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmVcbl07XG5cbmNvbnN0IFNFUlZJQ0VTID0gW1xuICBIdHRwRXJyb3JTZXJ2aWNlLFxuICBQYXJzZUR1cmF0aW9uU2VydmljZSxcbiAgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlLFxuICBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG5cbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLi4uRElSRUNUSVZFU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICAuLi5TRVJWSUNFU1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uRElSRUNUSVZFU1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIERmcE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IERmcENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGZwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLihjb25maWcgJiYgY29uZmlnLmlkbGVMb2FkID09PSB0cnVlID8gW0lkbGVTZXJ2aWNlXSA6IFtdKSxcbiAgICAgICAgeyBwcm92aWRlOiBERlBfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIHx8IHt9IH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=