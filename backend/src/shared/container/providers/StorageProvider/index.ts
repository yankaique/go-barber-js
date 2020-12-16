import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)

