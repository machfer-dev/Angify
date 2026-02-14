import { Component, OnInit, OnDestroy, NgZone, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BoardWorkspaceModule,
  BoardService,
  BoardViewType,
  BoardConfig,
} from '@angify/workspace';

interface DemoTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  startDate?: Date;
  endDate?: Date;
}

interface TocItem {
  id: string;
  label: string;
  children?: TocItem[];
}

@Component({
  selector: 'app-kanban-docs',
  standalone: true,
  imports: [CommonModule, BoardWorkspaceModule],
  template: `
    <div class="doc-layout">
      <div class="doc-main">
        <!-- Page header -->
        <div class="doc-header">
          <div class="doc-badge">&#64;angify/workspace</div>
          <h1 class="doc-title">Kanban Board</h1>
          <p class="doc-subtitle">
            A flexible board workspace with Kanban, List, and Gantt views. Drag-and-drop cards between columns,
            customize everything via config, and sync with your backend through events.
          </p>
        </div>

        <!-- Install -->
        <section class="doc-section" id="installation">
          <h2 class="doc-h2">Installation</h2>
          <p class="doc-text">Install the workspace library and its peer dependency <code>&#64;angular/cdk</code> for drag-and-drop support. Compatible with Angular 15 through 20.</p>
          <div class="doc-code-block">
            <div class="doc-code-header">Terminal</div>
            <pre class="doc-code"><code><span class="hl-fn">npm</span> <span class="hl-key">install</span> <span class="hl-str">&#64;angify/workspace</span> <span class="hl-str">&#64;angular/cdk</span></code></pre>
          </div>
        </section>

        <!-- Live Demo -->
        <section class="doc-section" id="live-demo">
          <h2 class="doc-h2">Live Demo</h2>
          <p class="doc-text">Try dragging cards between columns. Switch views to explore all three layouts.</p>

          <div class="demo-controls">
            <div class="demo-view-nav">
              <button class="demo-view-btn" [class.active]="demoView === 'kanban'" (click)="demoView = 'kanban'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></svg>
                Kanban
              </button>
              <button class="demo-view-btn" [class.active]="demoView === 'list'" (click)="demoView = 'list'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                List
              </button>
              <button class="demo-view-btn" [class.active]="demoView === 'gantt'" (click)="demoView = 'gantt'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Gantt
              </button>
            </div>
          </div>

          <div class="demo-board-wrap">
            <angify-board-workspace
              [service]="boardService"
              [view]="demoView"
              [config]="boardConfig"
              [cardTemplate]="demoCardTpl"
            ></angify-board-workspace>
          </div>

          <ng-template #demoCardTpl let-card>
            <div class="demo-card">
              <div class="demo-card-top">
                <span class="demo-card-priority" [style.background]="getPriorityColor(card.priority)">{{ card.priority }}</span>
              </div>
              <h4 class="demo-card-title">{{ card.title }}</h4>
              <p class="demo-card-desc">{{ card.description }}</p>
              <div class="demo-card-footer">
                <div class="demo-card-avatar" [style.background]="getPriorityColor(card.priority) + '18'" [style.color]="getPriorityColor(card.priority)">
                  {{ getInitials(card.assignee) }}
                </div>
                <span class="demo-card-assignee">{{ card.assignee }}</span>
              </div>
            </div>
          </ng-template>
        </section>

        <!-- Basic Usage -->
        <section class="doc-section" id="basic-usage">
          <h2 class="doc-h2">Basic Usage</h2>
          <p class="doc-text">Get up and running in three steps: import the module, define your columns with cards, and drop the component into your template with a custom card layout.</p>

          <h3 class="doc-h3" id="import-module">1. Import the module</h3>
          <div class="doc-code-block">
            <div class="doc-code-header">app.component.ts</div>
            <pre class="doc-code"><code><span class="hl-key">import</span> {{ '{' }} <span class="hl-type">BoardWorkspaceModule</span>, <span class="hl-type">BoardService</span>, <span class="hl-type">BoardViewType</span> {{ '}' }} <span class="hl-key">from</span> <span class="hl-str">'&#64;angify/workspace'</span>;

<span class="hl-dec">&#64;Component</span>({{ '{' }}
  <span class="hl-prop">standalone</span>: <span class="hl-val">true</span>,
  <span class="hl-prop">imports</span>: [<span class="hl-type">BoardWorkspaceModule</span>],
{{ '}' }})
<span class="hl-key">export class</span> <span class="hl-type">AppComponent</span> {{ '{' }}
  <span class="hl-prop">boardService</span> = <span class="hl-key">new</span> <span class="hl-type">BoardService</span>&lt;<span class="hl-type">YourCardType</span>&gt;();
  <span class="hl-prop">currentView</span>: <span class="hl-type">BoardViewType</span> = <span class="hl-str">'kanban'</span>;
{{ '}' }}</code></pre>
          </div>

          <h3 class="doc-h3" id="setup-columns">2. Set up columns and cards</h3>
          <div class="doc-code-block">
            <div class="doc-code-header">app.component.ts</div>
            <pre class="doc-code"><code><span class="hl-fn">ngOnInit</span>() {{ '{' }}
  <span class="hl-key">this</span>.<span class="hl-prop">boardService</span>.<span class="hl-fn">setColumns</span>([
    {{ '{' }} <span class="hl-prop">id</span>: <span class="hl-str">'todo'</span>, <span class="hl-prop">title</span>: <span class="hl-str">'To Do'</span>, <span class="hl-prop">color</span>: <span class="hl-str">'#6366f1'</span>, <span class="hl-prop">cards</span>: [...] {{ '}' }},
    {{ '{' }} <span class="hl-prop">id</span>: <span class="hl-str">'in-progress'</span>, <span class="hl-prop">title</span>: <span class="hl-str">'In Progress'</span>, <span class="hl-prop">color</span>: <span class="hl-str">'#f59e0b'</span>, <span class="hl-prop">cards</span>: [...] {{ '}' }},
    {{ '{' }} <span class="hl-prop">id</span>: <span class="hl-str">'done'</span>, <span class="hl-prop">title</span>: <span class="hl-str">'Done'</span>, <span class="hl-prop">color</span>: <span class="hl-str">'#22c55e'</span>, <span class="hl-prop">cards</span>: [...] {{ '}' }},
  ]);
{{ '}' }}</code></pre>
          </div>

          <h3 class="doc-h3" id="add-template">3. Add to template</h3>
          <div class="doc-code-block">
            <div class="doc-code-header">app.component.html</div>
            <pre class="doc-code"><code><span class="hl-tag">&lt;angify-board-workspace</span>
  <span class="hl-attr">[service]</span>=<span class="hl-str">"boardService"</span>
  <span class="hl-attr">[view]</span>=<span class="hl-str">"currentView"</span>
  <span class="hl-attr">[config]</span>=<span class="hl-str">"boardConfig"</span>
  <span class="hl-attr">[cardTemplate]</span>=<span class="hl-str">"myCard"</span>
  <span class="hl-attr">(addCard)</span>=<span class="hl-str">"onAddCard($event)"</span>
<span class="hl-tag">&gt;&lt;/angify-board-workspace&gt;</span>

<span class="hl-tag">&lt;ng-template</span> <span class="hl-attr">#myCard</span> <span class="hl-attr">let-card</span><span class="hl-tag">&gt;</span>
  <span class="hl-tag">&lt;div&gt;</span>{{ '{{' }} <span class="hl-prop">card.title</span> {{ '}}' }}<span class="hl-tag">&lt;/div&gt;</span>
<span class="hl-tag">&lt;/ng-template&gt;</span></code></pre>
          </div>
        </section>

        <!-- Configuration -->
        <section class="doc-section" id="configuration">
          <h2 class="doc-h2">Configuration</h2>
          <p class="doc-text">Pass a <code>BoardConfig</code> object to customize the look and feel. All properties are optional.</p>

          <div class="doc-table-wrap">
            <table class="doc-table">
              <thead>
                <tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td><code>accentColor</code></td><td>string</td><td>#6366f1</td><td>Primary accent color used across views</td></tr>
                <tr><td><code>borderRadius</code></td><td>string</td><td>10px</td><td>Global border radius for cards/columns</td></tr>
                <tr><td><code>fontFamily</code></td><td>string</td><td>Montserrat</td><td>Font family for all text</td></tr>
                <tr><td><code>columnConfig</code></td><td>object</td><td>—</td><td>Header bg/color, count badge, column bg, border</td></tr>
                <tr><td><code>kanban</code></td><td>object</td><td>—</td><td>Column min/max width, gap, empty text, card count</td></tr>
                <tr><td><code>list</code></td><td>object</td><td>—</td><td>Max width, header title, column badge, drag handle</td></tr>
                <tr><td><code>gantt</code></td><td>object</td><td>—</td><td>Bar color/height, today marker, label/day width</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Events -->
        <section class="doc-section" id="events">
          <h2 class="doc-h2">Events</h2>
          <p class="doc-text">Subscribe to <code>BoardService.events$</code> to sync changes with your backend API.</p>

          <div class="doc-table-wrap">
            <table class="doc-table">
              <thead>
                <tr><th>Event</th><th>When</th><th>Payload</th></tr>
              </thead>
              <tbody>
                <tr><td><code>card-moved</code></td><td>Card dragged to a different column</td><td>card, sourceColumnId, targetColumnId, indices</td></tr>
                <tr><td><code>card-reordered</code></td><td>Card reordered within same column</td><td>card, columnId, sourceIndex, targetIndex</td></tr>
                <tr><td><code>card-added</code></td><td>Card added via service.addCard()</td><td>card, targetColumnId</td></tr>
                <tr><td><code>card-removed</code></td><td>Card removed via service.removeCard()</td><td>card, sourceColumnId, sourceIndex</td></tr>
                <tr><td><code>column-added</code></td><td>Column added</td><td>column</td></tr>
                <tr><td><code>column-removed</code></td><td>Column removed</td><td>column</td></tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3">API Integration Example</h3>
          <div class="doc-code-block">
            <div class="doc-code-header">app.component.ts</div>
            <pre class="doc-code"><code><span class="hl-key">this</span>.<span class="hl-prop">boardService</span>.<span class="hl-prop">events$</span>.<span class="hl-fn">subscribe</span>(<span class="hl-param">event</span> =&gt; {{ '{' }}
  <span class="hl-key">if</span> (<span class="hl-param">event</span>.<span class="hl-prop">type</span> === <span class="hl-str">'card-moved'</span>) {{ '{' }}
    <span class="hl-key">this</span>.<span class="hl-prop">http</span>.<span class="hl-fn">patch</span>(<span class="hl-str">'/api/tasks/'</span> + <span class="hl-param">event</span>.<span class="hl-prop">card</span>.<span class="hl-prop">id</span>, {{ '{' }}
      <span class="hl-prop">status</span>: <span class="hl-param">event</span>.<span class="hl-prop">targetColumnId</span>,
      <span class="hl-prop">position</span>: <span class="hl-param">event</span>.<span class="hl-prop">targetIndex</span>,
    {{ '}' }}).<span class="hl-fn">subscribe</span>({{ '{' }}
      <span class="hl-prop">error</span>: () =&gt; {{ '{' }}
        <span class="hl-cmt">// Revert on failure</span>
        <span class="hl-key">this</span>.<span class="hl-prop">boardService</span>.<span class="hl-fn">moveCard</span>(
          <span class="hl-param">event</span>.<span class="hl-prop">targetColumnId</span>, <span class="hl-param">event</span>.<span class="hl-prop">targetIndex</span>,
          <span class="hl-param">event</span>.<span class="hl-prop">sourceColumnId</span>, <span class="hl-param">event</span>.<span class="hl-prop">sourceIndex</span>
        );
      {{ '}' }}
    {{ '}' }});
  {{ '}' }}
{{ '}' }});</code></pre>
          </div>
        </section>

        <!-- Views -->
        <section class="doc-section" id="views">
          <h2 class="doc-h2">Views</h2>
          <p class="doc-text">Switch between three built-in views using a single <code>view</code> input. Each view shares the same data source and card template, so switching is instant with zero extra setup.</p>
          <div class="doc-views-grid">
            <div class="doc-view-card">
              <div class="doc-view-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></svg>
              </div>
              <h4>Kanban</h4>
              <p>Column-based board with drag-and-drop between columns. Color-coded headers and card counts.</p>
            </div>
            <div class="doc-view-card">
              <div class="doc-view-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </div>
              <h4>List</h4>
              <p>Flat list of all cards with column badges, drag handles, and reordering support.</p>
            </div>
            <div class="doc-view-card">
              <div class="doc-view-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h4>Gantt</h4>
              <p>Timeline view with date-based bars, today marker, weekend shading, and day headers.</p>
            </div>
          </div>
        </section>

        <!-- API Reference -->
        <section class="doc-section" id="api-reference">
          <h2 class="doc-h2">API Reference</h2>
          <p class="doc-text">Complete reference for all inputs, outputs, and service methods. Click any row to expand details and see usage examples.</p>

          <h3 class="doc-h3" id="api-inputs">Component Inputs</h3>
          @for (prop of apiInputs; track prop.name) {
            <div class="api-row" [class.expanded]="expandedApi === prop.name" (click)="toggleApi(prop.name)">
              <div class="api-row-header">
                <div class="api-row-left">
                  <code class="api-name">{{ prop.name }}</code>
                  <span class="api-type">{{ prop.type }}</span>
                </div>
                <div class="api-row-right">
                  @if (prop.required) {
                    <span class="api-badge required">Required</span>
                  } @else {
                    <span class="api-badge optional">Optional</span>
                  }
                  <svg class="api-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              @if (expandedApi === prop.name) {
                <div class="api-row-body">
                  <p>{{ prop.description }}</p>
                  @if (prop.default) {
                    <div class="api-default"><strong>Default:</strong> <code>{{ prop.default }}</code></div>
                  }
                  @if (prop.example) {
                    <div class="doc-code-block" style="margin-top:10px">
                      <div class="doc-code-header">Example</div>
                      <pre class="doc-code"><code>{{ prop.example }}</code></pre>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <h3 class="doc-h3" id="api-outputs">Component Outputs</h3>
          @for (prop of apiOutputs; track prop.name) {
            <div class="api-row" [class.expanded]="expandedApi === prop.name" (click)="toggleApi(prop.name)">
              <div class="api-row-header">
                <div class="api-row-left">
                  <code class="api-name">{{ prop.name }}</code>
                  <span class="api-type">{{ prop.type }}</span>
                </div>
                <div class="api-row-right">
                  <svg class="api-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              @if (expandedApi === prop.name) {
                <div class="api-row-body">
                  <p>{{ prop.description }}</p>
                  @if (prop.example) {
                    <div class="doc-code-block" style="margin-top:10px">
                      <div class="doc-code-header">Example</div>
                      <pre class="doc-code"><code>{{ prop.example }}</code></pre>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <h3 class="doc-h3" id="api-service">Service Methods</h3>
          @for (prop of apiMethods; track prop.name) {
            <div class="api-row" [class.expanded]="expandedApi === prop.name" (click)="toggleApi(prop.name)">
              <div class="api-row-header">
                <div class="api-row-left">
                  <code class="api-name">{{ prop.name }}</code>
                  <span class="api-type">{{ prop.type }}</span>
                </div>
                <div class="api-row-right">
                  <svg class="api-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              @if (expandedApi === prop.name) {
                <div class="api-row-body">
                  <p>{{ prop.description }}</p>
                  @if (prop.example) {
                    <div class="doc-code-block" style="margin-top:10px">
                      <div class="doc-code-header">Example</div>
                      <pre class="doc-code"><code>{{ prop.example }}</code></pre>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </section>

        <!-- Changelog -->
        <section class="doc-section" id="changelog">
          <h2 class="doc-h2">Changelog</h2>
          <p class="doc-text">Track every release and what changed. We follow semantic versioning.</p>

          @for (release of changelog; track release.version) {
            <div class="changelog-entry">
              <div class="changelog-header">
                <span class="changelog-version">{{ release.version }}</span>
                <span class="changelog-date">{{ release.date }}</span>
                @if (release.tag) {
                  <span class="changelog-tag" [class]="'changelog-tag--' + release.tag">{{ release.tag }}</span>
                }
              </div>
              <ul class="changelog-list">
                @for (item of release.changes; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </section>

        <!-- FAQ -->
        <section class="doc-section" id="faq">
          <h2 class="doc-h2">FAQ &amp; Troubleshooting</h2>
          <p class="doc-text">Common questions and solutions to issues you might encounter when using the workspace library.</p>

          @for (item of faqItems; track item.question) {
            <div class="faq-item" [class.expanded]="expandedFaq === item.question" (click)="toggleFaq(item.question)">
              <div class="faq-question">
                <span>{{ item.question }}</span>
                <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              @if (expandedFaq === item.question) {
                <div class="faq-answer">{{ item.answer }}</div>
              }
            </div>
          }
        </section>
      </div>

      <!-- Right TOC -->
      <nav class="doc-toc">
        <span class="doc-toc-label">On this page</span>
        @for (item of tocItems; track item.id) {
          <a
            class="doc-toc-link"
            [class.active]="activeSection === item.id"
            (click)="scrollTo(item.id)"
          >{{ item.label }}</a>
          @if (item.children) {
            @for (child of item.children; track child.id) {
              <a
                class="doc-toc-link sub"
                [class.active]="activeSection === child.id"
                (click)="scrollTo(child.id)"
              >{{ child.label }}</a>
            }
          }
        }
      </nav>
    </div>
  `,
  styleUrl: './kanban-docs.scss'
})
export class KanbanDocsComponent implements OnInit, OnDestroy {
  boardService = new BoardService<DemoTask>();
  demoView: BoardViewType = 'kanban';
  activeSection = 'installation';

