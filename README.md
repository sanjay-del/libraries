# Nx Workspace

A Monorepo for NestJS and Prisma based projects implementing a user management library.

## Prerequisite

- Postgres Database
- Node.js v20.\* (Recommended)
- Nest/CLI Installed
- User, Role, Permission Schema Model inside `prisma/schema.prisma` file
- All these models seeded with data

## Prisma Setup

- Initialize prisma schema and .env file with the command `npx prisma init`
- Update `prisma/schema.prisma` file with User, Role and Permission Models
- Run migration with `npx prisma migrate dev`
- Run seed script with `npx prisma db seed`

## Run Locally

Clone the project

```bash
  git clone https://github.com/thebinod7/nx-fullstack.git
```

Go to the project directory

```bash
  cd my-project
```

Setup environment variables. Add following details to .env file inside project root directory.

```bash
DATABASE_URL=postgres://UN:PW@HOST:PORT/DB
JWT_SECRET=hello12345xyz
OTP_SECRET=abcdxyz1234998
MAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=YOUR_EMAIL_ADDRESS
EMAIL_PASS=YOU_APP_PASSCODE
JWT_EXPIRY_TIME=60m
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start:dev
```

## Usage/Examples

Go to `apps/nest-api/app.module.ts` and see the implementation

```javascript
import { RsUserModule } from '@rumsan/user';
import { PrismaDbModule, PrismaService } from '@rumsan/prisma';

const STATIC_FILES_PATH = join(__dirname, 'assets');

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: STATIC_FILES_PATH,
		}),
		PrismaDbModule,
		RsUserModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
```
