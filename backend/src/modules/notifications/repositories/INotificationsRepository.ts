import Notifications from '../infra/typeorm/schemas/Notifications';

import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';


export default interface INotificationRepository {
    create(data: ICreateNotificationDTO): Promise <Notifications>;
}
