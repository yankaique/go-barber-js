import { Router } from 'express';
import { celebrate ,Segments,Joi } from 'celebrate';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/',appointmentsController.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}),providerDayAvailabilityController.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]:{
        provider_id: Joi.string().uuid().required()
    }
}),providerMonthAvailabilityController.index);


export default providersRouter;
