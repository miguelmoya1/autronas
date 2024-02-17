import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { MigrationsModel, UserModel } from '@sleep-valley/backend/database';
import { migrations } from '@sleep-valley/backend/migrations';
import { Game, User } from '@sleep-valley/core/interfaces';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    protected readonly sequelize: Sequelize,
    protected readonly configService: ConfigService,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    @InjectModel(MigrationsModel)
    private readonly migrationsModel: typeof MigrationsModel,
  ) {}

  async onApplicationBootstrap() {
    await this.runMigrations();
    await this.createDefaultValues();
  }

  private async runMigrations() {
    this.logger.verbose('Running migrations');

    const migrationsCompleted = await this.migrationsModel.findAll();

    for (const migration of migrations) {
      if (migrationsCompleted.find((m) => m.name === migration.name)) {
        this.logger.verbose(`Migration ${migration.name} already run`);
      } else {
        try {
          this.logger.verbose(`Running migration ${migration.name}`);
          await migration.up(this.sequelize);

          await this.migrationsModel.create({
            name: migration.name,
          });
        } catch (error) {
          this.logger.error(error);

          try {
            this.logger.verbose(`Rolling back migration ${migration.name}`);
            await migration.down(this.sequelize);

            await this.migrationsModel.destroy({
              where: {
                name: migration.name,
              },
            });
          } catch (error) {
            this.logger.error(error);
          }
        }
      }
    }
  }

  private async createDefaultValues() {
    this.logger.verbose('Creating default values');

    if (this.configService.get('NODE_ENV') === 'development') {
      try {
        if ((await this.userModel.count()) === 0) {
          const miguelmo = await this.userModel.create({
            id: '791d4e16-fd2b-4411-a5c5-5928cd04b4dd',
            email: 'miguelmoyaortega@gmail.com',
            name: 'Miguel',
            surname: 'Moya Ortega',
            imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu0k7Yujdl-FMfB5HuUEIMUo1JDWKmWLpkoIZX1Vwg=s96-c',
            googleToken:
              'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0NTEzNDVmYWQwODEwMWJmYjM0NWNmNjQyYTJkYTkyNjdiOWViZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMDMyMDM4ODE4NDI4MjQyMjM5IiwiZW1haWwiOiJtaWd1ZWxtb3lhb3J0ZWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVWUwV1kxaXZOUGZ0RDJoZ1U2bVhBZyIsIm5hbWUiOiJNaWd1ZWwgTW95YSBPcnRlZ2EiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MGs3WXVqZGwtRk1mQjVIdVVFSU1VbzFKRFdLbVdMcGtvSVpYMVZ3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJNaWd1ZWwiLCJmYW1pbHlfbmFtZSI6Ik1veWEgT3J0ZWdhIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NjgxMTkwODAsImV4cCI6MTY2ODEyMjY4MCwianRpIjoiYzNlMzQzZmFiOTIyMjVjYTdhNDEwNzU0ZDQ0YWY5MGNlZTU5YjFjYiJ9.bEofwxhEDFb9T3G3xG0_wELGtt20TjTCMnTIlJ08A-RLD-N6MCg7U5t0reZefgRPoX3GWSa2x_lkDKab_JH6zd3Ff7BKbpLGK1nlH7wgAHBD-aTpZ-3rCXE90s8z3RQgGV9__piJgIFha8DmGtPzKxNkneMAxoSZz2lgbxuQ4GqQ7nLSsGA_fqg4IjEBwOgwx-BpVPjfCfBGVnLzZgNuu_jimMnuw4yS9DRflnbSKrjqh9WWMl3vFPucaodnC37ojF5o-DC1IoiUvD7LfdSmC0hLFXl1flDoS58Jmq-friS1PZhR3zXhk3LKi5B_pxyp8tCe29D520BjOV7x1VzKnw',
          } as User);

          const usersToCreate: User[] = [];

          for (const i of Array(2).keys()) {
            usersToCreate.push({
              name: `User ${i}`,
              email: `email${i}@gmail.com`,
              surname: `Surname ${i}`,
            } as User);
          }

          const users = await this.userModel.bulkCreate(usersToCreate);

          const game = await miguelmo.createGameOwner({
            id: 'd0ad1a04-44b9-47ec-b407-76aaae7e056b',
            name: 'Miguel',
            code: '123456',
          } as Game);

          game.addUsers([miguelmo, ...users]);

          const userToRequest = await this.userModel.create({
            name: 'User to request',
            email: 'requesed@gmail.com',
            surname: 'Surname',
          } as User);

          const userToRequest2 = await this.userModel.create({
            name: 'User to request 2',
            email: 'requested2@gmail.com',
            surname: 'Surname',
          } as User);

          await game.addUserRequest(userToRequest);
          await game.addUserRequest(userToRequest2);
        }
      } catch (error) {
        this.logger.error(error);
      }
    }

    this.logger.verbose('Default values created');
  }
}
