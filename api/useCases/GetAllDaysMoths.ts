import dayjs from 'dayjs';

export default class GetAllDaysMonths {
    async execute(date: Date){
        let monthDays = [];

        const allDaysMoth = this.daysInMonth(date.getMonth() + 1, date.getFullYear());

        for(var i=1; i <= allDaysMoth; i++){//looping through days in month
            var newDate = new Date(date.getFullYear(),date.getMonth(), i);
            if(newDate.getDay() == 0){//if Sunday
                monthDays.push({
                    day: 0,
                    date: `*Domingo - ${dayjs(newDate).format('DD/MM')}*`
                });
            }
            if(newDate.getDay() == 4){//if Thursday
                monthDays.push({
                    day: 4,
                    date: `*Quinta - ${dayjs(newDate).format('DD/MM')}*`
                });
            }
        }

        return monthDays;
    }

    private daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }
}