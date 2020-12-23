import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailability: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailability',()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersMonthAvailability = new ListProvidersMonthAvailabilityService(
            fakeAppointmentsRepository
        )
    })

    it('should be able to list the month availability from provider',async ()=>{
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 3, 20, 8, 0, 0),
            provider_id: 'user'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: 'user'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 10, 0, 0),
            provider_id: 'user'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 21, 8, 0, 0),
            provider_id: 'user'
        });

        const availability = await listProvidersMonthAvailability.execute({
            provider_id: 'user',
            month: 5,
            year: 2020
        });

        expect(availability).toEqual(expect.arrayContaining([
            {day: 19, available: true},
            {day: 20, available: false},
            {day: 21, available: false},
            {day: 22, available: true},
        ]))
    });
});
