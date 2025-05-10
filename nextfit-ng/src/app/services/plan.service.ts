import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan, PlanLevel, PlanType } from '../models/plan';
import { PlanDTO } from '../models/dto';
import { BasicPlanRequest, MealPlanRequest, NutritionPlanRequest, PlanRequest, PremiumPlanRequest } from '../models/requests';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    private readonly apiUrl = `${environment.apiUrl}/plans`;

    constructor(private readonly http: HttpClient) {}

    generatePlan(request: PlanRequest): Observable<PlanDTO> {
        return this.http.post<PlanDTO>(`${this.apiUrl}/generate`, request);
    }

    getPlanById<T extends PlanType>(planId: number): Observable<Plan<T>> {
        return this.http.get<Plan<T>>(`${this.apiUrl}/${planId}`);
    }

    getAllPlansByUser(): Observable<PlanDTO[]> {
        return this.http.get<PlanDTO[]>(this.apiUrl);
    }

    updatePlan(planId: number, content: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${planId}`, content);
    }

    deletePlan(planId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${planId}`);
    }

    // Optional: strong-typed helpers if needed for advanced forms
    generateBasicPlan(request: BasicPlanRequest): Observable<PlanDTO> {
        return this.generatePlan({ ...request, level: PlanLevel.BASIC });
    }

    generateMealPlan(request: MealPlanRequest): Observable<PlanDTO> {
        return this.generatePlan({ ...request, level: PlanLevel.MEAL });
    }

    generateDualPlan(formData: any): Observable<PlanDTO> {
        const basicRequest: BasicPlanRequest = { ...formData };
        const mealRequest: MealPlanRequest = { ...formData };

        const request = {
            basicPlan: { level: PlanLevel.BASIC, ...basicRequest },
            mealPlan: { level: PlanLevel.MEAL, ...mealRequest }
        };

        return this.generatePlan({ ...request, level: PlanLevel.DUAL });
    }

    generateNutritionPlan(request: NutritionPlanRequest): Observable<PlanDTO> {
        return this.generatePlan({ ...request, level: PlanLevel.NUTRITION });
    }

    generatePremiumPlan(request: PremiumPlanRequest): Observable<PlanDTO> {
        return this.generatePlan({ ...request, level: PlanLevel.PREMIUM });
    }
}
