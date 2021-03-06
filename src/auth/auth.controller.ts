import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthCrendentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService: ConfigService) { }


    @Post('/signup')
    signUp(@Body() authCrendentialsDTO: AuthCrendentialsDTO): Promise<void> {
        return this.authService.signUp(authCrendentialsDTO)
    }

    @Post('/signin')
    signIn(@Body() authCrendentialsDTO: AuthCrendentialsDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCrendentialsDTO)
    }


}
