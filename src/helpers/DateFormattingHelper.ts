export class DateFormattingHelper {
  public static formatToMonthDayYear(dateTime: string) {
    const d = new Date(dateTime);
    const monthDayYear = d.toLocaleString("en-us", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
    return monthDayYear;
  }

  public static formatToTimeDay(time?: string): string {
    if(time === undefined){
      return '';
    }
    const options = { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(time).toLocaleDateString('en-us', options);
    return date;
  }

  public static formatToMonthDay(time?: string): string {
    if(time === undefined){
      return '';
    }
    const options = { month: 'short', day: 'numeric'};
    const date = new Date(time).toLocaleDateString('en-us', options);
    return date;
  }
}
