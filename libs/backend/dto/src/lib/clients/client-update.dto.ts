import { ClientUpdateInput } from '@autronas/core/interfaces';
import { ClientCreateDTO } from './client-create.dto';

export class ClientUpdateDTO extends ClientCreateDTO implements ClientUpdateInput {}
