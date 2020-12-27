import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment',()=>{

    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository
        );
    })

    it('should be able to create a new appointment',async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2021, 4,10, 12).getTime();
        });

        const appointment = await createAppointmentService.execute({
            date: new Date(2021, 4,10, 13),
            provider_id: '123456',
            user_id: '123123'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    })

    it('should not be able to create two appointments on the same time',async ()=>{
        const appointmentDate = new Date(2021, 11, 27, 11);

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123456',
            user_id: '123123'
        });

        await expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123456',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create an appointment on a past date',async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2021, 4,10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2021, 4, 10, 11),
            provider_id: '123456',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create an appointment with same user as provider',async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2021, 4,10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2021, 4, 10, 13),
            provider_id: 'user-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create an appointment outside before 8am and after 5pm',async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2021, 4,10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2021, 4, 11, 7),
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointmentService.execute({
            date: new Date(2021, 4, 11, 18),
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    });
});
