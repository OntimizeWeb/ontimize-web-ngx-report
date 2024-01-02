import { Injectable, InjectionToken, Injector } from '@angular/core';
import { AppConfig, FilterExpressionUtils, OTableComponent, OTranslateService, Util } from 'ontimize-web-ngx';
import { OReportParam, OReportPreferences } from '../types';
import { OFilterParameter } from '../types/filter-parameter.type';
import { IReportDataProvider } from '../interfaces/report-data-provider.interface';

export const O_REPORT_DATA_SERVICE = new InjectionToken<IReportDataProvider>('Report data provider');

@Injectable()
export class OntimizeReportDataBaseProvider implements IReportDataProvider {
  appConfig: any;
  translateService: OTranslateService;
  language: string;

  constructor(
    public injector: Injector
  ) {
    this.appConfig = this.injector.get<AppConfig>(AppConfig);
    this.translateService = this.injector.get<OTranslateService>(OTranslateService);
    this.language = this.translateService.getCurrentLang();
  }

  public getDefaultServiceConfiguration(serviceName?: string): any {
    const configuration = this.appConfig.getServiceConfiguration();
    let servConfig = {};
    if (serviceName && configuration.hasOwnProperty(serviceName)) {
      servConfig = configuration[serviceName];
    }
    return servConfig;
  }

  getComponentFilter(table: OTableComponent): any {
    let firstFilter = {};
    let filter = {};

    const beColFilter = table.getColumnFiltersExpression();
    // Add column filters basic expression to current filter
    if (beColFilter && !Util.isDefined(firstFilter[FilterExpressionUtils.FILTER_EXPRESSION_KEY])) {
      firstFilter[FilterExpressionUtils.FILTER_EXPRESSION_KEY] = beColFilter;
    } else if (beColFilter) {
      firstFilter[FilterExpressionUtils.FILTER_EXPRESSION_KEY] =
        FilterExpressionUtils.buildComplexExpression(firstFilter[FilterExpressionUtils.FILTER_EXPRESSION_KEY], beColFilter, FilterExpressionUtils.OP_AND);
    }

    const filterParentKeys = table.getParentKeysValues();
    filter = Object.assign(firstFilter || {}, filterParentKeys);

    const quickFilterExpr = Util.isDefined(table.oTableQuickFilterComponent) ? table.oTableQuickFilterComponent.filterExpression : undefined;
    const filterBuilderExpr = Util.isDefined(table.filterBuilder) ? table.filterBuilder.getExpression() : undefined;
    let complexExpr = quickFilterExpr || filterBuilderExpr;
    if (quickFilterExpr && filterBuilderExpr) {
      complexExpr = FilterExpressionUtils.buildComplexExpression(quickFilterExpr, filterBuilderExpr, FilterExpressionUtils.OP_AND);
    }

    if (complexExpr && !Util.isDefined(filter[FilterExpressionUtils.BASIC_EXPRESSION_KEY])) {
      filter[FilterExpressionUtils.BASIC_EXPRESSION_KEY] = complexExpr;
    } else if (complexExpr) {
      filter[FilterExpressionUtils.BASIC_EXPRESSION_KEY] =
        FilterExpressionUtils.buildComplexExpression(filter[FilterExpressionUtils.BASIC_EXPRESSION_KEY], complexExpr, FilterExpressionUtils.OP_AND);
    }

    return filter;

  }

  getReportConfiguration(currentPreference: OReportPreferences, table: OTableComponent): OReportParam {

    let reportConfiguration: OReportParam;

    const serviceConfiguration = this.getDefaultServiceConfiguration(currentPreference.service);
    let pathService: string;
    if (Util.isObject(serviceConfiguration) && serviceConfiguration.hasOwnProperty('path')) {
      pathService = serviceConfiguration.path;
    }

    let filters: OFilterParameter = {
      columns: table.oTableOptions.visibleColumns.filter(c => table.getColumnsNotIncluded().indexOf(c) === -1),
      sqltypes: table.getSqlTypes(),
      filter: this.getComponentFilter(table),
      offset: table.pageable ? table.currentPage * table.queryRows : -1,
      pageSize: table.queryRows,

    };

    reportConfiguration = {
      "title": currentPreference.title,
      "groups": currentPreference.groups,
      "entity": currentPreference.entity,
      "path": pathService,
      "service": currentPreference.service,
      "vertical": currentPreference.vertical,
      "functions": currentPreference.functions,
      "style": currentPreference.style,
      "subtitle": currentPreference.subtitle,
      "columns": currentPreference.columns,
      "orderBy": currentPreference.orderBy,
      "language": this.language,
      "filters": filters,
      "advQuery": table.pageable

    }

    return reportConfiguration;
  }


}
