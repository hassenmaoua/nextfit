import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { DividerModule } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';
import { PlanDTO } from '../../models/dto';
import { MenuService } from '../service/menu.service';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, DividerModule, AppMenuitem, RouterModule, Skeleton, MenuModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <p-divider *ngIf="item.separator" />
        </ng-container>
        <ng-container *ngIf="isLoading">
            <li *ngFor="let item of skeletons" class="p-1">
                <p-skeleton height="18px" [width]="item + 'px'" styleClass="mb-2" />
            </li>
        </ng-container>
    </ul>`
})
export class AppMenu {
    model: MenuItem[] = [];
    plans: any[] = [];
    isLoading: boolean = false;
    ok = true;
    error: string | null = null;
    skeletons: any[] = [220, 180, 160, 190, 170, 150, 140];

    constructor(private menuSerivce: MenuService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Short cuts',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                    { label: 'Plan Generator', icon: 'pi pi-fw pi-comments', routerLink: ['/plans/generate'] },
                    { label: 'Plan Generator (OLD)', icon: 'pi pi-fw pi-comments', routerLink: ['/plans/old/generate'], disabled: true },
                    {
                        label: 'Premium Tools',
                        routerLink: '/empty',
                        icon: 'pi pi-star',
                        badge: 'PRO', // or `lock: true`

                        visible: true
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Recent plans'
            }
        ];
        this.isLoading = true;

        this.menuSerivce.plans$.subscribe((plans) => {
            this.handlePlansResponse(plans);
            this.isLoading = false;
        });

        this.menuSerivce.fetchPlans();
    }

    handlePlansResponse(plans: PlanDTO[]) {
        const items: MenuItem[] = plans.map((plan: PlanDTO) => ({
            label: plan.name,
            routerLink: ['/plans/' + plan.id],
            // queryParams: { id: plan.id }, // Add ID as query parameter
            queryParamsHandling: 'merge', // Preserve existing query params if any
            routerLinkActiveOptions: {
                paths: 'exact',
                queryParams: 'exact', // or 'subset' depending on your needs
                matrixParams: 'ignored',
                fragment: 'ignored'
            }
        }));
        this.model[2] = {
            label: 'Recent plans',
            items
        };
    }
}