  tocItems: TocItem[] = [
    { id: 'installation', label: 'Installation' },
    { id: 'live-demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage', children: [
      { id: 'import-module', label: 'Import the module' },
      { id: 'setup-columns', label: 'Setup columns' },
      { id: 'add-template', label: 'Add to template' },
    ]},
    { id: 'configuration', label: 'Configuration' },
    { id: 'events', label: 'Events' },
    { id: 'views', label: 'Views' },
    { id: 'api-reference', label: 'API Reference', children: [
      { id: 'api-inputs', label: 'Inputs' },
      { id: 'api-outputs', label: 'Outputs' },
      { id: 'api-service', label: 'Service Methods' },
    ]},
    { id: 'changelog', label: 'Changelog' },
    { id: 'faq', label: 'FAQ' },
  ];

  boardConfig: BoardConfig = {
    accentColor: '#ed1c25',
    borderRadius: '10px',
    columnConfig: { columnBg: '#fafafa', countBg: '#fee2e2', countColor: '#dc2626' },
    kanban: { columnMinWidth: '240px', columnMaxWidth: '280px', columnGap: '14px', emptyText: 'Drop cards here', showCardCount: true },
    list: { maxWidth: '100%', headerTitle: 'All Tasks', showColumnBadge: true, showDragHandle: true },
    gantt: { showTodayMarker: true, barHeight: '24px', labelWidth: '220px', dayWidth: '60px' },
  };

