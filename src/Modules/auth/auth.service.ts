import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './input/createUser.input';
import { PrismaService } from 'src/common/Services/prisma.service';
import { SigninUserInput } from './input/signinUser.input';
import { MailService } from 'src/common/Services/mail.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly mailService:MailService) {}

  async createUser(createUserInput: CreateUserInput) {
    try {

        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: createUserInput.email
            },
            select:{
                id: true,
            }
        })

        if(existingUser) {
            throw new BadRequestException("User With Email Already Exists")
        }

        const user = await this.prisma.user.create({
            data: {
                email: createUserInput.email,
                username: createUserInput.username,
                platform: createUserInput.platform,
            }
        })

        // otp send code here
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await this.prisma.loginCodes.create({
            data:{
                code:otp,
                userId:user.id,
                isExpired:false
            }
        })
        this.mailService.sendOtpMail(user.email,user.username,otp)
        return {statusCode:200,message:"OTP Sent Successfully"}
    } catch (error) {
        console.log("createUser",error)
        throw new InternalServerErrorException(error.message || "Something Went Wrong")
    }
  }

  async getUser(){
    return this.prisma.user.findFirst()
  }

  async signInUser(signinUserInput:SigninUserInput){
    try {
        const checkUser = await this.prisma.user.findFirst({
            where:{
                email:signinUserInput.email
            }
        })

        if(checkUser){
            // otp send code here

            return {statusCode:200,message:"OTP Sent Successfully"}
        }else{
            throw new BadRequestException("User Not Found")
        }
    } catch (error) {
        console.log("signInUser",error)
        throw new InternalServerErrorException(error.message || "Internal server Error")
    }
  }
}
