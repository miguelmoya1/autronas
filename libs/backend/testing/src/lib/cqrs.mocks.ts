export const QueryBusMock = {
  execute: jest.fn().mockImplementation((command) => {
    return command;
  }),
};

export const CommandBusMock = {
  execute: jest.fn().mockImplementation((command) => {
    return command;
  }),
};
