import {
  UserLoggedInEvent,
  UserRehydratedEvent,
} from '@autronas/backend/events';
import { UserEntity } from './user.entity';

const user = {
  id: '123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
} as unknown as UserEntity;

const userModel = {
  ...user,
  toJSON: jest.fn().mockReturnValue(user),
};

const owner = new UserEntity(userModel, { ...user });
const otherUser = new UserEntity(userModel, { ...user, id: '0' });

describe('User', () => {
  let user: UserEntity;

  beforeEach(() => {
    user = new UserEntity({ ...userModel }, { ...user });
  });

  describe('login', () => {
    it('should call apply with a UserLoggedInEvent', () => {
      const applySpy = jest.spyOn(user, 'apply');
      user.login();

      expect(applySpy).toHaveBeenCalledWith(new UserLoggedInEvent(user.id));
    });
  });

  describe('rehydrate', () => {
    it('should call apply with a UserRehydratedInEvent', () => {
      const applySpy = jest.spyOn(user, 'apply');
      user.rehydrate();

      expect(applySpy).toHaveBeenCalledWith(new UserRehydratedEvent(user.id));
    });
  });

  describe('constructor', () => {
    it('should set permissions.canEdit to true if the user is the owner', () => {
      expect(owner.permissions.canEdit).toBe(true);
    });

    it('should set permissions.canEdit to false if the user is not the owner', () => {
      expect(otherUser.permissions.canEdit).toBe(false);
    });

    it('should set permissions.canDelete to true if the user is the owner', () => {
      expect(owner.permissions.canDelete).toBe(true);
    });

    it('should set permissions.canDelete to false if the user is not the owner', () => {
      expect(otherUser.permissions.canDelete).toBe(false);
    });

    it('should set permissions.canSeeDetails to true if the user is the owner', () => {
      expect(owner.permissions.canSeeDetails).toBe(true);
    });

    it('should set permissions.canSeeDetails to false if the user is not the owner', () => {
      expect(otherUser.permissions.canSeeDetails).toBe(false);
    });
  });
});
