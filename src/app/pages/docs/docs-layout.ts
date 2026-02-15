import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  available: boolean;
}

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="docs-shell">
      <!-- Top bar -->
      <header class="docs-topbar">
        <div class="docs-topbar-left">
          <button class="docs-menu-btn" (click)="toggleSidebar()" aria-label="Toggle sidebar">
            <svg *ngIf="!sidebarOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg *ngIf="sidebarOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <a routerLink="/" class="docs-logo">
            <img src="imgs/logo/logo.png" alt="Angify" class="docs-logo-img" />
          </a>
          <span class="docs-topbar-separator"></span>
          <span class="docs-topbar-title">Docs</span>
          <span class="docs-topbar-version">v1.1.0</span>
        </div>
        <div class="docs-topbar-center">
          <div class="docs-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span>Search docs...</span>
            <kbd>Ctrl K</kbd>
          </div>
        </div>
        <div class="docs-topbar-right">
          <a routerLink="/" class="docs-topbar-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </a>
          <a href="https://www.npmjs.com/package/@angify/workspace" target="_blank" class="docs-topbar-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </a>
          <a href="https://github.com/angify" target="_blank" class="docs-topbar-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </header>

      <div class="docs-body">
        <!-- Mobile overlay -->
        <div class="docs-sidebar-overlay" *ngIf="sidebarOpen" (click)="closeSidebar()"></div>
        <!-- Sidebar -->
        <aside class="docs-sidebar" [class.open]="sidebarOpen">
          <div class="docs-sidebar-inner">
            <div class="docs-sidebar-section">
              <span class="docs-sidebar-label">Getting Started</span>
              <a routerLink="/docs/overview" routerLinkActive="active" class="docs-sidebar-link" (click)="closeSidebar()">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Overview
              </a>
            </div>

            <div class="docs-sidebar-section">
              <span class="docs-sidebar-label">Packages</span>
              @for (item of sidebarItems; track item.route) {
                @if (item.available) {
                  <a [routerLink]="item.route" routerLinkActive="active" class="docs-sidebar-link" (click)="closeSidebar()">
                    <span class="docs-sidebar-dot available"></span>
                    {{ item.label }}
                  </a>
                } @else {
                  <a [routerLink]="item.route" routerLinkActive="active" class="docs-sidebar-link disabled" (click)="closeSidebar()">
                    <span class="docs-sidebar-dot"></span>
                    {{ item.label }}
                    <span class="docs-soon-badge">Soon</span>
                  </a>
                }
              }
            </div>
          </div>
        </aside>

        <!-- Content -->
        <main class="docs-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .docs-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #fafafa;
    }

    /* Top bar */
    .docs-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 20px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .docs-topbar-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .docs-topbar-separator {
      width: 1px;
      height: 20px;
      background: #e0e0e0;
      margin: 0 2px;
    }

    .docs-topbar-title {
      font-size: 13px;
      font-weight: 700;
      color: #1a1a2e;
      letter-spacing: -0.2px;
    }

    .docs-topbar-version {
      font-size: 10px;
      font-weight: 700;
      color: #ed1c25;
      background: #fef2f2;
      padding: 2px 7px;
      border-radius: 5px;
      letter-spacing: 0.2px;
    }

    .docs-topbar-center {
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 0 24px;
    }

    .docs-search {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 14px;
      border-radius: 10px;
      border: 1px solid #e8e8ed;
      background: #f8f8fa;
      color: #a0a0b0;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      max-width: 280px;
      width: 100%;
    }

    .docs-search:hover {
      border-color: #d0d0d8;
      background: #f0f0f5;
      color: #6b6b80;
    }

    .docs-search kbd {
      margin-left: auto;
      font-size: 10px;
      font-weight: 600;
      font-family: inherit;
      color: #b0b0b8;
      background: #fff;
      border: 1px solid #e8e8ed;
      padding: 1px 6px;
      border-radius: 4px;
      line-height: 1.6;
    }

    .docs-menu-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #525252;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .docs-menu-btn:hover {
      background: #f5f5f5;
      color: #141414;
    }

    .docs-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .docs-logo-img {
      height: 40px;
      width: auto;
    }

    .docs-topbar-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .docs-topbar-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      color: #737380;
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .docs-topbar-link:hover {
      background: #f0f0f5;
      color: #1a1a2e;
    }

    /* Body */
    .docs-body {
      display: flex;
      flex: 1;
    }

    /* Sidebar */
    .docs-sidebar {
      width: 260px;
      flex-shrink: 0;
      background: #fff;
      border-right: 1px solid #e5e5e5;
      position: sticky;
      top: 56px;
      height: calc(100vh - 56px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #d4d4d4 transparent;
    }

    .docs-sidebar-inner {
      padding: 20px 16px;
    }

    .docs-sidebar-section {
      margin-bottom: 24px;
    }

    .docs-sidebar-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #a3a3a3;
      padding: 0 12px;
      margin-bottom: 8px;
    }

    .docs-sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #525252;
      text-decoration: none;
      transition: all 0.12s ease;
      position: relative;
    }

    .docs-sidebar-link:hover {
      background: #f5f5f5;
      color: #141414;
    }

    .docs-sidebar-link.active {
      background: #fef2f2;
      color: #ed1c25;
      font-weight: 600;
    }

    .docs-sidebar-link.disabled {
      color: #a3a3a3;
    }

    .docs-sidebar-link.disabled:hover {
      background: #fafafa;
      color: #737373;
    }

    .docs-sidebar-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #d4d4d4;
      flex-shrink: 0;
    }

    .docs-sidebar-dot.available {
      background: #ed1c25;
    }

    .docs-soon-badge {
      margin-left: auto;
      font-size: 10px;
      font-weight: 700;
      color: #a3a3a3;
      background: #f5f5f5;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    /* Content */
    .docs-content {
      flex: 1;
      min-width: 0;
      padding: 32px 48px;
    }

    /* Sidebar overlay (mobile) */
    .docs-sidebar-overlay {
      display: none;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .docs-menu-btn {
        display: flex;
      }

      .docs-topbar-center {
        display: none;
      }

      .docs-topbar-separator,
      .docs-topbar-title,
      .docs-topbar-version {
        display: none;
      }

      .docs-sidebar {
        position: fixed;
        top: 56px;
        left: 0;
        bottom: 0;
        z-index: 40;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        box-shadow: none;
      }

      .docs-sidebar.open {
        transform: translateX(0);
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
      }

      .docs-sidebar-overlay {
        display: block;
        position: fixed;
        inset: 0;
        top: 56px;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(2px);
        z-index: 35;
      }

      .docs-content {
        padding: 20px 16px;
      }
    }
  `]
})
export class DocsLayoutComponent {
  sidebarOpen = false;

  sidebarItems: SidebarItem[] = [
    { label: 'Kanban Board', icon: '', route: '/docs/kanban', available: true },
    { label: 'Form Builder', icon: '', route: '/docs/form-builder', available: false },
    { label: 'Data Table', icon: '', route: '/docs/data-table', available: false },
    { label: 'Scheduler', icon: '', route: '/docs/scheduler', available: false },
  ];

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
