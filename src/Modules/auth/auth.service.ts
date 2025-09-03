import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/Services/prisma.service';
import { MailService } from 'src/common/Services/mail.service';
import { VerifyOtpDto } from './DTO/verifyOtp.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './DTO/createUser.dto';
import { SigninUserDto } from './DTO/signinUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly mailService:MailService,private readonly jwtService:JwtService) {}

  async createUser(createUserInput: CreateUserDto) {
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
        return {statusCode:201,message:"OTP Sent Successfully",email:user.email}
    } catch (error) {
        console.log("createUser",error)
        throw new InternalServerErrorException(error.message || "Something Went Wrong")
    }
  }

  async getUser(){
    return this.prisma.user.findFirst()
  }

  async signInUser(signinUserInput:SigninUserDto){
    try {
        const checkUser = await this.prisma.user.findFirst({
            where:{
                email:signinUserInput.email
            }
        })

        if(checkUser){
            // otp send code here

            return {statusCode:201,message:"OTP Sent Successfully"}
        }else{
            throw new BadRequestException("User Not Found")
        }
    } catch (error) {
        console.log("signInUser",error)
        throw new InternalServerErrorException(error.message || "Internal server Error")
    }
  }

  async verifyOtp(verifyOtpInput:VerifyOtpDto){
    try {
        const checkUser = await this.prisma.user.findFirst({
            where:{
                email:verifyOtpInput.email
            }
        })

        if(checkUser){
            // otp send code here
            const otpData = await this.prisma.loginCodes.findFirst({
                where:{
                    userId:checkUser.id,
                    isExpired:false
                },
                select:{
                    code:true,
                    id:true
                },
                orderBy:{
                    createdAt:"desc"
                }
            })

            if(otpData){
                if(otpData.code == verifyOtpInput.otp){
                    await this.prisma.loginCodes.update({
                        where:{
                            id:otpData.id
                        },
                        data:{
                            isExpired:true
                        }
                    })
                    await this.prisma.user.update({
                        where:{
                            id:checkUser.id
                        },
                        data:{
                            verified:true
                        }
                    })   
                    const token = this.jwtService.sign({id:checkUser.id})                 
                    return {statusCode:201,message:"OTP Verified Successfully",user:checkUser,token:token}
                }else{
                    throw new BadRequestException("Invalid OTP")
                }
            }else{
                throw new BadRequestException("OTP Not Found")
            }
        }else{
            throw new BadRequestException("User Not Found")
        }
    } catch (error) {
        console.log("verifyOtp",error)
        throw new InternalServerErrorException(error.message || "Internal server Error")
    }}
}
