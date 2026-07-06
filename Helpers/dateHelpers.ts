export class DateHelper {
constructor(private date: string) {}

    getFormattedDate() {
        return `Due: ${new Date(this.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })}`;
    }
}