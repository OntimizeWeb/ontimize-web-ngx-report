# Migración Angular 15 → 18 — ontimize-web-ngx-report

> Última actualización: 24 abril 2026 (Fase 3 completa, build verde)

## Estado global

| Rama | Angular | Commit | Estado |
|------|---------|--------|--------|
| `migration/16.x.x` | 16.2 | `ff1c68b`, `014f74e` | ✅ Completado |
| `migration/17.x.x` | 17.3 | `8b9311e`, `98b1048` | ✅ Completado |
| `migration/18.x.x` | 18.2 | `d611fce` | ✅ Completado — build verde |

---

## FASE 1: Angular 15 → 16 — rama `migration/16.x.x`

### Commits
- `ff1c68b` — bump to Angular 16, `@ngbracket/ngx-layout@^16.0.0`, tsconfig `module: es2022`
- `014f74e` — fix: alias `@angular/flex-layout` → `@ngbracket/ngx-layout`, fix `copy-files` script

### Cambios
- Todas las dependencias Angular a `^16.2.0`, ng-packagr `^16.2.0`, TypeScript `~5.0.4`
- `ngx-extended-pdf-viewer` → `^19.0.0`, `ngx-skeleton-loader` → `^8.0.0`
- `@ngbracket/ngx-layout@^16.0.0` añadido (sustitución transitional de `@angular/flex-layout`)
- `moment ^2.29.4` añadido (requerido por `@angular/material-moment-adapter`)
- `projects/ontimize-web-ngx-report/package.json`: peer deps a `^16.2.0`

---

## FASE 2: Angular 16 → 17 — rama `migration/17.x.x`

### Commits
- `8b9311e` — bump to Angular 17, control flow syntax (`@if`/`@for`/`@switch`)
- `98b1048` — fix: TS2322 en compilación partial (tgz parchado del framework)

### Cambios

#### Dependencias
- Angular `^17.3.0`, ng-packagr `^17.3.0`, TypeScript `~5.2.2`, zone.js `~0.14.0`
- `@angular-eslint/*` → `^17.0.0`, `@ngbracket/ngx-layout` → `^17.0.1`
- `ngx-extended-pdf-viewer` → `^21.0.0`, `ngx-skeleton-loader` → `^9.0.0`

#### Control flow migration
- 10 templates migrados de `*ngIf`/`*ngFor`/`*ngSwitch` a `@if`/`@for`/`@switch`

#### Fix TS2322 (compilación partial Angular 17+)
- **Problema**: `required="yes"`, `show-header="yes"` etc. en los templates del report generan
  `TS2322: Type 'string' is not assignable to type 'boolean'` en compilación partial de ng-packagr.
  `strictTemplates: false` y `NO_ERRORS_SCHEMA` son ineficaces contra errores de compilación partial.
- **Causa**: `@BooleanInputConverter()` acepta `unknown` en runtime, pero el tipo declarado del campo
  en el `.d.ts` del framework es `boolean`, lo que el compilador Angular rechaza.
- **Solución**: tgz parchado del framework (`ontimize-web-ngx-18.0.0-SNAPSHOT-0-patched.tgz`)
  con los `.d.ts` modificados para aceptar `boolean | string` en los setters relevantes.
  La estrategia de reconstruir el framework desde el source (rama `theming/m3`) no era viable
  porque esa rama tiene ~116 errores de compilación preexistentes no relacionados.
- **Ficheros `.d.ts` parchados**:
  - `lib/components/o-component.class.d.ts` — `set orequired(val: boolean | string)`, `set required(value: boolean | string)`
  - `lib/components/o-form-data-component.class.d.ts` — `set orequired(val: boolean | string)`
  - `lib/components/form/o-form.component.d.ts` — `showHeader`, `queryOnInit`, `showHeaderNavigation`, `confirmExit`: `boolean | string`
  - `lib/components/table/o-table.component.d.ts` — `showReportOnDemandOption`, `showChartsOnDemandOption`: `boolean | string`
  - `lib/components/input/file-input/o-file-input.component.d.ts` — `showInfo: boolean | string`
- **Otros fix TS**:
  - `JasperReportParameter`: añadido `valueClass?: string` (TS2339)
  - `dropColumns` / `dropColumnsOrderBy`: `CdkDragDrop<any[]>` (era `string[]`)

---

## FASE 3: Angular 17 → 18 — rama `migration/18.x.x`

### Commit
- `d611fce` — Angular 18: standalone components, inject(), flex-layout removal

### Cambios

#### 3.1 Dependencias
- Angular `^18.2.0`, ng-packagr `^18.2.0`, TypeScript `~5.5.4`
- `@ngbracket/ngx-layout` y `@angular/flex-layout` **eliminados**
- `ontimize-web-ngx`: `file:ontimize-web-ngx-18.0.0-SNAPSHOT-0-patched.tgz` (tgz parchado)
- `projects/ontimize-web-ngx-report/package.json`: peer deps `^18.2.0`, `ontimize-web-ngx ^18.0.0`

#### 3.2 Flex-layout → CSS nativo
10 templates migrados. Mapeo aplicado:

| fxLayout/fxFlex original | Clase CSS |
|--------------------------|-----------|
| `fxLayout="column"` | `class="o-flex-column"` |
| `fxLayout="row"` | `class="o-flex-row"` |
| `fxLayout="row wrap"` | `class="o-flex-row-wrap"` |
| `fxLayoutAlign="start start"` | `class="o-layout-align-start-start"` |
| `fxLayoutAlign="space-between center"` | `class="o-layout-align-sb-center"` |
| `fxLayoutAlign="space-around center"` | `class="o-layout-align-sa-center"` |
| `fxLayoutAlign="center center"` | `class="o-layout-align-center-center"` |
| `fxFlex` | `class="o-flex"` |
| `fxFill` / `fxFlexFill` | `class="o-flex-fill"` |
| `fxFlex="50"` | `class="o-flex-50"` |
| `fxFlex="100"` | `class="o-flex-100"` |
| `fxLayoutGap="12px"` | `class="o-gap-12"` |
| `fxLayoutGap="10px"` | `class="o-gap-10"` |
| `fxLayoutGap="14px"` / `fxLayoutGap="20px"` | `style="gap:14px"` / `style="gap:20px"` |

