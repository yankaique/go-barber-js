import { Router } from 'express';
import { celebrate ,Segments,Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ProfileConstroller = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ProfileConstroller.show);
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}),ProfileConstroller.update);

export default profileRouter;
