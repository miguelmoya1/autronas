import { Client } from '@autronas/core/interfaces';
import { ClientEntity } from './client.entity';

const client: Client = {
  id: '123',
  name: 'Test Client',
  email: 'algo@algo.com',
  isBusiness: false,
  notes: 'Some notes',
  personalID: '123456789',
  phoneNumber: '123456789',
  surname: 'Test',
  isOwner: true,
  permissions: {
    canEdit: true,
    canDelete: true,
    canSeeDetails: true,
  },
  userID: '123',
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
};

const clientModel = {
  ...client,
  toJSON: jest.fn().mockReturnValue(client),
};

const owner = new ClientEntity(clientModel, { ...client });
const otherUser = new ClientEntity(clientModel, { ...client, id: '0' });

describe('User', () => {
  let client: ClientEntity;

  beforeEach(() => {
    client = new ClientEntity({ ...clientModel }, { ...client });
  });

  describe('constructor', () => {
    it('should set permissions.canEdit to true if the client is the owner', () => {
      expect(owner.permissions.canEdit).toBe(true);
    });

    it('should set permissions.canEdit to false if the client is not the owner', () => {
      expect(otherUser.permissions.canEdit).toBe(false);
    });

    it('should set permissions.canDelete to true if the client is the owner', () => {
      expect(owner.permissions.canDelete).toBe(true);
    });

    it('should set permissions.canDelete to false if the client is not the owner', () => {
      expect(otherUser.permissions.canDelete).toBe(false);
    });

    it('should set permissions.canSeeDetails to true if the client is the owner', () => {
      expect(owner.permissions.canSeeDetails).toBe(true);
    });

    it('should set permissions.canSeeDetails to false if the client is not the owner', () => {
      expect(otherUser.permissions.canSeeDetails).toBe(false);
    });
  });
});
