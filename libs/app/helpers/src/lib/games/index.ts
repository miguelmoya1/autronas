import { computed, inject } from '@angular/core';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';
import { GamePhase, GameStatus } from '@sleep-valley/core/enums';

export const gamePreparing = () => {
  const gameService = inject(StoreService).get(STORE_KEYS.CURRENT_GAME);
  return computed(() => {
    const currentGame = gameService().data;

    if (!currentGame) {
      return false;
    }

    return currentGame.status === GameStatus.PREPARING;
  });
};

export const isWitchPhase = () => {
  const gameService = inject(StoreService).get(STORE_KEYS.CURRENT_GAME);
  return computed(() => {
    const currentGame = gameService().data;

    if (!currentGame) {
      return false;
    }

    return currentGame.phase === GamePhase.WITCH;
  });
};

export const isWerewolfPhase = () => {
  const gameService = inject(StoreService).get(STORE_KEYS.CURRENT_GAME);
  return computed(() => {
    const currentGame = gameService().data;

    if (!currentGame) {
      return false;
    }

    return currentGame.phase === GamePhase.WEREWOLF;
  });
};

export const isVillagerPhase = () => {
  const gameService = inject(StoreService).get(STORE_KEYS.CURRENT_GAME);
  return computed(() => {
    const currentGame = gameService().data;

    if (!currentGame) {
      return false;
    }

    return currentGame.phase === GamePhase.VILLAGER;
  });
};

export const isSeerPhase = () => {
  const gameService = inject(StoreService).get(STORE_KEYS.CURRENT_GAME);
  return computed(() => {
    const currentGame = gameService().data;

    if (!currentGame) {
      return false;
    }

    return currentGame.phase === GamePhase.SEER;
  });
};
