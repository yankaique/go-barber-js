import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController{
    public async index(request: Request, response: Response): Promise<Response> {
        // eslint-disable-next-line camelcase
        const provider_id = request.user.id;
        const { day, month, year } = request.query;

        const listProvidersAppointments = container.resolve(ListProvidersAppointmentsService);

        const appointments = await listProvidersAppointments.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        });

        return response.json(classToClass(appointments));
    }
}