  expandedApi: string | null = null;
  expandedFaq: string | null = null;

  apiInputs = [
    { name: '[service]', type: 'BoardService<T>', required: true, description: 'The BoardService instance that manages columns and cards. Create one per board and pass it in — the component reads columns, handles drag events, and emits changes through this service.', default: '', example: 'boardService = new BoardService<MyCard>();' },
    { name: '[view]', type: "BoardViewType", required: true, description: 'Which view to render: kanban (columns), list (flat rows), or gantt (timeline). Changing this re-renders the board instantly with the same data.', default: "'kanban'", example: "[view]=\"'kanban'\"  // or 'list' | 'gantt'" },
    { name: '[config]', type: 'BoardConfig', required: false, description: 'Optional configuration object to customize colors, sizing, fonts, and per-view settings. Deep-merged with defaults so you only need to override what you want.', default: 'DEFAULT_BOARD_CONFIG', example: "[config]=\"{ accentColor: '#ed1c25', kanban: { columnGap: '20px' } }\"" },
    { name: '[cardTemplate]', type: 'TemplateRef<any>', required: false, description: 'A custom ng-template for rendering each card. Receives the card object via implicit context (let-card). If not provided, cards show their title only.', default: 'Built-in title template', example: '<ng-template #tpl let-card>\n  <div>{{ card.title }}</div>\n</ng-template>' },
  ];

