## 15.0.0-beta.1
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

## 8.2.1 (2023-10-26)
### Bug Fixes
* **Report on demand:** Modified columns so that they don't allow action type columns to be included in reports([d8e5b91](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/d8e5b91))Closes[#145](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/145)

## 8.2.0 (2023-07-28)
### Features
* **Report on demand:** Modified the parameters to allow the creation of reports on-demand from the filtered data of the table ([8637180](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/8637180)) Closes[#132](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/132)

## 8.1.1 (2023-01-31)
### Bug Fixes
* Fixing compatibility with globstars in script `copy-files` ([913775b](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/913775b))

## 8.1.0 (2022-12-29)
### Features
* Modified the report window style ([087c0c3](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/087c0c3)) Closes[#92](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/92)
* Changed the style of the window title ([1306d65](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/1306d65)) Closes[#91](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/91)
* Modified the style of the configuration menu ([01af193](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/01af193)) Closes[#97](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/97)
### Bug Fixes
* Modified preferences system by adding the type attribute ([7fb3ffc](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/7fb3ffc)) Closes[#95](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/95)
* Included ngx-extended-pdf-viewer/assets/ files in the library ([60989a9](https://github.com/OntimizeWeb/ontimize-web-ngx-report/commit/60989a9)) Closes[#101](https://github.com/OntimizeWeb/ontimize-web-ngx-report/issues/101)

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
