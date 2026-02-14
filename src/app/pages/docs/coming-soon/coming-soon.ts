import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cs-wrap">
      <div class="cs-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <h1 class="cs-title">Coming Soon</h1>
      <p class="cs-text">This package is currently under development. We're working hard to bring you a polished, production-ready solution.</p>
      <p class="cs-sub">In the meantime, check out the packages that are already available.</p>
      <a routerLink="/docs/kanban" class="cs-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></svg>
        Explore Kanban Board
      </a>
    </div>
  `,
  styles: [`
    .cs-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 24px;
    }

    .cs-icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: #f5f5f5;
      color: #a3a3a3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .cs-title {
      margin: 0 0 12px;
      font-size: 28px;
      font-weight: 800;
      color: #141414;
    }

    .cs-text {
      margin: 0 0 8px;
      font-size: 15px;
      color: #737373;
      max-width: 420px;
      line-height: 1.6;
    }

    .cs-sub {
      margin: 0 0 28px;
      font-size: 14px;
      color: #a3a3a3;
    }

    .cs-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 10px;
      background: #ed1c25;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .cs-btn:hover {
      background: #b01922;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(237, 28, 37, 0.25);
    }
  `]
})
export class ComingSoonComponent {}
