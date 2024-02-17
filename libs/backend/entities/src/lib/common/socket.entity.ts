import { ApiProperty } from '@nestjs/swagger';
import { ShouldRefresh } from '@sleep-valley/core/interfaces';

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
