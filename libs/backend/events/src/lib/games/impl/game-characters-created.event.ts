export class GameCharactersCreatedEvent {
  constructor(
    public readonly gameID: string,
    public readonly charactersIDs: string[],
  ) {}
}
