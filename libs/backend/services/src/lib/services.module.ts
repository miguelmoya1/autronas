import { MigrationsModel, UserModel } from '@autronas/backend/database';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database/database.service';
import { TranslateExtractorService } from './translate/translate-extractor.service';
import { TranslateFilesService } from './translate/translate-files.service';
import { TranslateService } from './translate/translate.service';
import { UsersService } from './users/users.service';

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
    SequelizeModule.forFeature([MigrationsModel, UserModel]),
  ],
  providers: [
    AuthService,
    DatabaseService,
    UsersService,
    TranslateService,
    TranslateFilesService,
    TranslateExtractorService,
  ],
  exports: [AuthService, DatabaseService, UsersService, TranslateService],
})
export class ServicesModule {}
