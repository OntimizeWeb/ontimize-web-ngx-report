import { Constants } from "./constants";

export class Utils {
  static setFullscreenDialog(fullscreen: boolean, dialogRef: any): void {
    if (!fullscreen) {
      dialogRef.updateSize("100%", "100%");
    } else {
      dialogRef.updateSize(Constants.DEFAULT_WIDTH_DIALOG, Constants.DEFAULT_HEIGHT_DIALOG);
    }
  }
  static cloneObject(data: Object) {
    return JSON.parse(JSON.stringify(data));
  }
}
