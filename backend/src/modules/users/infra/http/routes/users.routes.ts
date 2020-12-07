import { Router } from 'express';
import multer from 'multer';


import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

const usersConstroller = new UsersController();
const userAvatarConstroller = new UserAvatarController();


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersConstroller.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarConstroller.update);

export default usersRouter;
