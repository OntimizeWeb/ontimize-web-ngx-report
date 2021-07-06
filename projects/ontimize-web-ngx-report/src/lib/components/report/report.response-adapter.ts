import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseServiceResponse, OntimizeServiceResponse, ServiceResponseAdapter, Util } from "ontimize-web-ngx";

@Injectable({ providedIn: 'root' })
export class ReportResponseAdapter implements ServiceResponseAdapter<BaseServiceResponse> {

  adapt(resp: HttpResponse<any>): BaseServiceResponse {
    let code = 1;
    let data = [];
    const message = '';

    // Adapt the data received from the service
    if (resp.body) {
      code = resp.body.code;
      if (resp.body.data) {
        data = resp.body.data;
        if (Util.isArray(data)){
          data.forEach(element => {
            let id = element['id'];
            let name = element['name'];
            let description = element['description'];
            let type = element['type'];
            let mainReportFilename = element['mainReportFilename'];
            let file = element['file'];
            let parameters = element['parameters'];
          }

          );
        }

      } else {
        data = [resp.body];
      }
    }

    // Create Ontimize service response with the data adapted
    return new OntimizeServiceResponse(code, data, message);
  }
}
