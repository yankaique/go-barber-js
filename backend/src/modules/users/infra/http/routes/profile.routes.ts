import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ProfileConstroller = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ProfileConstroller.show);
profileRouter.put('/', ProfileConstroller.update);

export default profileRouter;
