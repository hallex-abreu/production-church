interface Voluntters {
    id: number,
    peoples: Array<Object>,
    days: Array<number>,
    quantity: number,
    isCoordinator: boolean
}

interface DayInMonth { 
    day: number, 
    date: string
}

export default class GenerateSchedule {
    async execute(voluntters: Array<Voluntters>, daysInMonth: Array<DayInMonth>): Promise<void>{
        const date = new Date();
        let schedule = `*Escala do mês de ${date.toLocaleString('pt-BR', { month: 'long' })}*\n*(Não esqueçam de confirmar)*\n`;

        for(let month of daysInMonth){
            // Domingo
            if(month.day === 0){
                //Domingo pela manhã - 1
                const peoplesMorning = this.getVoluntter(1, voluntters);
                schedule = schedule+`\n${month.date} *(10HRS)*\n${peoplesMorning.map(people => `- ${people.name}\n`).join('')}`;

                //Domingo tarde - 2
                const peoplesAfternoon = this.getVoluntter(2, voluntters);
                schedule = schedule+`\n${month.date} *(17HRS)*\n${peoplesAfternoon.map(people => `- ${people.name}\n`).join('')}`;
            }
            if(month.day === 4){
                //Quinta
                const peoplesMorning = this.getVoluntter(3, voluntters);
                schedule = schedule+`\n${month.date} *(19:30HRS)*\n${peoplesMorning.map(people => `- ${people.name}\n`).join('')}`;
            }
        }

        console.log(schedule)
    }

    private getVoluntter(day: number, voluntters: Array<Voluntters>){
        //Get voluntter morning
        let volunttersMorning = voluntters.filter(voluntter => voluntter.days.includes(day)).sort((a, b) => a.quantity - b.quantity)[0];
        const morningIndex = voluntters.findIndex(voluntter => voluntter.id === volunttersMorning.id);

        //Add more one
        voluntters[morningIndex].quantity ++;

        //Create voluntters verify quantity
        let peoplesMorning: Array<any> = [];

        //Add in peoples morning
        volunttersMorning.peoples.map(voluntter => peoplesMorning.push(voluntter));

        //Verify quantity peoples, if equal the one add more one
        if(peoplesMorning.length === 1){
            //Get voluntter morning
            let otherVolunttersMorning = voluntters.filter(voluntter => voluntter.days.includes(day) && voluntter.id !== volunttersMorning.id).sort((a, b) => a.quantity - b.quantity)[0];
            const otherMorningIndex = voluntters.findIndex(voluntter => voluntter.id === volunttersMorning.id);

            //Add more one
            voluntters[otherMorningIndex].quantity ++;
            
            //Add in peoples morning
            otherVolunttersMorning.peoples.map((voluntter, index) => {
                if(index === 0)
                    peoplesMorning.push(voluntter)
            });
        }

        return peoplesMorning;
    }
}