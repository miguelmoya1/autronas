type ID = { id?: string };

const format = <T>(value: T): unknown => {
  return {
    ...value,
    dataValues: value,
    toJSON: () => value,
    update: jest.fn().mockImplementation((value: T) => Promise.resolve(format(value))),
    save: jest.fn().mockImplementation(() => Promise.resolve(format(value))),
    updateLocation: jest.fn().mockImplementation((value: T) => Promise.resolve(format(value))),
    reload: jest.fn().mockImplementation((entity: T) => Promise.resolve(format(entity))),
    getPermissions: jest.fn().mockImplementation(() => Promise.resolve([])),
    serialize: jest.fn().mockImplementation(() => Promise.resolve(value)),
  };
};

export const modelMock = (data: ID[]) => ({
  bulkCreate: jest.fn().mockImplementation((entities: ID[]) => Promise.resolve(entities.map(format))),
  create: jest.fn().mockImplementation((entity: ID) => Promise.resolve(format(entity))),
  count: jest.fn().mockImplementation(() => Promise.resolve(data.length)),
  destroy: jest.fn().mockImplementation(() => Promise.resolve(true)),
  findByPk: jest.fn().mockImplementation((id: ID['id']) => {
    return Promise.resolve(format(data.find((item) => item.id === id)));
  }),
  findAll: jest.fn().mockImplementation(() => Promise.resolve(data.map(format))),
  findOne: jest.fn().mockImplementation((options: unknown) => {
    if (!options) {
      return Promise.resolve(data[0]);
    }

    return Promise.resolve(format(data.find((item) => item.id === (options as { where: { id: string } })?.where?.id)));
  }),
  update: jest.fn().mockImplementation((entity: ID) => Promise.resolve([1, [format(entity)]])),
  exists: jest.fn().mockImplementation((exists: boolean) => Promise.resolve(!!exists)),
  restore: jest.fn().mockImplementation((entity: ID) => Promise.resolve(format(entity))),
});
