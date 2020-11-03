import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments: Array<Object> = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const appointment: Object = {
        id: uuid(),
        provider,
        date
    }

    appointments.push(appointment);

    return response.json(appointments);
});

export default appointmentsRouter;
