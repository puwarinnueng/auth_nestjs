import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guards';

@Controller('auth')
export class AuthController {

    //useguard ดรียก stratigy เพื่อตรวจสอบ ทุกครั้งที่ยิง requestมา
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signIn(
        @Request() req: any
    ): Promise<any> {
        return req.user

    }
}
