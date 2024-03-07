export type UserPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canSeeDetails: boolean;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  googleToken: string;
  imageUrl: string;

  permissions: UserPermissions;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
