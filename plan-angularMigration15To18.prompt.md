# Plan: Migración Angular 15 → 18 — ontimize-web-ngx-report

## TL;DR

Migración incremental del addon `ontimize-web-ngx-report` (Angular 15 → 18) siguiendo la misma estrategia de ramas que el framework principal, no olvidarse de hacer publicar todas las rammas intermedias. La dependencia `ontimize-web-ngx` se actualiza en paralelo con cada fase. El peer `@angular/flex-layout` se sustituye por CSS nativo en la fase 18.

## Datos clave del codebase (reales)

- **2 NgModules**: OReportModule, OReportRoutingModule
- **0 standalone components** en la versión base (15.x.x)
- **10 componentes**: OReportHomeComponent, OReportNewComponent, OReportDetailComponent, OReportViewerComponent, OReportSkeletonComponent, ReportOnDemandComponent, StyleDialogComponent, SelectFunctionDialogComponent, SavePreferencesDialogComponent, ApplyConfigurationDialogComponent
- **10 templates HTML** con directivas flex-layout
- **1 spec file**
- **0 archivos SCSS de theming propios**
- **26 usages de `Injector.get()`** en múltiples componentes (OReportHomeComponent, OReportNewComponent, OReportDetailComponent, ReportOnDemandComponent, o-providers.ts)
- **Sin guards propios**
- Dependencias externas clave: `ngx-extended-pdf-viewer ^18.0.0-beta.0`, `ngx-skeleton-loader ^7.0.0`
- Build script copia assets de `ngx-extended-pdf-viewer` a `dist/assets` → verificar tras cada fase

## Estrategia de Ramas

```
15.x.x (intocable)
  └── 18.x.x (punto de partida, copia de 15.x.x)
       ├── migration/16.x.x (Angular 16)
       │    └── migration/17.x.x (Angular 17)
       │         └── migration/18.x.x (Angular 18 final)
       └── (merge final a 18.x.x cuando esté listo)
```

---

## FASE 1: Angular 15 → 16 — Rama `migration/16.x.x`

### Acciones a realizar

- Actualizar todas las dependencias Angular a `^16.2.0`
- `ng-packagr` → `^16.2.0`, `typescript` → `~5.0.4`, `zone.js` → `~0.13.0`
- Actualizar `tsconfig.json`: `module` → `es2022`
- `ngx-extended-pdf-viewer` → `^19.0.0` (versión compatible con Angular 16)
- `ngx-skeleton-loader` → `^8.0.0`
- Añadir `moment` → `^2.29.4` (requerido por `@angular/material-moment-adapter`)
- Añadir `@ngbracket/ngx-layout@^16.0.0` (sustitución transitional de `@angular/flex-layout`)
- Mantener `@angular/flex-layout@^15.0.0-beta.42` como peer transitorio
- `ontimize-web-ngx` → `^15.9.0` (última versión 15 publicada)
- Actualizar `projects/ontimize-web-ngx-report/package.json`: peer deps a `^16.2.0`

### Notas de compatibilidad

- `ontimize-web-ngx` no tiene versión 16 publicada en npm → usar `^15.9.0`
- `ngx-extended-pdf-viewer@^19.0.0` — verificar que la API sigue siendo compatible
- El script `copy-files` copia assets de ngx-extended-pdf-viewer → verificar rutas tras actualización

### No aplica en esta fase

- **Control flow migration**: pospuesto a Fase 2
- **Standalone**: pospuesto a Fase 3
- **inject() migration**: 26 usages — pospuesto a Fase 3

### Verificación

- `npm run build` — compila sin errores (incluye copia de assets de pdf-viewer)
- Verificar que los assets de `ngx-extended-pdf-viewer` se copian a `dist/assets`

---

## FASE 2: Angular 16 → 17 — Rama `migration/17.x.x`

### Acciones a realizar

- Actualizar todas las dependencias Angular a `^17.3.0`
- `ng-packagr` → `^17.3.0`, `typescript` → `~5.2.2`, `zone.js` → `~0.14.0`
- `@angular-eslint/*` → `^17.0.0`
- `@ngbracket/ngx-layout` → `^17.0.1`
- `ontimize-web-ngx` → mantenido en `^15.9.0`
- Actualizar `projects/ontimize-web-ngx-report/package.json`: peer deps a `^17.3.0`

### Control flow migration

- **Herramienta**: `ng generate @angular/core:control-flow`
- **Alcance**: 10 templates HTML con `*ngIf`/`*ngFor`
- Revisar diff tras el schematic

### No aplica en este addon

- **Migración `inject()`**: 26 usages en múltiples componentes — pospuesto a Fase 3 junto con standalone para hacer refactoring coordinado
- **Guards funcionales**: sin guards propios
- **Standalone gradual**: volumen de `Injector.get()` hace más conveniente hacer standalone y inject() juntos en Fase 3

### Verificación

- `npm run build` — compila sin errores
- `npm test` — spec pasa

