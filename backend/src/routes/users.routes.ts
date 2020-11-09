import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        console.log('oi')
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    (request, response) => {
        return response.json({ ok: true });
});

export default usersRouter;
