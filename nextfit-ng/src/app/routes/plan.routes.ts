import { Routes } from '@angular/router';
import { PlanViewerComponent } from '../components/plan-viewer/plan-viewer.component';
import { FormBuilderComponent } from '../components/form-builder/form-builder.component';

export default [
    { path: 'generate', component: FormBuilderComponent },
    { path: ':id', component: PlanViewerComponent }
] as Routes;
