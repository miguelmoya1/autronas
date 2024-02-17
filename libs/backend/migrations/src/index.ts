import { migration as create_skip_vote_00001 } from './lib/00001_create_skip_vote';
import { migration as create_potions_character_00002 } from './lib/00002_create_potions_character';
import { migration as add_with_witch_game_00003 } from './lib/00003_add_with_witch_game';
import { migration as add_seen_by_seer_character_00004 } from './lib/00004_add_seen_by_seer_character';

export const migrations = [
  create_skip_vote_00001,
  create_potions_character_00002,
  add_with_witch_game_00003,
  add_seen_by_seer_character_00004,
];
