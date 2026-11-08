import { Routes } from '@angular/router';

import { questionnaireCompleteGuard } from './core/guards/questionnaire-complete.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'CafeScout — Find your next favourite café',
    loadComponent: () => import('./features/welcome/welcome.component').then((m) => m.WelcomeComponent),
  },
  {
    path: 'quiz',
    title: 'Your café questions — CafeScout',
    loadComponent: () =>
      import('./features/questionnaire/questionnaire.component').then((m) => m.QuestionnaireComponent),
  },
  {
    path: 'result',
    title: 'Your café match — CafeScout',
    canActivate: [questionnaireCompleteGuard],
    loadComponent: () => import('./features/result/result.component').then((m) => m.ResultComponent),
  },
  {
    path: 'shop/:id',
    title: 'Café details — CafeScout',
    canActivate: [questionnaireCompleteGuard],
    loadComponent: () =>
      import('./features/shop-detail/shop-detail.component').then((m) => m.ShopDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
