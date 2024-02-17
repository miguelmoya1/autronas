import { VoteModel } from '@sleep-valley/backend/database';
import { BOOLEAN, Sequelize } from 'sequelize';

const name = '00001_create_skip_vote';

const up = async (sequelize: Sequelize) => {
  const vote = (await sequelize.models['VoteModel'].describe()) as VoteModel;
  if (!vote.isSkipped) {
    await sequelize.getQueryInterface().addColumn('Votes', 'isSkipped', {
      type: BOOLEAN,
      defaultValue: false,
    });
  }
};

const down = async (sequelize: Sequelize) => {
  const vote = (await sequelize.models['VoteModel'].describe()) as VoteModel;
  if (vote.isSkipped) {
    await sequelize.getQueryInterface().removeColumn('Votes', 'isSkipped');
  }
};

export const migration = { name, up, down };
