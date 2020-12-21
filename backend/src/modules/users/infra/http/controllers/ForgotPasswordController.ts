import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailsService from '@modules/users/services/SendForgotPasswordEmailsService';

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailsService);

    await sendForgotPasswordEmail.execute({
        email,
    });

    return response.status(204).json();
    }
}
