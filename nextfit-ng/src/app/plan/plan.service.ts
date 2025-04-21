import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan, Period, Task, PlanRequest } from './models/plan.model';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    private readonly API_URL = environment.apiUrl + '/plans';

    constructor(private http: HttpClient) {}

    // CREATE
    createPlan(planData: Partial<Plan>): Observable<Plan> {
        const params = new HttpParams().set('level', 'PREMIUM');
        return this.http.post<Plan>(this.API_URL, planData, { params });
    }

    // READ
    getPlanById(id: string): Observable<Plan> {
        return this.http.get<Plan>(`${this.API_URL}/${id}`);
    }

    getUserPlans(): Observable<Plan[]> {
        return this.http.get<Plan[]>(this.API_URL);
    }

    getPeriods(planId: string): Observable<Period[]> {
        return this.http.get<Period[]>(`${this.API_URL}/${planId}/periods`);
    }

    // UPDATE
    updatePlan(id: string, planData: Partial<Plan>): Observable<Plan> {
        return this.http.put<Plan>(`${this.API_URL}/${id}`, planData);
    }

    addPeriod(planId: string, periodData: Partial<Period>): Observable<Period> {
        return this.http.post<Period>(`${this.API_URL}/${planId}/periods`, periodData);
    }

    // DELETE
    deletePlan(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    // SPECIALIZED METHODS
    generateAIPlan(request: PlanRequest): Observable<any> {
        const params = new HttpParams().set('level', 'PREMIUM');
        return this.http
            .post<any>(`${this.API_URL}/generate`, request, { params })
            .pipe
            // TODO: use the loading servvice to trigger the loading
            ();
    }

    getTasksByType(planId: string, type: string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.API_URL}/${planId}/tasks`, {
            params: new HttpParams().set('type', type)
        });
    }

    // PROGRESS TRACKING
    markTaskComplete(planId: string, taskId: string): Observable<Task> {
        return this.http.patch<Task>(`${this.API_URL}/${planId}/tasks/${taskId}/complete`, {});
    }

    getPlanProgress(planId: string): Observable<{ completed: number; total: number }> {
        return this.http.get<{ completed: number; total: number }>(`${this.API_URL}/${planId}/progress`);
    }
}