  apiOutputs = [
    { name: '(addCard)', type: 'EventEmitter<string>', required: false, description: 'Emitted when the user clicks the "+ Add card" button inside a column. The payload is the column ID string, so you can open a form pre-filled with the target column.', example: '(addCard)="onAddCard($event)"' },
  ];

  apiMethods = [
    { name: 'setColumns()', type: '(columns: BoardColumn<T>[]) => void', required: false, description: 'Replace all columns and their cards at once. Use this on init or when loading data from an API. Triggers change detection in the board.', example: "this.boardService.setColumns([\n  { id: 'todo', title: 'To Do', cards: [...] }\n]);" },
    { name: 'addCard()', type: '(columnId: string, card: T) => void', required: false, description: 'Add a single card to the end of a specific column. Emits a card-added event.', example: "this.boardService.addCard('todo', { id: '7', title: 'New task' });" },
    { name: 'removeCard()', type: '(columnId: string, cardId: string) => void', required: false, description: 'Remove a card by its ID from a specific column. Emits a card-removed event.', example: "this.boardService.removeCard('todo', '7');" },
    { name: 'moveCard()', type: '(fromCol, fromIdx, toCol, toIdx) => void', required: false, description: 'Programmatically move a card between columns or reorder within a column. Useful for reverting failed API calls.', example: "this.boardService.moveCard('todo', 0, 'done', 2);" },
    { name: 'events$', type: 'Observable<BoardEvent<T>>', required: false, description: 'An observable stream of all board events: card-moved, card-reordered, card-added, card-removed, column-added, column-removed. Subscribe to sync with your backend.', example: "this.boardService.events$.subscribe(e => console.log(e));" },
  ];

