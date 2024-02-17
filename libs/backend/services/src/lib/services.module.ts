import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharacterModel, GameModel, MigrationsModel, UserModel, VoteModel } from '@sleep-valley/backend/database';
import { AuthService } from './auth/auth.service';
import { CharacterService } from './characters/character.service';
import { DatabaseService } from './database/database.service';
import { GameService } from './games/game.service';
import { TranslateExtractorService } from './translate/translate-extractor.service';
import { TranslateFilesService } from './translate/translate-files.service';
import { TranslateService } from './translate/translate.service';
import { UsersService } from './users/users.service';
import { VotesService } from './votes/votes.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configModule: ConfigService) => ({
        secret: configModule.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '90d',
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([MigrationsModel, CharacterModel, GameModel, UserModel, VoteModel]),
  ],
  providers: [
    AuthService,
    CharacterService,
    DatabaseService,
    GameService,
    UsersService,
    VotesService,
    TranslateService,
    TranslateFilesService,
    TranslateExtractorService,
  ],
  exports: [AuthService, CharacterService, DatabaseService, GameService, UsersService, VotesService, TranslateService],
})
export class ServicesModule {}
