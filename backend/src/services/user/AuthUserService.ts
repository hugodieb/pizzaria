import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest{
  email: string;
  password: string;
}

class AuthUserService{
  async execute({ email, password}: AuthRequest){
    
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }      
    })

    if(!user){
      throw new Error("Usuário e/ou senha está incorreto.")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Usuário e/ou senha está incorreto.")
    }
    
    return {ok: true};
  }
}

export { AuthUserService }