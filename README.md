# Rumsan Workspace

A Monorepo for Prisma and Rumsan User Libraries

## Prerequisite

- Postgres Database
- Node.js v20.\* (Recommended)
- NestJS/CLI Installed

## Run Locally

Setp 1: Clone the project

```bash
  git clone git@github.com:rumsan/libraries.git
```

Step 2: Go to the project directory and install dependencies

```bash
  cd my-project
  npm install
```

Step 3: Add following details to .env file inside project root directory.

```bash
DATABASE_URL=postgres://UN:PW@HOST:PORT/DB
JWT_SECRET=hello12345xyz
OTP_SECRET=abcdxyz1234998
MAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=YOUR_EMAIL_ADDRESS
EMAIL_PASS=YOU_APP_PASSCODE
JWT_EXPIRY_TIME=60m
PORT=3333
```

Step 4: Migrate and seed prisma db

```bash
  npx prisma migrate dev
```

Seed database with

```bash
  npx prisma db seed
```

Step 5: Run project

```bash
  npm run dev
```

Step 6: Visit API docs at: http://localhost:3333/api/docs

## Usage/Examples

Go to `apps/nest-api/src/app/app.module.ts` and see the implementation of PrismaDbModule and RsUserModule.

```javascript
import { Module } from '@nestjs/common';
import { RsUserModule } from '@rumsan/user';
import { PrismaDbModule, PrismaService } from '@rumsan/prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ListenerModule } from './listeners/listners.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot({ maxListeners: 10, ignoreErrors: false }),
		ListenerModule,
		PrismaDbModule,
		RsUserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
```
