import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION', '3600'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtInfrastructureModule {}
