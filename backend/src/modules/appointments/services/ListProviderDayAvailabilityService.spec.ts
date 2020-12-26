import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('ListProvidersDayAvailability',()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository
        )
    })

    it('should be able to list the day availability from provider',async ()=>{
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: 'user'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 10, 0, 0),
            provider_id: 'user'
        });

        const availability = await listProvidersDayAvailability.execute({
            provider_id: 'user',
            day: 20,
            month: 5,
            year: 2020
        });

        expect(availability).toEqual(expect.arrayContaining([
            {hour: 8, available: false},
            {hour: 9, available: true},
            {hour: 10, available: false},
            {hour: 11, available: true},
        ]));
    });
});
