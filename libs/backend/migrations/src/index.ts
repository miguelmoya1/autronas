import { Sequelize } from 'sequelize';

export const migrations = [
  // create_skip_vote_00001,
] as {
  name: string;
  up: (sequelize: Sequelize) => void;
  down: (sequelize: Sequelize) => void;
}[];
