import { GameModel } from '@sleep-valley/backend/database';
import { BOOLEAN, Sequelize } from 'sequelize';

const name = '00003_add_with_witch_game';

const up = async (sequelize: Sequelize) => {
  const game = (await sequelize.models['GameModel'].describe()) as GameModel;
  if (!game.withWitch) {
    await sequelize.getQueryInterface().addColumn('Games', 'withWitch', {
      type: BOOLEAN,
      defaultValue: true,
    });
  }
};

const down = async (sequelize: Sequelize) => {
  const game = (await sequelize.models['GameModel'].describe()) as GameModel;
  if (game.withWitch) {
    await sequelize.getQueryInterface().removeColumn('Games', 'withWitch');
  }
};

export const migration = { name, up, down };
