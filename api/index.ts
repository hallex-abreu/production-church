import volunteers from './voluntters';
import GetAllDaysMonths from "./useCases/GetAllDaysMoths";
import RandomVoluntters from "./useCases/RandomVoluntters";
import GenerateSchedule from './useCases/GenerateSchedule';

async function execute() {
    //Get All Days of Months
    const getAllDaysMonths = new GetAllDaysMonths();
    const daysInMonth = await getAllDaysMonths.execute(new Date());

    //Get Random Voluntters
    const randomVoluntters = new RandomVoluntters();
    const voluntters = await randomVoluntters.execute(volunteers);

    //Generate schedule
    const generateSchedule = new GenerateSchedule();
    await generateSchedule.execute(voluntters, daysInMonth);
}

execute();