  changelog = [
    { version: '1.0.1', date: 'Feb 13, 2026', tag: 'latest', changes: [
      'Added Angular 20 to peer dependency range',
      'Fixed peer dependency conflict with @angular/cdk ^20',
      'Updated README with comprehensive documentation',
    ]},
    { version: '1.0.0', date: 'Feb 12, 2026', tag: '', changes: [
      'Initial stable release',
      'Kanban view with drag-and-drop between columns',
      'List view with flat card rows and drag reordering',
      'Gantt view with timeline bars, today marker, and weekend shading',
      'BoardConfig for full visual customization',
      'Event-driven API with BoardService.events$ observable',
      'Custom card templates via ng-template',
      '+ Add card button with (addCard) output event',
    ]},
  ];

  faqItems = [
    { question: 'Do I need @angular/cdk installed separately?', answer: 'Yes. The workspace library uses @angular/cdk/drag-drop for all drag-and-drop functionality. Install it alongside the workspace package: npm install @angify/workspace @angular/cdk. Both packages must be compatible with your Angular version.' },
    { question: 'Can I use this with Angular SSR / server-side rendering?', answer: 'Yes. The board components are SSR-compatible. Drag-and-drop interactions are only active in the browser. The initial render on the server will display the board layout correctly without any hydration issues.' },
    { question: 'How do I persist card positions to my backend?', answer: 'Subscribe to boardService.events$ and listen for card-moved and card-reordered events. Each event includes the card, source/target column IDs, and indices. Send a PATCH request to your API and revert the move on failure using boardService.moveCard().' },
    { question: 'Can I have different card templates per view?', answer: 'Currently, all three views share the same cardTemplate input. If you need different layouts per view, use an @if block inside your template that checks the current view type and renders different markup accordingly.' },
    { question: 'Why are my cards not draggable?', answer: 'Make sure you have imported BoardWorkspaceModule (not just the component) in your standalone component imports array. Also verify that @angular/cdk is installed and that your Angular version is 15 or higher. Check the browser console for any missing module errors.' },
    { question: 'How do I customize column colors?', answer: 'Each column in your data can have an optional color property (hex string). This color is used for the column header dot indicator, card count badge, and Gantt bar fills. Set it when calling boardService.setColumns().' },
    { question: 'Is there a maximum number of columns or cards?', answer: 'There is no hard limit. The Kanban view scrolls horizontally for many columns. The List view handles hundreds of cards smoothly. For very large datasets (1000+ cards), consider virtual scrolling or pagination on your end before passing data to the board.' },
  ];

  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const today = new Date();
    const d = (offset: number): Date =>
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);

    this.boardService.setColumns([
      { id: 'backlog', title: 'Backlog', color: '#94a3b8', cards: [
        { id: '6', title: 'Research competitors', description: 'Analyze top 5 competitor products.', assignee: 'Sarah K.', priority: 'low', startDate: d(4), endDate: d(8) },
      ]},
      { id: 'todo', title: 'To Do', color: '#ed1c25', cards: [
        { id: '1', title: 'Design landing page', description: 'Create wireframes and mockups.', assignee: 'Alice M.', priority: 'high', startDate: d(0), endDate: d(3) },
        { id: '2', title: 'Write unit tests', description: 'Add tests for auth module.', assignee: 'Bob T.', priority: 'medium', startDate: d(1), endDate: d(5) },
      ]},
      { id: 'in-progress', title: 'In Progress', color: '#f59e0b', cards: [
        { id: '3', title: 'Implement drag & drop', description: 'Integrate CDK drag-drop.', assignee: 'Charlie R.', priority: 'high', startDate: d(-2), endDate: d(2) },
      ]},
      { id: 'done', title: 'Done', color: '#22c55e', cards: [
        { id: '5', title: 'Setup CI/CD', description: 'Configure GitHub Actions.', assignee: 'Eve W.', priority: 'medium', startDate: d(-5), endDate: d(-1) },
      ]},
    ]);

    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    this.activeSection = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private getAllTocIds(): string[] {
    const ids: string[] = [];
    for (const item of this.tocItems) {
      ids.push(item.id);
      if (item.children) {
        for (const child of item.children) {
          ids.push(child.id);
        }
      }
    }
    return ids;
  }

  private setupScrollSpy(): void {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        this.observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter(e => e.isIntersecting)
              .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible.length > 0) {
              const newId = visible[0].target.id;
              if (newId !== this.activeSection) {
                this.zone.run(() => {
                  this.activeSection = newId;
                  this.cdr.markForCheck();
                });
              }
            }
          },
          { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );

        this.getAllTocIds().forEach(id => {
          const el = document.getElementById(id);
          if (el) this.observer!.observe(el);
        });
      });
    }, 200);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#94a3b8';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  toggleApi(name: string): void {
    this.expandedApi = this.expandedApi === name ? null : name;
  }

  toggleFaq(question: string): void {
    this.expandedFaq = this.expandedFaq === question ? null : question;
  }
}
