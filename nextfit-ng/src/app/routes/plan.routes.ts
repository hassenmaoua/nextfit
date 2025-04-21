import { Routes } from '@angular/router';
import { PlanRequestComponent } from '../components/plan-request/plan-request.component';
import { PlanViewerComponent } from '../components/plan-viewer/plan-viewer.component';
import { FormBuilderComponent } from '../components/form-builder/form-builder.component';

export default [
    { path: 'old/generate', component: PlanRequestComponent },
    { path: 'generate', component: FormBuilderComponent },
    { path: ':id', component: PlanViewerComponent }
] as Routes;
