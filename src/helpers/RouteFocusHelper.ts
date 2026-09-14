import { Const } from "../Const";

export class RouteFocusHelper {
  public static focusSiteHeaderStart(): void {
    window.scrollTo(0, 0);
    document.getElementById(Const.SiteHeaderStartId)?.focus();
  }
}
