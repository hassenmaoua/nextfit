import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    private readonly storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return route.routeConfig?.path === ''; // Only reuse the root route (AppLayout)
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRoutes.set(route.routeConfig?.path ?? '', handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path ?? '');
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return route.routeConfig ? (this.storedRoutes.get(route.routeConfig.path ?? '') as DetachedRouteHandle) : null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
