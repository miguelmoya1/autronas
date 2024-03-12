export type ClientPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canSeeDetails: boolean;
};

export type Client = {
  id: string;

  name: string;
  surname: string;
  email: string;
  personalID: string;
  phoneNumber: string;

  isBusiness: boolean;

  isOwner: boolean;
  permissions: ClientPermissions;
  userID?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ClientCreateInput = {
  name: string;
  email: string;
  personalID: string;

  isBusiness: boolean;

  surname?: string;
  phoneNumber?: string;
};

export type ClientUpdateInput = ClientCreateInput;
