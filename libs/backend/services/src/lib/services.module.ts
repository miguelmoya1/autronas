import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { ClientsService } from './clients/clients.service';
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
  ],
  providers: [
    AuthService,
    ClientsService,
    DatabaseService,
    TranslateService,
    TranslateFilesService,
    TranslateExtractorService,
    UsersService,
  ],
  exports: [
    AuthService,
    ClientsService,
    DatabaseService,
    TranslateService,
    UsersService,
  ],
})
export class ServicesModule {}
