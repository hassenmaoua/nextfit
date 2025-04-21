import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Menu } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { PanelModule } from 'primeng/panel';
import { Tooltip } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { BasicPlan, DualPlan, MealPlan, NutritionPlan, Plan, PlanLevel, PremiumPlan } from '../../models/plan';
import { PlanService } from '../../services/plan.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
    selector: 'app-plan-viewer',
    imports: [FormsModule, Skeleton, TreeModule, ProgressBarModule, ButtonModule, CardModule, CommonModule, DividerModule, PanelModule, ToastModule, TagModule, TableModule, TimelineModule, AccordionModule, SplitterModule, ScrollPanelModule],
    templateUrl: './plan-viewer.component.html',
    styleUrl: './plan-viewer.component.scss',
    providers: [MessageService]
})
export class PlanViewerComponent implements OnInit, OnDestroy {
    planId!: number;
    plan!: Plan<BasicPlan | MealPlan | DualPlan | NutritionPlan | PremiumPlan>;
    loading = true;
    error = false;
    isNewPlan = false;

    PlanLevel = PlanLevel;

    items: MenuItem[] = [];
    skeletonTree: TreeNode[] = [
        {
            data: '350px',
            expanded: true,
            loading: true,
            children: [
                {
                    data: '250px',
                    expanded: true
                },
                {
                    data: '200px',
                    expanded: true
                },
                {
                    data: '150px',
                    expanded: true
                }
            ]
        },
        {
            data: '300px',
            expanded: true,
            loading: true,
            children: [
                {
                    data: '250px',
                    expanded: true
                },
                {
                    data: '200px',
                    expanded: true
                },
                {
                    data: '150px',
                    expanded: true
                }
            ]
        },
        {
            data: '300px',
            expanded: true,
            loading: true,
            children: [
                {
                    data: '250px',
                    expanded: true
                },
                {
                    data: '200px',
                    expanded: true
                },
                {
                    data: '150px',
                    expanded: true
                }
            ]
        }
    ];
    Object: any;

    constructor(
        private cdr: ChangeDetectorRef,
        private planService: PlanService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.isNewPlan = !!this.route.snapshot.data['newPlan'];
        if (this.isNewPlan) {
            this.messageService.add({
                severity: 'success',
                summary: 'Welcome to Your New Plan!',
                detail: 'Start your journey below',
                life: 5000
            });
        }
        this.route.params.subscribe((params) => {
            const planId = params['id'];
            if (planId) {
                this.planId = planId;
                this.loadPlan(planId);
            }
        });
    }

    ngOnDestroy(): void {}

    isBasicPlan(plan: any): plan is BasicPlan {
        return 'workouts' in plan && !('diets' in plan) && !('nutrition' in plan);
    }

    isMealPlan(plan: any): plan is MealPlan {
        return !('workouts' in plan) && 'diets' in plan && !('nutrition' in plan);
    }

    isDualPlan(plan: any): plan is DualPlan {
        return 'workouts' in plan && 'diets' in plan && !('nutrition' in plan);
    }

    isNutritionPlan(plan: any): plan is NutritionPlan {
        return 'workouts' in plan && 'nutrition' in plan && !('diets' in plan);
    }

    isPremiumPlan(plan: any): plan is PremiumPlan {
        return 'workouts' in plan && 'diets' in plan && 'nutrition' in plan;
    }

    onMenuShow(index: number) {
        this.items = this.getMenuItems(index);
    }

    getNodeIcon(node: any): string {
        switch (node.data.type) {
            case 'day':
                return 'pi pi-calendar mr-2';
            case 'part':
                return node.expanded ? 'pi pi-folder-open mr-2' : 'pi pi-folder mr-2';
            default:
                return node.selected ? 'pi pi-check-circle text-primary' : 'pi pi-circle';
        }
    }

    getMenuItems(index: number): MenuItem[] {
        return [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh',
                command: (event) => this.refreshSchudle(event.item?.['index']),
                index
            },
            {
                label: 'Mark Complete',
                icon: 'pi pi-check',
                command: (event) => this.markSelectedComplete(event.item?.['index']),
                index
            },
            {
                label: 'Expand all',
                icon: 'pi pi-arrow-up-right-and-arrow-down-left-from-center',
                command: (event) => this.expandAll(event.item?.['index']),
                index
            },
            {
                label: 'Collaps all',
                icon: 'pi pi-arrow-down-left-and-arrow-up-right-to-center',
                command: (event) => this.collapseAll(event.item?.['index']),
                index
            },
            {
                label: 'Add Note',
                icon: 'pi pi-pencil',
                command: (event) => this.addNoteToSelected(event.item?.['index']),
                index
            }
        ];
    }

    private loadPlan(id: number): void {
        this.loading = true;
        this.loading = true;
        this.planService.getPlanById<BasicPlan | MealPlan | NutritionPlan | PremiumPlan>(id).subscribe({
            next: (plan: any) => {
                this.plan = plan;
                this.loading = false;
            },
            error: (err: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.message || 'Failed to load plan',
                    life: 5000
                });
                console.error(err.error);
                this.error = true;
                this.loading = false;
            }
        });
    }

    private refreshSchudle(index: any): void {
        console.log(index);
        // Implementation would refresh the schudle
    }

    // Context menu handlers
    private markSelectedComplete(index: number) {
        // Implementation would mark currently selected nodes as complete
    }

    private addNoteToSelected(index: number) {
        // Implementation would add notes to selected tasks
    }

    private expandAll(index: number) {
        // this.days[index].forEach((node) => {
        //     this.expandRecursive(node, true);
        // });
    }

    private collapseAll(index: number) {
        // this.days[index].forEach((node) => {
        //     this.expandRecursive(node, false);
        // });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
