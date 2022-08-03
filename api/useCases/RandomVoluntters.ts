interface Voluntters {
    peoples: Array<Object>,
    days: Array<number>,
    isCoordinator: boolean
}

interface VolunttersRandom {
    id: number,
    peoples: Array<Object>,
    days: Array<number>,
    quantity: number,
    isCoordinator: boolean
}

export default class RandomVoluntters {
    async execute(voluntters: Array<Voluntters>): Promise<Array<VolunttersRandom>>{
        return voluntters.map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}, index) => {
            return {
                id: index + 1,
                peoples: value.peoples,
                quantity: 0,
                isCoordinator: value.isCoordinator,
                days: value.days
            }
        });
    }
}