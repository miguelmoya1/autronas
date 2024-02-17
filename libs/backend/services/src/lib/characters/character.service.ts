import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CharacterModel } from '@sleep-valley/backend/database';
import { CharacterEntity, GameEntity } from '@sleep-valley/backend/entities';
import { shuffle } from '@sleep-valley/backend/shared';
import { CharacterType } from '@sleep-valley/core/enums';
import { User } from '@sleep-valley/core/interfaces';

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);

  constructor(
    @InjectModel(CharacterModel)
    private readonly characterModel: typeof CharacterModel,
  ) {}

  async get(id: CharacterModel['id'], user: Partial<User>) {
    const character = await this.characterModel.findOne({
      ...CharacterModel.baseOptions,
      where: { id },
    });

    if (!character) {
      return null;
    }

    const characterOwner = await this.characterModel.findOne({
      ...CharacterModel.baseOptions,
      where: { ownerID: user.id },
    });

    if (!characterOwner) {
      return null;
    }

    return new CharacterEntity(character?.toJSON(), user, characterOwner.toJSON());
  }

  async getMyInGame(gameID: string, user: Partial<User>) {
    const character = await this.characterModel.findOne({
      ...CharacterModel.baseOptions,
      where: { gameID, ownerID: user.id },
    });

    if (!character) {
      return null;
    }

    return new CharacterEntity(character.toJSON(), user, character.toJSON());
  }

  async getAllInGame(gameID: string, user: Partial<User>) {
    const characters = await this.characterModel.findAll({
      ...CharacterModel.baseOptions,
      where: { gameID },
    });

    const characterOwner = characters.find((character) => character.ownerID === user.id);

    return characters.map((character) => new CharacterEntity(character.toJSON(), user, characterOwner?.toJSON()));
  }

  async bulkCreate(characters: CharacterEntity[]) {
    this.logger.verbose(`Creating characters... ${characters.length}`);
    await this.characterModel.bulkCreate(characters);
  }

  async getAvailableCharacterTypesShuffled(totalUsers: number, game: GameEntity) {
    const typesAvailable = [CharacterType.WEREWOLF];

    if (game.withWitch) {
      typesAvailable.push(CharacterType.WITCH);
    }

    if (game.withSeer) {
      typesAvailable.push(CharacterType.SEER);
    }

    // CharacterType.HUNTER,

    if (totalUsers >= 6) {
      typesAvailable.push(CharacterType.WEREWOLF);
    }

    if (totalUsers >= 9) {
      typesAvailable.push(CharacterType.WEREWOLF);
    }

    if (totalUsers >= 12) {
      typesAvailable.push(CharacterType.WEREWOLF);
    }

    if (totalUsers >= 15) {
      typesAvailable.push(CharacterType.WEREWOLF);
    }

    const totalVillagers = totalUsers - typesAvailable.length;

    for (let i = 0; i < totalVillagers; i++) {
      typesAvailable.push(CharacterType.VILLAGER);
    }

    return shuffle(typesAvailable);
  }

  public async save(character: CharacterEntity) {
    this.logger.verbose(`Saving character... ${character.id}`);
    await this.characterModel.update(character, {
      where: { id: character.id },
    });
  }
}
