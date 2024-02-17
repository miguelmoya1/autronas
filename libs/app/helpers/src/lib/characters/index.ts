import { computed, inject } from '@angular/core';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { CharacterType } from '@sleep-valley/core/enums';

export const isWitch = () => {
  const characterGameService = inject(StoreService).get(STORE_KEYS.CHARACTERS);

  return computed(() => {
    const currentCharacter = characterGameService().data?.find((character) => character.isOwner);

    if (!currentCharacter) {
      return false;
    }

    return currentCharacter.type === CharacterType.WITCH;
  });
};

export const isWerewolf = () => {
  const characterGameService = inject(StoreService).get(STORE_KEYS.CHARACTERS);

  return computed(() => {
    const currentCharacter = characterGameService().data?.find((character) => character.isOwner);

    if (!currentCharacter) {
      return false;
    }

    return currentCharacter.type === CharacterType.WEREWOLF;
  });
};

export const isVillager = () => {
  const characterGameService = inject(StoreService).get(STORE_KEYS.CHARACTERS);

  return computed(() => {
    const currentCharacter = characterGameService().data?.find((character) => character.isOwner);

    if (!currentCharacter) {
      return false;
    }

    return currentCharacter.type === CharacterType.VILLAGER;
  });
};

export const isSeer = () => {
  const characterGameService = inject(StoreService).get(STORE_KEYS.CHARACTERS);

  return computed(() => {
    const currentCharacter = characterGameService().data?.find((character) => character.isOwner);

    if (!currentCharacter) {
      return false;
    }

    return currentCharacter.type === CharacterType.SEER;
  });
};
