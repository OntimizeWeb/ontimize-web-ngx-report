### 15.0.1 (2024-04-10)
> [!NOTE]
> In this version, the bugfixes of version [8.4.2](#842-2024-04-10) were integrated

### 8.4.2 (2024-04-10)
### Bug Fixes
* **Injectors and providers:** Solved problems with injectors and providers when application was built with aot=true ([c82eb4e](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/c82eb4e821b92b2f49fae6765b513e5dc2ba673d)) Closes [#223](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/223)

> [!NOTE]
> For using Ontimize Web Report services properly, it is necessary to add `OREPORT_PROVIDERS` into your modules (it can be into app.module or just the module that is using OReportModule)
```ts
import { OREPORT_PROVIDERS, OReportModule } from 'ontimize-web-ngx-report';

@NgModule({
  imports: [
    OntimizeWebModule,
    OReportModule
  ],
  providers: [
    ...OREPORT_PROVIDERS
  ]
})
```

## 15.0.0 (2024-03-27)
> [!NOTE]
> In this version, the features and bugfixes of version [8.3.0](#830-2024-01-02), [8.3.1](#831-2024-01-24), [8.3.2](#832-2024-01-25), [8.4.0](#840-2024-03-15) and [8.4.1](#841-2024-03-18) were integrated

### 8.4.1 (2024-03-18)
### Bug Fixes
* **Report detail component:** Changed scope of Report Store service into ReportDetailComponent constructor ([4f43e37](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/4f43e370a2c7295a0e56262c1ec6bb399c4b28b2))


### 8.4.0 (2024-03-15)
### BREAKING CHANGES
* Modified the API for filling reports when using parameters. Now all primitive types are considered when using Jasper parameters. ([6c64162](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/6c64162)) Closes [#190](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/190)

The method fillReport now has the following signature:

```ts
public fillReport(uuid: string, reportStoreParam: OReportStoreParam, entity?: string, _sqltypes?: Object): Observable<any>
```

Where:

* uuid: a string representing the unique identifier of the report.
* reportStoreParam: an object of type OReportStoreParam containing the parameters needed to fill the report. This object has two optional properties:
  * filters: an object of type OFilterParameter representing the filters to be applied to the report.
  * parameters: an array of objects of type OReportStoreParamValue containing the values of the report parameters. Each object in this array has the following properties:
    * name: a string representing the name of the parameter.
    * value: the value of the parameter.
    * sqlType: (optional) a number representing the SQL type of the parameter.

### 8.3.2 (2024-01-25)
### Bug Fixes
* Fixed bug caused by incorrect import of the OReportSkeletonComponent ([cb1b3fe](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/cb1b3fe)) Closes [#197](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/197)

### 8.3.1 (2024-01-24)
### Bug Fixes
* **Report on demand:** Fixed bug that prevents groups from being cleaned ([c6e7cb5](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/c6e7cb5)) Closes [#184](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/184)
* **Report store:**
  * Added skeleton to report viewer to solved bug while report was not loaded ([b62a6ef](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/b62a6ef)) Closes [#185](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/185)
  * Modified the report window style ([832296c](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/832296c)) Closes [#188](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/188)
  * Fixed bug with service provider ([7f64ecc](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/7f64ecc)) Closes [#191](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/191)

### 8.3.0 (2024-01-02)
### Features
* New injection token **O_REPORT_DATA_SERVICE** that allows to override report data provider for customizing report parameters when report on demand
* **Report on demand:** : New boolean renderer in which you can set the true/false value that you want to render in the report on demand ([95306fa](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/95306fa)) Closes [#172](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/172)

### DEPENDENCY AND PEER-DEPENDENCY UPDATES
* **Updated**: ontimize-web-ngx@8.14.6

## 15.0.0-beta.1 (2023-11-08)
### Bug Fixes
* **Report on demand:** Fixed bug that causes a vertical scroll ([afceb5f](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/afceb5f))Closes[#163](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/163)
* Replaced matLine directive by matListItemTitle and matListItemLine ([d651851](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/d651851))Closes[#158](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/158)
* Added subscriptSizing='dynamic' in mat-form-field. This will not reserve spacing for the subscript below the mat-form-field.([372dd97](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/372dd97))Closes[#159](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/159).
* Added dark mode ([39bbe5a](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/39bbe5a))Closes[#150](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/150).
* Fixed bug that makes the menu button disappear ([e9cfc9a](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/e9cfc9a))Closes[#148](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/148).

## 15.0.0-beta.0 (2023-09-29)
### Features
* Migration to Angular 15.
* Migration to Angular Material 15.


### 8.2.2 (2023-11-30)
### Features
* **Report on demand:**  Added title as column name ([c0a45cc](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/c0a45cc)) Closes [#167](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/167)

### 8.2.1 (2023-10-26)
### Bug Fixes
* **Report on demand:** Modified columns so that they don't allow action type columns to be included in reports([d8e5b91](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/d8e5b91)) Closes [#145](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/145)

## 8.2.0 (2023-07-28)
### Features
* **Report on demand:** Modified the parameters to allow the creation of reports on-demand from the filtered data of the table ([8637180](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/8637180)) Closes [#132](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/132)

## 8.1.1 (2023-01-31)
### Bug Fixes
* Fixing compatibility with globstars in script `copy-files` ([913775b](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/913775b))

## 8.1.0 (2022-12-29)
### Features
* Modified the report window style ([087c0c3](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/087c0c3)) Closes [#92](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/92)
* Changed the style of the window title ([1306d65](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/1306d65)) Closes [#91](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/91)
* Modified the style of the configuration menu ([01af193](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/01af193)) Closes[#97](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/97)
### Bug Fixes
* Modified preferences system by adding the type attribute ([7fb3ffc](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/7fb3ffc)) Closes [#95](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/95)
* Included ngx-extended-pdf-viewer/assets/ files in the library ([60989a9](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/60989a9)) Closes [#101](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/101)

## 8.0.2 (2022-10-25)
### Bug Fixes
* Made breaking change in `mat-error` component ([d5f82fe](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/d5f82fe)) Closes [#84](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/84)

### DEPENDENCY UPDATES
Updated: ontimize-web-ngx@8.8.0

## 8.0.1 (2022-07-15)
### Bug Fixes
  * Fixed error when the table has an additional column defined that is not defined in columns ([79d2068](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/79d2068)) Closes [#73](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/73)
  * Fixed that the path is not sent when creating a report ([b25c6c7](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/b25c6c7))

## 8.0.0 (2022-07-04)
### Features
  * **Report on demand:** Added new feature that allow you to create reports on demand from table data ([bb6287ad](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/bb6287ad)) Closes [#793](https://github.com/OntimizeWeb/ontimize-web-ngx/issues/793)
  * Export OReportRoutingModule module ([9e2eb672](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/9e2eb672)) Closes [#69](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/69)
### Bug Fixes
  * Fix image type columns not being available to generate the on-demand report ([9ed1724](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/9ed1724)) Closes [#66](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/66)
  * Fix image type columns not being available to generate the on-demand report ([297050e](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/297050e)) Closes [#68](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/68)
  * Fix to service type columns not being rendered when grouping ([7e434cc](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/7e434cc)) Closes [#70](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/70)

## 8.0.0-rc.0 (2022-06-22)
### Features
* **build:** initial version with following features:
  * displaying stored reports
  * creating reports on demand from tables
