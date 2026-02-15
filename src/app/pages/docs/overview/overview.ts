import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docs-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="ov-header">
      <h1 class="ov-title">Angify Packages</h1>
      <p class="ov-subtitle">A suite of high-performance Angular packages for building enterprise-ready applications. Pick what you need — each package works independently or together.</p>
    </div>

    <div class="ov-grid">
      <!-- Kanban -->
      <a routerLink="/docs/kanban" class="ov-card available">
        <div class="ov-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></svg>
        </div>
        <div class="ov-card-body">
          <div class="ov-card-head">
            <h3>Kanban Board</h3>
            <span class="ov-status live">Available</span>
          </div>
          <p>Kanban, List, and Gantt views with drag-and-drop, configurable themes, and event-driven API sync.</p>
          <code class="ov-pkg">&#64;angify/workspace</code>
        </div>
      </a>

      <!-- Form Builder -->
      <div class="ov-card">
        <div class="ov-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
        </div>
        <div class="ov-card-body">
          <div class="ov-card-head">
            <h3>Form Builder</h3>
            <span class="ov-status soon">Coming Soon</span>
          </div>
          <p>Drag &amp; drop forms with conditional fields, dynamic validation rules, and a visual form designer.</p>
          <code class="ov-pkg dim">&#64;angify/forms</code>
        </div>
      </div>

      <!-- Data Table -->
      <div class="ov-card">
        <div class="ov-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/></svg>
        </div>
        <div class="ov-card-body">
          <div class="ov-card-head">
            <h3>Data Table</h3>
            <span class="ov-status soon">Coming Soon</span>
          </div>
          <p>Enterprise-ready tables with sorting, filtering, virtual scroll, inline editing, and export.</p>
          <code class="ov-pkg dim">&#64;angify/table</code>
        </div>
      </div>

      <!-- Scheduler -->
      <div class="ov-card">
        <div class="ov-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="ov-card-body">
          <div class="ov-card-head">
            <h3>Scheduler</h3>
            <span class="ov-status soon">Coming Soon</span>
          </div>
          <p>Multi-range timeline with draggable &amp; resizable slots, resource views, and recurring events.</p>
          <code class="ov-pkg dim">&#64;angify/scheduler</code>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ov-header { margin-bottom: 32px; }

    .ov-title {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: 800;
      color: #141414;
      letter-spacing: -0.5px;
    }

    .ov-subtitle {
      margin: 0;
      font-size: 16px;
      color: #737373;
      line-height: 1.6;
      max-width: 600px;
    }

    .ov-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .ov-card {
      display: flex;
      gap: 16px;
      padding: 20px;
      border-radius: 14px;
      border: 1px solid #e5e5e5;
      background: #fff;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .ov-card.available {
      cursor: pointer;
    }

    .ov-card.available:hover {
      border-color: rgba(237, 28, 37, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    }

    .ov-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #f5f5f5;
      color: #a3a3a3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .ov-card.available .ov-card-icon {
      background: #fef2f2;
      color: #ed1c25;
    }

    .ov-card-body { min-width: 0; }

    .ov-card-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .ov-card-head h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #141414;
    }

    .ov-card-body p {
      margin: 0 0 10px;
      font-size: 13px;
      color: #737373;
      line-height: 1.5;
    }

    .ov-status {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .ov-status.live {
      background: #dcfce7;
      color: #16a34a;
    }

    .ov-status.soon {
      background: #f5f5f5;
      color: #a3a3a3;
    }

    .ov-pkg {
      font-size: 12px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      color: #ed1c25;
      background: #fef2f2;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .ov-pkg.dim {
      color: #a3a3a3;
      background: #f5f5f5;
    }

    @media (max-width: 768px) {
      .ov-title {
        font-size: 24px;
      }

      .ov-subtitle {
        font-size: 14px;
      }

      .ov-grid {
        grid-template-columns: 1fr;
      }

      .ov-card {
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }

      .ov-card-head {
        flex-wrap: wrap;
      }
    }
  `]
})
export class OverviewComponent {}
