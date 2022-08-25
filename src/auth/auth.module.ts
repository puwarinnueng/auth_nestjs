import { LocalStrategy } from './local/local.strategy';
import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService , LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
