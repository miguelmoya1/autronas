export type ClientPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canSeeDetails: boolean;
};

export type Client = {
  id: string;
  name: string;
  isOwner: boolean;
  permissions: ClientPermissions;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ClientCreateInput = {
  name: string;
};

export type ClientUpdateInput = ClientCreateInput;
