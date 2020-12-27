/* eslint-disable camelcase */
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequestDTO {
    provider_id: string;
    date: Date;
    user_id: string;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository
    ){

    }

    public async execute({
        provider_id,
        date,
        user_id
    }: IRequestDTO): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())){
            throw new AppError("You can't create an appointment on a past date.");
        }

        if(user_id === provider_id){
            throw new AppError("You can't create an appointment with yourself.");
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError('You can only create appointments between');
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            date,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id
        });

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`
        });

        return appointment;
    }
}

export default CreateAppointmentService;
