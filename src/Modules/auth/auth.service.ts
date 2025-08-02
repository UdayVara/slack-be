import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './input/createUser.input';
import { PrismaService } from 'src/common/Services/prisma.service';
import { SigninUserInput } from './input/signinUser.input';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
            throw new BadRequestException("User Already Exists")
        }

        const user = await this.prisma.user.create({
            data: {
                email: createUserInput.email,
                username: createUserInput.username,
                platform: createUserInput.platform,
            }
        })

        // otp send code here

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
