import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import {Csrf} from "ncsrf";
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import * as csurf from 'csurf';

@Controller('user')
export class UserController {
    constructor(private userService: UserService
                ) {}

    @Post('/register')

    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        const newUser: any = await this.userService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).send(newUser);
    }

    @Get('/getUserById/:id')
   
    async getCompanyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any,@Req() req:any) {
        const user: any = await this.userService.getUserById(id);
        // res.render('send', { csrfToken: req.csrfToken() })
        token: req.csrfToken();
        return res.status(HttpStatus.OK).send(user);
      //   return {
      //   token: req.csrfToken()
      // }
    }
  @Get('/getUser')

  async getUser( @Res() res: any,@Req() req:any) {
    const user: any = await this.userService.getUser();
    // res.render('send', { csrfToken: req.csrfToken() })
    token: req.csrfToken();
    return res.status(HttpStatus.OK).send(user);
    //   return {
    //   token: req.csrfToken()
    // }
  }
    
    // @Get("/hello")
    // getHello(@Req() request :  Request):string{
    //   return ' < button on'
    //  
    // }
   
}
