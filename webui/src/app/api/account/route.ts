import "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient({});

interface Environment {
  SALT: string;
  JWT_SECRET: string;
}

declare let process: {
  env: Environment;
};

const SALT = Buffer.from(process.env.SALT, 'base64').toString()

export async function PUT(request: Request) {
  if (!request.headers.get("email") || !request.headers.get("password") || !request.headers.get("username")) {
    return new Response("Missing email, username or password", { status: 400 });
  }
  const hashedPassword = bcrypt.hashSync(
    request.headers.get("password") ?? "",
    SALT
  );
  let user = await prisma.user.create({
    data: {
      email: request.headers.get("email")?.toString() ?? "",
      password: hashedPassword,
      name: request.headers.get("username")?.toString() ?? "",
    },
  });
  if (user == null) {
    return new Response("Invalid email or password", { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  await prisma.authToken.create({
    data: {
      ownerId: user.id,
      token: bcrypt.hashSync(token, SALT),
    },
  });
  return new Response(JSON.stringify({ status: "success", email: user.email, token: token, username: user.name }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request: Request) {
  if (!request.headers.get("email") || !request.headers.get("password")) {
    return new Response("Missing email or password", { status: 400 });
  }
  const authtoken = request.headers.get("Authorization")?.toString().replace(/^(Bearer )/,"");;
  const token = await prisma.authToken.findUnique({
    where: {
      token: authtoken ? bcrypt.hashSync(authtoken, SALT) : "",
    }
  })
  if (token == null) {
    return new Response("Invalid token", { status: 401 });
  }

  await prisma.authToken.deleteMany({
    where: {
      ownerId: token.ownerId
    }
  })
  await prisma.activity.deleteMany({
    where: {
      userId: token.ownerid
    }
  })
  await prisma.user.delete({
    where: {
      id: token.ownerId
    }
  })
  return new Response(JSON.stringify({ status: "success" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET(request: Request) {
  if (!request.headers.get("Authorization")) {
    return new Response("Missing Authorization header", { status: 400 });
  }

  const authtoken = request.headers.get("Authorization")?.toString().replace(/^(Bearer )/,"");;
  const token = await prisma.authToken.findUnique({
    where: {
      token: authtoken ? bcrypt.hashSync(authtoken, SALT) : "",
    }
  })
  if (token == null) {
    return new Response("Invalid token", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token.ownerId
    }
  })

  if (user == null) {
    return new Response("Invalid token", { status: 401 });
  }
  return new Response(JSON.stringify({ status: "success", email: user.email, username: user.name }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(request: Request) {
  const authtoken = request.headers.get("Authorization")?.toString().replace(/^(Bearer )/,"");
  const token = await prisma.authToken.findUnique({
    where: {
      token: authtoken ? bcrypt.hashSync(authtoken, SALT) : "",
    }
  })
  console.log(token)
  console.log(authtoken)
  console.log(request.headers)
  if (token == null) {
    return new Response("Invalid token", { status: 401 });
  }
  const body = await request.json();
  const userFields: Partial<Prisma.UserUpdateInput> = {};
  for (const key in body) {
    userFields[key] = body[key];
  }
  if (body.password) {
    userFields.password = bcrypt.hashSync(body.password, SALT);
    delete body.password;
  }
  await prisma.user.update({
    where: {
      id: token.ownerId
    },
    data: userFields
  })

  return new Response(JSON.stringify({ status: "success" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
