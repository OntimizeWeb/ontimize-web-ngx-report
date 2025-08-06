

export class OReportMappingUtils {

  static readonly STANDARDREPORTMAPPING = {
    "REPORT_TYPE": "REPORTTYPE",
    "DESCRIPTION": "REPORTDESCRIPTION",
    "MAIN_REPORT_FILENAME": "REPORTFILENAME",
    "UUID": "REPORTUUID",
    "NAME": "REPORTNAME"
  };
  static readonly STANDARDPARAMETERMAPPING = {
    "name": "reportParameterName",
    "description": "reportParameterDescription"
  };

  static readonly ONTIMIZEPARAMETERMAPPING = {
    "reportParameterName": "name",
    "reportParameterDescription": "description"
  };

  static readonly ONTIMIZEREPORTMAPPING = {
    "REPORTTYPE": "REPORT_TYPE",
    "REPORTDESCRIPTION": "DESCRIPTION",
    "REPORTFILENAME": "MAIN_REPORT_FILENAME",
    "REPORTUUID": "UUID",
    "REPORTNAME": "NAME"
  };

  static transformKeys(data: string[], keyMapping: { [key: string]: string }): string[] {
    if (!Array.isArray(data)) {
      return data
    }
    return data.map((key) => keyMapping[key] || key);

  }

  /**
    * Transforma un objeto mapeando sus claves según el diccionario proporcionado.
    */

  private static mapObjectKeys(
    obj: any,
    keyMapping: { [key: string]: string },
    parameterKeyMapping ?: { [key: string]: string }
  ): { [key: string]: any } {
    return Object.entries(obj).reduce<Record<string, any>>((newObj, [key, value]) => {
      const newKey = keyMapping[key] || key;

      if (Array.isArray(value) && value.every((item) => typeof item === "object" && !Array.isArray(item))) {
        // Transformar claves de objetos dentro de arrays
        newObj[newKey] = value.map((item) => this.mapObjectKeys(item, parameterKeyMapping || {}));
      } else if (typeof value === "object" && value !== null) {
        // Transformar claves de objetos anidados
        newObj[newKey] = this.mapObjectKeys(value, parameterKeyMapping || {});
      } else {
        newObj[newKey] = value;
      }

      return newObj;
    }, {});
  }

  /**
   * Transforma los datos, ya sea un solo objeto o un array de objetos, aplicando los mapeos de claves.
   */
  static transformData(data: { [key: string]: any }[], keyMapping: { [key: string]: string }, parameterKeyMapping?: { [key: string]: string }): { [key: string]: any }[]  | { [key: string]: any } {
    if (Array.isArray(data)) {
      return data.map((obj) => this.mapObjectKeys(obj, keyMapping, parameterKeyMapping));
    } else if (typeof data === "object" && data !== null) {
      return this.mapObjectKeys(data, keyMapping, parameterKeyMapping);
    }
    return data;
  }

  static standarDataMapping(array: { [key: string]: any }[]): { [key: string]: any }[] | { [key: string]: any } {
    return OReportMappingUtils.transformData(array, OReportMappingUtils.STANDARDREPORTMAPPING, OReportMappingUtils.STANDARDPARAMETERMAPPING);
  }

  static standarMappingKeys(array: string[]): string[] {
    return OReportMappingUtils.transformKeys(array, OReportMappingUtils.STANDARDREPORTMAPPING);
  }

  static ontimizeMappingKeys(array: string[]): string[] {
    return OReportMappingUtils.transformKeys(array, OReportMappingUtils.ONTIMIZEREPORTMAPPING);
  }

  static ontimizeDataMapping(array: { [key: string]: any }[]): { [key: string]: any }[] | { [key: string]: any }{
    return OReportMappingUtils.transformData(array, OReportMappingUtils.ONTIMIZEREPORTMAPPING, OReportMappingUtils.ONTIMIZEPARAMETERMAPPING);

  }

}