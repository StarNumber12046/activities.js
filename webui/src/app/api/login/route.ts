import '@prisma/client'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient({})


interface Environment {
  SALT: string;
  JWT_SECRET: string;
}

declare let process: {
  env: Environment;
};

const SALT = Buffer.from(process.env.SALT, 'base64').toString()

export async function POST(request: Request) {
    if (!request.headers.get('email') || !request.headers.get('password')) {
        return new Response('Missing email or password', { status: 400 });
    }
    const hashedPassword = bcrypt.hashSync(request.headers.get('password') ?? '', SALT);
    let user = await prisma.user.findUnique({
        where: {
            email: request.headers.get('email')?.toString(),
            password: hashedPassword
        }
    })
    if (user == null) {
        return new Response('Invalid email or password', { status: 401 });
    }
    
    const token = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    await prisma.authToken.create({
        data: {
            ownerId: user.id,
            token: bcrypt.hashSync(token, SALT),
        }
    });
    
    return new Response(JSON.stringify({ token }), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}