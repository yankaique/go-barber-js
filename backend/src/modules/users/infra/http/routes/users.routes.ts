import { Router } from 'express';
import { celebrate ,Segments,Joi } from 'celebrate';

import multer from 'multer';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

const usersConstroller = new UsersController();
const userAvatarConstroller = new UserAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersConstroller.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarConstroller.update);

export default usersRouter;
