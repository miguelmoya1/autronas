import { CharacterModel } from '@sleep-valley/backend/database';
import { BOOLEAN, Sequelize } from 'sequelize';

const name = '00004_add_seen_by_seer_character';

const up = async (sequelize: Sequelize) => {
  const character = (await sequelize.models['CharacterModel'].describe()) as CharacterModel;
  if (!character.seenBySeer) {
    await sequelize.getQueryInterface().addColumn('Characters', 'seenBySeer', {
      type: BOOLEAN,
      defaultValue: false,
    });
  }
};

const down = async (sequelize: Sequelize) => {
  const character = (await sequelize.models['CharacterModel'].describe()) as CharacterModel;
  if (character.seenBySeer) {
    await sequelize.getQueryInterface().removeColumn('Characters', 'seenBySeer');
  }
};

export const migration = { name, up, down };
