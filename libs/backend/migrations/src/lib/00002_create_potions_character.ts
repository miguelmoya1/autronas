import { CharacterModel } from '@sleep-valley/backend/database';
import { BOOLEAN, Sequelize } from 'sequelize';

const name = '00002_create_potions_character';

const up = async (sequelize: Sequelize) => {
  const vote = (await sequelize.models['CharacterModel'].describe()) as CharacterModel;
  if (!vote.potionReviveUsed) {
    await sequelize.getQueryInterface().addColumn('Characters', 'potionReviveUsed', {
      type: BOOLEAN,
      defaultValue: false,
    });
  }

  if (!vote.potionKillUsed) {
    await sequelize.getQueryInterface().addColumn('Characters', 'potionKillUsed', {
      type: BOOLEAN,
      defaultValue: false,
    });
  }
};

const down = async (sequelize: Sequelize) => {
  const vote = (await sequelize.models['CharacterModel'].describe()) as CharacterModel;
  if (vote.potionReviveUsed) {
    await sequelize.getQueryInterface().removeColumn('Characters', 'potionReviveUsed');
  }

  if (vote.potionKillUsed) {
    await sequelize.getQueryInterface().removeColumn('Characters', 'potionKillUsed');
  }
};

export const migration = { name, up, down };