Las clases `o-flex-*` están definidas en `ontimize-web-ngx/theming/styles/flex-layout.scss`.

Templates modificados:
- `o-report-detail.component.html`
- `o-report-home.component.html`
- `o-report-new.component.html`
- `o-report-viewer.component.html`
- `apply-configuration-dialog.component.html`
- `save-preferences-dialog.component.html`
- `select-function-dialog.component.html`
- `style-dialog.component.html`
- `report-on-demand.component.html`

#### 3.3 Migrar `Injector.get()` → `inject()`
5 componentes migrados (los que tenían `injector.get()` en constructor):

| Componente | Cambio |
|-----------|--------|
| `OReportHomeComponent` | `inject(AppConfig)`, `inject(OAlertService)`, `inject(Injector)` |
| `OReportNewComponent` | `inject(AppConfig)`, `inject(DialogService)`, `inject(OAlertService)`, `inject(Injector)` |
| `OReportDetailComponent` | `inject(AppConfig)`, `inject(DialogService)`, `inject(MatDialog)`, `inject(Injector)` |
| `ReportOnDemandComponent` | `inject(AppConfig)`, `inject(OTranslateService)`, `inject(SnackBarService)`, `inject(OReportService)`, `inject(DialogService)`, `inject(MatDialog)`, `inject(OntimizeReportDataProvider)`, `inject(Injector)` |
| `ApplyConfigurationDialogComponent` | `inject(DialogService)`, `inject(OntimizePreferencesService)` |

No migrados (usan `super(injector)` o son factory functions):
- `OReportService` — extiende `OntimizeEEService`, constructor requiere `Injector`
- `SavePreferencesDialogComponent` — extiende `OTableBaseDialogClass`, constructor requiere `Injector`
- `o-providers.ts` — factory functions con `deps: [Injector]`, patrón correcto, no aplica `inject()`

#### 3.4 Standalone migration
10 componentes → `standalone: true`:

| Componente | Imports clave |
|-----------|---------------|
| `OReportSkeletonComponent` | `NgxSkeletonLoaderModule` |
| `OReportHomeComponent` | `OntimizeWebModule` |
| `OReportNewComponent` | `OntimizeWebModule`, `MatProgressSpinnerModule` |
| `OReportDetailComponent` | `OntimizeWebModule`, `AsyncPipe` |
| `OReportViewerComponent` | `NgxExtendedPdfViewerModule`, `MatDialogModule`, `MatIconModule`, `OReportSkeletonComponent` |
| `ReportOnDemandComponent` | `OntimizeWebModule`, `NgxExtendedPdfViewerModule`, `DragDropModule`, `MatSidenavModule`, `MatExpansionModule`, `MatListModule`, `MatRadioModule`, `MatMenuModule`, `MatButtonModule`, `MatIconModule`, `MatDialogModule`, `MatTooltipModule`, `FormsModule`, `CommonModule` |
| `StyleDialogComponent` | `MatDialogModule`, `MatButtonModule`, `MatFormFieldModule`, `MatInputModule`, `MatIconModule`, `MatRadioModule`, `FormsModule`, `OntimizeWebModule` |
| `SelectFunctionDialogComponent` | `MatDialogModule`, `MatButtonModule`, `MatRadioModule`, `FormsModule`, `OntimizeWebModule` |
| `SavePreferencesDialogComponent` | `MatDialogModule`, `MatButtonModule`, `MatFormFieldModule`, `MatInputModule`, `MatTooltipModule`, `ReactiveFormsModule`, `OntimizeWebModule` |
| `ApplyConfigurationDialogComponent` | `MatDialogModule`, `MatButtonModule`, `MatListModule`, `OntimizeWebModule` |

`OReportModule` actualizado: `declarations` → `imports` + `exports` con los standalone components.
`o-components.ts` reescrito: elimina `FlexLayoutModule` y exporta `OREPORT_STANDALONE_COMPONENTS`.

#### 3.5 Fix ngx-extended-pdf-viewer v21
Eliminados inputs que desaparecieron en la v21:
- `delayFirstView` — eliminado sin reemplazo
- `useBrowserLocale="true"` — eliminado (usar `language` si necesario)

Afecta: `o-report-viewer.component.html`, `report-on-demand.component.html`

### Build final
```
✔ Compiling with Angular sources in Ivy partial compilation mode.
✔ Generating FESM bundles
✔ Copying assets
✔ Writing package manifest
✔ Built ontimize-web-ngx-report — Time: 6149ms
```

---

## Pendiente

- Integrar en la playground el tgz del report una vez se publique
- Verificar en runtime que los parámetros de los informes funcionan correctamente
- Migración del addon pendiente: filemanager, charts, map, quickstart

---

## Workflow de validación

```bash
cd c:/work/ontimize-web-ngx/18.x.x/ontimize-web-ngx-report

# Build de la librería
npx ng-packagr -p projects/ontimize-web-ngx-report/ng-package.json

# Copia de assets del PDF viewer
npm run copy-files
# → copyfiles -u 3 node_modules/ngx-extended-pdf-viewer/assets/**/* dist/assets

# Empaquetar
cd dist && npm pack
# → ontimize-web-ngx-report-18.0.0-SNAPSHOT-0.tgz
```
