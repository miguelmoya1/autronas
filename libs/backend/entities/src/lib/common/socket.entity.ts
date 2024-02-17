import { ShouldRefresh } from '@autronas/core/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class SocketResponse {
  @ApiProperty()
  private readonly shouldRefresh: ShouldRefresh;

  constructor(shouldRefresh: ShouldRefresh) {
    this.shouldRefresh = shouldRefresh;
  }

  serialize() {
    return {
      shouldRefresh: this.shouldRefresh,
    };
  }
}
