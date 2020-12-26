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
            date: new Date(2020, 4, 20, 14, 0, 0),
            provider_id: 'user'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 15, 0, 0),
            provider_id: 'user'
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{

            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProvidersDayAvailability.execute({
            provider_id: 'user',
            day: 20,
            month: 5,
            year: 2020
        });

        expect(availability).toEqual(expect.arrayContaining([
            {hour: 8, available: false},
            {hour: 9, available: false},
            {hour: 10, available: false},
            {hour: 13, available: true},
            {hour: 14, available: false},
            {hour: 15, available: false},
            {hour: 16, available: true},
            {hour: 17, available: true},
        ]));
    });
});
