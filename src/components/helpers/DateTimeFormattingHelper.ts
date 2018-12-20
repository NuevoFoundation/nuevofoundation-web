export class DateTimeFormattingHelper {
    public static FormatToMonthDayYear(dateTime: string) {
        const d = new Date(dateTime);
        const monthDayYear = d.toLocaleString('en-us', { month: 'long', day: '2-digit', year: 'numeric' });
        return monthDayYear;
    }
}