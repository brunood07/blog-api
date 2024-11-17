import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { UsersRepository } from '@/domain/users/application/repositories/users-repositorty'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    }
  ],
  exports: [
    PrismaService,
    UsersRepository,
  ],
})
export class DatabaseModule { }