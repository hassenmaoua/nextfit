import { Injectable, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PlanDTO } from '../../models/dto';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService implements OnInit {
    // private fields
    private unsubscribe: Subscription[] = [];

    // public fields
    plans$!: Observable<PlanDTO[]>;
    plansSubject: BehaviorSubject<PlanDTO[]> = new BehaviorSubject<PlanDTO[]>([]);

    isLoading$!: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private planService: PlanService,
        private authService: AuthService
    ) {
        this.plans$ = this.plansSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit(): void {}

    fetchPlans() {
        const userId = this.authService.currentUser?.id;
        if (userId) {
            this.isLoadingSubject.next(true);
            this.planService.getAllPlansByUser().subscribe({
                next: (plans) => {
                    if (plans && plans.length > 0) {
                        this.plansSubject.next(plans);
                    }
                    this.isLoadingSubject.next(false);
                },
                error: (err) => {
                    console.error('Failed to fetch plans:', err);
                    this.isLoadingSubject.next(false);
                }
            });
        }
    }

    get plans(): PlanDTO[] {
        return this.plansSubject.value;
    }

    set plans(plans: PlanDTO[]) {
        this.plansSubject.next(plans);
    }

    set putPlan(plan: PlanDTO) {
        this.plansSubject.next([plan, ...this.plans]);
    }
}
