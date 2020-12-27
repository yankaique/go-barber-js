import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointments: ListProvidersAppointmentsService;

describe('ListProvidersAppointments',()=>{
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersAppointments = new ListProvidersAppointmentsService(
            fakeAppointmentsRepository
        )
    })

    it('should be able to list the appointments on a especific day',async ()=>{

        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 14, 0, 0),
            provider_id: 'provider',
            user_id: '123123'
        });


        const appointment2 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 15, 0, 0),
            provider_id: 'provider',
            user_id: '123123'
        });

        const appointments = await listProvidersAppointments.execute({
            provider_id: 'provider',
            day: 20,
            month: 5,
            year: 2020
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
