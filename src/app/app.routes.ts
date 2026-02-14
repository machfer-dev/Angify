import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs-layout').then(m => m.DocsLayoutComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadComponent: () => import('./pages/docs/overview/overview').then(m => m.OverviewComponent) },
      { path: 'kanban', loadComponent: () => import('./pages/docs/kanban/kanban-docs').then(m => m.KanbanDocsComponent) },
      { path: 'form-builder', loadComponent: () => import('./pages/docs/coming-soon/coming-soon').then(m => m.ComingSoonComponent) },
      { path: 'data-table', loadComponent: () => import('./pages/docs/coming-soon/coming-soon').then(m => m.ComingSoonComponent) },
      { path: 'scheduler', loadComponent: () => import('./pages/docs/coming-soon/coming-soon').then(m => m.ComingSoonComponent) },
    ],
  },
];
