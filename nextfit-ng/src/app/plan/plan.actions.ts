import { createAction, props } from '@ngrx/store';
import { Plan, PlanRequest } from './models/plan.model';

export const loadPlans = createAction('[Plan] Load Plans');

export const loadPlansSuccess = createAction('[Plan] Load Plans Success', props<{ workouts: Plan[] }>());

export const loadPlansFailure = createAction('[Plan] Load Plans Failure', props<{ error: string }>());

export const createPlan = createAction('[Plan] Create Plan', props<{ request: PlanRequest }>());

export const createPlanSuccess = createAction('[Plan] Create Plan Success', props<{ plan: Plan }>());