---

## FASE 3: Angular 17 → 18 — Rama `migration/18.x.x`

### 3.1 Actualizar dependencias core

- Actualizar todas las dependencias Angular a `^18.2.0`
- `ng-packagr` → `^18.2.0`, `typescript` → `~5.5.4`
- Añadir `luxon ^3.4.0` + `@types/luxon` (peer de `ngx-material-timepicker` transitivo del framework)
- Eliminar `@angular/flex-layout` y `@ngbracket/ngx-layout`
- `ontimize-web-ngx` → `file:../ontimize-web-ngx/dist/ontimize-web-ngx-18.0.0-SNAPSHOT-0.tgz`
- Actualizar `projects/ontimize-web-ngx-report/package.json`: peer deps a `^18.2.0`, `ontimize-web-ngx ^18.0.0`

### 3.2 Eliminar flex-layout → CSS nativo

- **Alcance**: 10 templates con directivas `fxLayout`/`fxFlex`/`fxLayoutAlign`/`fxLayoutGap`
- Usar las clases utilitarias `o-flex-*` definidas en `ontimize-web-ngx` (flex-layout.scss)
- **Templates afectados**:
  - `o-report-detail.component.html`
  - `o-report-home.component.html`
  - `o-report-new.component.html`
  - `o-report-skeleton.component.html`
  - `o-report-viewer.component.html`
  - `apply-configuration-dialog.component.html`
  - `report-on-demand.component.html`
  - `save-preferences-dialog.component.html`
  - `select-function-dialog.component.html`
  - `style-dialog.component.html`

### 3.3 Migrar `Injector.get()` → `inject()`

- **26 usages** distribuidos en OReportHomeComponent, OReportNewComponent, OReportDetailComponent, ReportOnDemandComponent, o-providers.ts
- **Estrategia**: Migrar por componente, convirtiendo `this.injector.get(X)` en field initializer `readonly x = inject(X)`
- **CUIDADO**: En `o-providers.ts` los usages son en factory functions con `deps: [Injector]` — revisar si aplica patrón distinto
- Hacer junto con standalone migration (Fase 3.4) para aprovechar que los componentes ya son standalone

### 3.4 Standalone migration

**Inventario de componentes a migrar:**
| Componente | Archivo |
|---|---|
| `OReportHomeComponent` | `components/o-report-home/` |
| `OReportNewComponent` | `components/o-report-new/` |
| `OReportDetailComponent` | `components/o-report-detail/` |
| `OReportViewerComponent` | `components/o-report-viewer/` |
| `OReportSkeletonComponent` | `components/o-report-skeleton/` |
| `ReportOnDemandComponent` | `components/report-on-demand/` |
| `StyleDialogComponent` | `components/dialogs/style-dialog/` |
| `SelectFunctionDialogComponent` | `components/dialogs/select-function-dialog/` |
| `SavePreferencesDialogComponent` | `components/dialogs/save-preferences-dialog/` |
| `ApplyConfigurationDialogComponent` | `components/dialogs/apply-configuration-dialog/` |

**Módulos wrapper a mantener por backward compatibility:**

- `OReportModule` → re-exportar standalone components
- `OReportRoutingModule` → mantener para routing

**Pasos:**

1. Añadir `standalone: true` a cada componente
2. Mover sus `imports` de NgModule al array `imports` del decorador `@Component`
3. Mantener `OReportModule` wrapper re-exportando los standalone components
4. Verificar build y copia de assets de pdf-viewer a dist/

### No aplica en este addon

- **M3 theming migration**: sin archivos SCSS de theming propios — el theming lo gestiona `ontimize-web-ngx`
- **Typed Forms**: sin uso de `UntypedFormGroup`/`UntypedFormControl` propios
- **Guards funcionales**: sin guards propios

---

## Verificación por fase

1. `npm run build` — debe compilar sin errores (incluye `copy-files` para assets de pdf-viewer)
2. Verificar que los assets de `ngx-extended-pdf-viewer` se copian correctamente a `dist/assets`
3. `npm test` — spec pasa

---

## Decisiones

- **flex-layout**: Añadir `@ngbracket/ngx-layout` transitional en Fases 1-2; eliminar en Fase 3 y migrar a clases `o-flex-*` del framework
- **ontimize-web-ngx**: Usar `^15.9.0` en Fases 1-2; apuntar al tgz local `^18.0.0` en Fase 3
- **ngx-extended-pdf-viewer**: Actualizar a `^19.0.0` en Fase 1; verificar compatibilidad de assets path en cada fase
- **inject()**: 26 usages — migrar en Fase 3 junto con standalone para hacer refactoring coordinado
- **Standalone**: Migrar todos los componentes en Fase 3 — el alto volumen de `Injector.get()` hace conveniente coordinar ambas migraciones
- **M3 theming**: No aplica — sin theming propio; depende del framework
- **Control flow**: Migrar en Fase 2 con el schematic automático
