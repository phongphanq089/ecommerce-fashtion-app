# 🛍️ Ecommerce Fashion — Backend (NestJS)

Đây là phần **Backend (Server-side)** của dự án Ecommerce Fashion App, được xây dựng với **NestJS** — một framework Node.js mạnh mẽ, có kiến trúc rõ ràng (inspired by Angular), rất phù hợp cho các ứng dụng thương mại điện tử quy mô lớn.

---

## 📋 Mục lục

- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Yêu cầu cài đặt](#-yêu-cầu-cài-đặt)
- [Cài đặt & Khởi chạy](#-cài-đặt--khởi-chạy)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Giải thích kiến trúc NestJS](#-giải-thích-kiến-trúc-nestjs)
- [Luồng xử lý Request (Request Lifecycle)](#-luồng-xử-lý-request-request-lifecycle)
- [Mô tả các Module nghiệp vụ](#-mô-tả-các-module-nghiệp-vụ)
- [Thư mục dùng chung (common/)](#-thư-mục-dùng-chung-common)
- [Thư mục cấu hình (config/)](#-thư-mục-cấu-hình-config)
- [Các biến môi trường (.env)](#-các-biến-môi-trường-env)
- [API Documentation (Swagger)](#-api-documentation-swagger)
- [Scripts](#-scripts)
- [Drizzle ORM — Tích hợp & Cấu trúc](#-drizzle-orm--tích-hợp--cấu-trúc)

---

## 🛠 Công nghệ sử dụng

| Công nghệ                                                                       | Mục đích                                |
| ------------------------------------------------------------------------------- | --------------------------------------- |
| [NestJS](https://nestjs.com/)                                                   | Framework chính, kiến trúc module-based |
| [TypeScript](https://www.typescriptlang.org/)                                   | Ngôn ngữ lập trình, tăng type-safety    |
| [Express.js](https://expressjs.com/)                                            | HTTP Server mặc định của NestJS         |
| [TypeORM](https://typeorm.io/) _(Sẽ tích hợp)_                                  | ORM giao tiếp với Database              |
| [PostgreSQL](https://www.postgresql.org/) _(Sẽ tích hợp)_                       | Cơ sở dữ liệu quan hệ chính             |
| [JWT](https://jwt.io/) _(Sẽ tích hợp)_                                          | Xác thực & phân quyền người dùng        |
| [Swagger (OpenAPI)](https://swagger.io/) _(Sẽ tích hợp)_                        | Tài liệu hóa API tự động                |
| [class-validator](https://github.com/typestack/class-validator) _(Sẽ tích hợp)_ | Validate dữ liệu đầu vào từ Client      |

---

## ✅ Yêu cầu cài đặt

- **Node.js** >= 20.x
- **pnpm** >= 9.x (package manager của dự án này)
- **PostgreSQL** >= 15 (khi tích hợp Database)

---

## 🚀 Cài đặt & Khởi chạy

**Cài đặt dependencies:**

```bash
# Tại thư mục root của dự án
pnpm install:be

# Hoặc tại thư mục server/
pnpm install
```

**Chạy môi trường Development (có Hot-reload):**

```bash
# Tại thư mục root của dự án
pnpm dev:be

# Hoặc tại thư mục server/
pnpm start:dev
```

**Build & Chạy môi trường Production:**

```bash
pnpm build
pnpm start:prod
```

Server sẽ khởi động tại: `http://localhost:3000`

---

## 📁 Cấu trúc thư mục

```
server/
├── src/
│   ├── modules/                       # 🧩 Các module nghiệp vụ (Feature Modules)
│   │   ├── users/                     # Module quản lý người dùng & xác thực
│   │   │   ├── dto/                   # Data Transfer Objects (Validate input)
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   ├── users.controller.ts    # Tiếp nhận HTTP requests, định tuyến URL
│   │   │   ├── users.service.ts       # Xử lý business logic, truy vấn database
│   │   │   └── users.module.ts        # Khai báo & kết nối các thành phần
│   │   │
│   │   ├── products/                  # Module quản lý sản phẩm thời trang
│   │   │   ├── dto/
│   │   │   │   ├── create-product.dto.ts
│   │   │   │   └── update-product.dto.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.module.ts
│   │   │
│   │   ├── auth/                      # Module xác thực (Login, Register, Refresh Token)
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── strategies/            # Passport Strategy (JWT, Local)
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   └── media/                     # Module xử lý upload file (ảnh, video)
│   │       ├── dto/
│   │       ├── media.controller.ts
│   │       ├── media.service.ts
│   │       └── media.module.ts
│   │
│   ├── database/                      # 🗄️ Drizzle ORM — tất cả liên quan tới DB
│   │   ├── schema/                    # Schema các bảng (thay thế entities/ của TypeORM)
│   │   │   ├── users.schema.ts        # Định nghĩa bảng users & kiểu TypeScript
│   │   │   ├── products.schema.ts     # Định nghĩa bảng products & kiểu TypeScript
│   │   │   ├── orders.schema.ts       # Định nghĩa bảng orders & kiểu TypeScript
│   │   │   └── index.ts               # Re-export toàn bộ schema (import 1 chỗ)
│   │   ├── migrations/                # File SQL migration do drizzle-kit tự sinh ra
│   │   │   └── 0001_init.sql
│   │   ├── db.ts                      # Khởi tạo pool kết nối & export instance `db`
│   │   └── drizzle.module.ts          # NestJS @Global Module cung cấp `db` toàn cục
│   │
│   ├── common/                        # 🔧 Thành phần dùng chung toàn dự án
│   │   ├── decorators/                # Custom Decorators
│   │   │   ├── get-user.decorator.ts  # Lấy user hiện tại từ JWT token
│   │   │   └── public.decorator.ts    # Đánh dấu API không cần xác thực
│   │   ├── filters/                   # Exception Filters (xử lý lỗi toàn cục)
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/                    # Guards (kiểm tra quyền truy cập)
│   │   │   ├── jwt-auth.guard.ts      # Kiểm tra JWT token hợp lệ
│   │   │   └── roles.guard.ts         # Kiểm tra phân quyền (Admin, User)
│   │   ├── interceptors/              # Interceptors (xử lý trước/sau response)
│   │   │   └── response.interceptor.ts# Định dạng response đồng bộ cho Client
│   │   ├── pipes/                     # Pipes (transform & validate dữ liệu)
│   │   │   └── parse-id.pipe.ts
│   │   ├── setup/                     # Hàm thiết lập ứng dụng (gọi trong server.ts)
│   │   │   ├── swagger.setup.ts       # Cấu hình Swagger/OpenAPI
│   │   │   └── security.setup.ts      # Cấu hình CORS, Helmet, Rate Limiting
│   │   └── utils/                     # Hàm tiện ích dùng chung
│   │       ├── hash.util.ts           # Mã hóa mật khẩu (bcrypt)
│   │       └── paginate.util.ts       # Phân trang kết quả
│   │
│   ├── config/                        # ⚙️ Cấu hình hệ thống
│   │   ├── database.config.ts         # Chuỗi kết nối DATABASE_URL cho Drizzle
│   │   ├── jwt.config.ts              # Cấu hình JWT (secret, expiry)
│   │   └── app.config.ts              # Cấu hình chung (PORT, ENV, ...)
│   │
│   ├── app.module.ts                  # 🏠 Root Module — nơi tổng hợp mọi module
│   └── server.ts                      # 🚀 Entry point — khởi động ứng dụng
│
├── test/                              # E2E Tests (kiểm tra luồng API tổng thể)
│   └── app.e2e-spec.ts
├── drizzle.config.ts                  # Cấu hình Drizzle Kit (schema path, output, dialect)
├── nest-cli.json                      # Cấu hình NestJS CLI (entryFile: "server")
├── tsconfig.json                      # Cấu hình TypeScript
└── package.json
```

> 💡 **Lưu ý**: Dự án sử dụng **Drizzle ORM**. Schema bảng **không nằm** trong `modules/*/entities/` mà được **tập trung tại `database/schema/`** để dễ quản lý quan hệ bảng và tránh circular dependency.

---

## 🧠 Giải thích kiến trúc NestJS

NestJS tổ chức code theo các thành phần có trách nhiệm rõ ràng. Dưới đây là giải thích từng thành phần bằng ngôn ngữ dễ hiểu:

### 1. 📦 Module (`*.module.ts`)

> **Là gì?** Module là "nhóm" gom các thành phần liên quan lại với nhau. Giống như một bộ phận trong công ty.

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Module bên ngoài cần dùng
  controllers: [ProductsController], // Controller của module này
  providers: [ProductsService], // Service của module này
  exports: [ProductsService], // Cho phép module khác dùng Service này
})
export class ProductsModule {}
```

### 2. 🎯 Controller (`*.controller.ts`)

> **Là gì?** Controller là "lễ tân" — tiếp nhận request từ Client, phân loại và chuyển cho Service xử lý.

```typescript
@Controller('products') // Tất cả API trong đây có prefix: /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get() // GET /products — Lấy danh sách sản phẩm
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id') // GET /products/:id — Lấy 1 sản phẩm theo ID
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post() // POST /products — Tạo sản phẩm mới
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
```

### 3. ⚙️ Service (`*.service.ts`)

> **Là gì?** Service là "bếp trưởng" — chứa toàn bộ business logic, truy vấn database, tính toán.

```typescript
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }
}
```

### 4. 📝 DTO — Data Transfer Object (`dto/*.dto.ts`)

> **Là gì?** DTO là "bộ lọc đầu vào" — định nghĩa và validate dữ liệu Client gửi lên trước khi vào Service.

```typescript
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Bắt buộc nhập, phải là chuỗi

  @IsNumber()
  @Min(0)
  price: number; // Bắt buộc nhập, phải là số >= 0

  @IsString()
  description: string;
}
```

### 5. 🗃️ Entity (`entities/*.entity.ts`)

> **Là gì?** Entity là "sơ đồ bảng" — ánh xạ trực tiếp vào bảng trong Database.

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('products') // Tên bảng trong Database là 'products'
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

---

## 🔄 Luồng xử lý Request (Request Lifecycle)

Khi Client gửi một HTTP request (ví dụ: `GET /api/v1/products`), request đó sẽ đi qua các lớp theo thứ tự sau:

```
Client (Frontend/Mobile)
         │
         ▼
  ┌─────────────────┐
  │   Middleware    │  ← Thường dùng cho Logging, Authentication đơn giản
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │     Guards      │  ← Kiểm tra quyền truy cập (JwtAuthGuard, RolesGuard)
  └────────┬────────┘   Nếu KHÔNG có quyền → Trả về lỗi 401/403 ngay lập tức
           │
           ▼
  ┌─────────────────┐
  │  Interceptors   │  ← Chạy trước khi vào Controller (logging, transform input)
  │   (Before)      │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │     Pipes       │  ← Validate & Transform dữ liệu đầu vào (ValidationPipe)
  └────────┬────────┘   Nếu dữ liệu SAI → Trả về lỗi 400 Bad Request
           │
           ▼
  ┌─────────────────┐
  │   Controller    │  ← Nhận request, gọi đúng hàm trong Service
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │    Service      │  ← Xử lý business logic, truy vấn Database
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │   Repository    │  ← Giao tiếp trực tiếp với Database (TypeORM)
  │   (Database)    │
  └────────┬────────┘
           │
           ▼ (kết quả trả về ngược lên)
  ┌─────────────────┐
  │  Interceptors   │  ← Chạy sau khi Service xử lý xong (định dạng response)
  │    (After)      │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ Exception Filter│  ← Bắt tất cả lỗi không xử lý được, trả về lỗi chuẩn hóa
  └────────┬────────┘
           │
           ▼
  Client nhận được Response
```

---

## 🧩 Mô tả các Module nghiệp vụ

### 👤 Module Users (`src/modules/users/`)

Quản lý tài khoản người dùng trong hệ thống.

| API Endpoint        | Method   | Mô tả                      | Yêu cầu Auth            |
| ------------------- | -------- | -------------------------- | ----------------------- |
| `/api/v1/users`     | `GET`    | Lấy danh sách người dùng   | Admin                   |
| `/api/v1/users/:id` | `GET`    | Lấy thông tin 1 người dùng | User (chính họ) / Admin |
| `/api/v1/users/:id` | `PATCH`  | Cập nhật thông tin cá nhân | User (chính họ)         |
| `/api/v1/users/:id` | `DELETE` | Xóa tài khoản              | Admin                   |

### 🛍️ Module Products (`src/modules/products/`)

Quản lý sản phẩm thời trang trong cửa hàng.

| API Endpoint           | Method   | Mô tả                                       | Yêu cầu Auth |
| ---------------------- | -------- | ------------------------------------------- | ------------ |
| `/api/v1/products`     | `GET`    | Lấy danh sách sản phẩm (có phân trang, lọc) | Public       |
| `/api/v1/products/:id` | `GET`    | Lấy chi tiết 1 sản phẩm                     | Public       |
| `/api/v1/products`     | `POST`   | Tạo sản phẩm mới                            | Admin        |
| `/api/v1/products/:id` | `PATCH`  | Cập nhật thông tin sản phẩm                 | Admin        |
| `/api/v1/products/:id` | `DELETE` | Xóa sản phẩm                                | Admin        |

### 🔐 Module Auth (`src/modules/auth/`)

Xử lý toàn bộ luồng xác thực người dùng.

| API Endpoint            | Method | Mô tả                                        | Yêu cầu Auth  |
| ----------------------- | ------ | -------------------------------------------- | ------------- |
| `/api/v1/auth/register` | `POST` | Đăng ký tài khoản mới                        | Public        |
| `/api/v1/auth/login`    | `POST` | Đăng nhập, nhận Access Token & Refresh Token | Public        |
| `/api/v1/auth/refresh`  | `POST` | Làm mới Access Token khi hết hạn             | Refresh Token |
| `/api/v1/auth/logout`   | `POST` | Đăng xuất, vô hiệu hóa token                 | Access Token  |

### 🖼️ Module Media (`src/modules/media/`)

Xử lý tải lên và quản lý ảnh/video (tích hợp Cloudinary hoặc AWS S3).

| API Endpoint           | Method   | Mô tả                       | Yêu cầu Auth |
| ---------------------- | -------- | --------------------------- | ------------ |
| `/api/v1/media/upload` | `POST`   | Tải lên 1 hoặc nhiều file   | Admin        |
| `/api/v1/media/:id`    | `DELETE` | Xóa file khỏi Cloud Storage | Admin        |

---

## 🔧 Thư mục dùng chung (`common/`)

### `common/decorators/`

Các decorator tùy chỉnh để đơn giản hóa code ở controller.

```typescript
// Dùng để lấy thông tin user đang đăng nhập từ JWT
@Get('profile')
getProfile(@GetUser() user: User) {
  return user;
}

// Đánh dấu API này không cần đăng nhập (bỏ qua JwtAuthGuard toàn cục)
@Public()
@Get('products')
getProducts() { ... }
```

### `common/guards/`

Lớp bảo vệ API — kiểm tra quyền truy cập trước khi cho request vào Controller.

- **`JwtAuthGuard`**: Kiểm tra `Authorization: Bearer <token>` header có hợp lệ không.
- **`RolesGuard`**: Kiểm tra role của user (`admin`, `user`) có đủ quyền với API này không.

### `common/interceptors/`

Xử lý dữ liệu trước (vào) và sau (ra) Controller.

```typescript
// ResponseInterceptor đảm bảo mọi API response đều có cấu trúc giống nhau:
{
  "success": true,
  "statusCode": 200,
  "data": { ... }   // Dữ liệu thực tế
}

// Thay vì mỗi nơi trả về một định dạng khác nhau
```

### `common/filters/`

Bắt tất cả lỗi không được xử lý và trả về định dạng lỗi đồng bộ, dễ đọc cho Frontend.

```typescript
// Khi có lỗi xảy ra ở bất kỳ đâu, Client luôn nhận được:
{
  "success": false,
  "statusCode": 404,
  "message": "Product #99 not found",
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/products/99"
}
```

### `common/setup/`

Các hàm thiết lập ứng dụng — được gọi trong `server.ts` khi ứng dụng khởi động.

- **`swagger.setup.ts`**: Cấu hình Swagger UI, tiêu đề, phiên bản, Bearer Auth.
- **`security.setup.ts`**: Cấu hình CORS (cho phép domain FE truy cập), Rate Limiting.

### `common/utils/`

Các hàm tiện ích dùng chung cho nhiều Service.

```typescript
// hash.util.ts — Mã hóa mật khẩu trước khi lưu vào DB
import * as bcrypt from 'bcrypt';
export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);
export const comparePassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);

// paginate.util.ts — Helper phân trang kết quả
export const getPagination = (page: number, limit: number) => ({
  skip: (page - 1) * limit,
  take: limit,
});
```

---

## ⚙️ Thư mục cấu hình (`config/`)

Toàn bộ các cấu hình hệ thống nằm đây và đọc từ biến môi trường `.env`.

```typescript
// config/app.config.ts
export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiPrefix: 'api/v1',
});

// config/database.config.ts
export default () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production', // Chỉ tự sync schema khi dev
});

// config/jwt.config.ts
export default () => ({
  secret: process.env.JWT_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES ?? '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES ?? '7d',
});
```

---

## 🔐 Các biến môi trường (`.env`)

Tạo file `.env` tại thư mục `server/` (copy từ `.env.example`):

```env
# Application
NODE_ENV=development
PORT=3000

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=ecommerce_fashion_db

# JWT Authentication
JWT_SECRET=your_super_secret_key_here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# CORS — Danh sách domain Frontend được phép gọi API (ngăn cách bằng dấu phẩy)
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **⚠️ LƯU Ý:** Tuyệt đối **không commit** file `.env` lên Git. File này đã được thêm vào `.gitignore`.

---

## 📖 API Documentation (Swagger)

Sau khi khởi động server, truy cập tài liệu API tương tác tại:

```
http://localhost:3000/docs
```

Swagger UI cho phép bạn:

- Xem đầy đủ danh sách tất cả API endpoints.
- Thử gọi API trực tiếp từ trình duyệt.
- Xem cấu trúc dữ liệu Request/Response của từng API.
- Xác thực bằng JWT Bearer Token để test các API cần đăng nhập.

---

## 📜 Scripts

Chạy tại thư mục `server/`:

| Lệnh              | Mô tả                                             |
| ----------------- | ------------------------------------------------- |
| `pnpm start:dev`  | Chạy môi trường development (hot-reload)          |
| `pnpm build`      | Build production bundle vào thư mục `dist/`       |
| `pnpm start:prod` | Chạy production server từ bundle đã build         |
| `pnpm lint`       | Kiểm tra lỗi ESLint và tự động sửa                |
| `pnpm test`       | Chạy toàn bộ Unit Tests                           |
| `pnpm test:watch` | Chạy Unit Tests ở chế độ watch                    |
| `pnpm test:cov`   | Chạy Unit Tests và xuất báo cáo Code Coverage     |
| `pnpm test:e2e`   | Chạy End-to-End Tests kiểm tra luồng API tổng thể |

---

## 🤝 Đóng góp & Phát triển

Khi thêm một module nghiệp vụ mới (ví dụ: `orders`), hãy làm theo các bước sau:

**Bước 1:** Tạo module bằng NestJS CLI (tự động sinh đủ file):

```bash
# Chạy trong thư mục server/
npx nest g resource modules/orders
```

**Bước 2:** Import module vào `app.module.ts`:

```typescript
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [ProductsModule, UsersModule, OrdersModule], // Thêm vào đây
})
export class AppModule {}
```

**Bước 3:** Định nghĩa Entity, DTO và viết business logic vào Service.

---

## 🐉 Drizzle ORM — Tích hợp & Cấu trúc

Drizzle ORM là lựa chọn thay thế hiện đại và nhẹ hơn cho TypeORM, ưu điểm là **type-safe 100%**, query kiểu SQL thuần túy và bundle size nhỏ gọn. Dưới đây là hướng dẫn đầy đủ về cách Drizzle thay đổi cấu trúc dự án.

### 🔄 Những gì THAY ĐỔI so với TypeORM

#### 1. Không còn `entities/` trong mỗi module → Thay bằng `database/schema/` tập trung

**TypeORM** định nghĩa schema bằng decorator `@Entity` trong từng module:
```typescript
// modules/products/entities/product.entity.ts  (TypeORM style)
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
}
```

**Drizzle ORM** định nghĩa schema bằng plain TypeScript functions — không decorator, không magic:
```typescript
// database/schema/products.schema.ts  (Drizzle style)
import { pgTable, serial, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: varchar('description', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Kiểu TypeScript được tự động suy luận — KHÔNG cần viết interface thủ công
export type Product    = typeof products.$inferSelect; // Kiểu khi đọc từ DB
export type NewProduct = typeof products.$inferInsert; // Kiểu khi ghi vào DB
```

---

#### 2. Không dùng `Repository` trong Service → Dùng `db` instance trực tiếp

**TypeORM style** (inject Repository):
```typescript
constructor(
  @InjectRepository(Product)
  private readonly productRepo: Repository<Product>,
) {}

findAll() {
  return this.productRepo.find();
}
```

**Drizzle ORM style** (inject `db`, query kiểu SQL type-safe):
```typescript
import { eq } from 'drizzle-orm';
import { products, type NewProduct } from 'src/database/schema';

constructor(
  @Inject(DATABASE_CONNECTION)
  private readonly db: NodePgDatabase,
) {}

findAll() {
  return this.db.select().from(products);
}

findOne(id: number) {
  return this.db.select().from(products).where(eq(products.id, id));
}

create(data: NewProduct) {
  return this.db.insert(products).values(data).returning();
}

update(id: number, data: Partial<NewProduct>) {
  return this.db.update(products).set(data).where(eq(products.id, id)).returning();
}

remove(id: number) {
  return this.db.delete(products).where(eq(products.id, id));
}
```

---

### 📁 Cấu trúc thư mục đầy đủ khi dùng Drizzle ORM

```
server/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── dto/                        # Giữ nguyên — class-validator vẫn dùng
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts            # Thay Repository → inject db instance
│   │   │   └── users.module.ts
│   │   │
│   │   └── products/
│   │       ├── dto/
│   │       ├── products.controller.ts
│   │       ├── products.service.ts
│   │       └── products.module.ts
│   │
│   ├── database/                           # 🆕 Thay thế hoàn toàn cho entities/
│   │   ├── schema/                         # Tất cả schema tập trung tại đây
│   │   │   ├── users.schema.ts
│   │   │   ├── products.schema.ts
│   │   │   ├── orders.schema.ts
│   │   │   └── index.ts                    # Re-export tất cả schema
│   │   ├── migrations/                     # 🆕 Auto-generated bởi drizzle-kit
│   │   │   └── 0001_init.sql
│   │   ├── db.ts                           # 🆕 Khởi tạo kết nối & export `db`
│   │   └── drizzle.module.ts               # 🆕 NestJS Module cấp `db` toàn cục
│   │
│   ├── common/                             # Giữ nguyên
│   ├── config/                             # Giữ nguyên (đổi db.config sang url)
│   ├── app.module.ts
│   └── server.ts
│
├── drizzle.config.ts                       # 🆕 Cấu hình Drizzle Kit (schema, output)
├── nest-cli.json
└── package.json
```

---

### ⚙️ Các file Drizzle cốt lõi

**`database/db.ts`** — Tạo kết nối duy nhất tới PostgreSQL:
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export type Database = typeof db;
```

**`database/drizzle.module.ts`** — NestJS Module cung cấp `db` cho toàn bộ ứng dụng:
```typescript
import { Module, Global } from '@nestjs/common';
import { db } from './db';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()                                  // Global → Inject db ở bất kỳ module nào
@Module({
  providers: [
    { provide: DATABASE_CONNECTION, useValue: db },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DrizzleModule {}
```

**`drizzle.config.ts`** (ở root thư mục `server/`) — Cấu hình Drizzle Kit:
```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out:    './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**`database/schema/index.ts`** — Re-export toàn bộ schema:
```typescript
export * from './users.schema';
export * from './products.schema';
export * from './orders.schema';
// Thêm schema mới vào đây khi có module mới
```

---

### 🔁 Luồng Migration với Drizzle Kit

```bash
# Bước 1: Sau khi thay đổi/thêm schema → Tạo file migration
pnpm db:generate
# → Drizzle Kit so sánh schema hiện tại với DB và sinh ra file SQL trong migrations/

# Bước 2: Áp dụng migration lên Database
pnpm db:migrate
# → Drizzle Kit chạy các file SQL chưa được apply lên DB

# Tuỳ chọn: Mở Drizzle Studio (GUI xem & chỉnh sửa data trực tiếp trên browser)
pnpm db:studio
# → Truy cập tại: https://local.drizzle.studio
```

---

### 🆕 Scripts bổ sung vào `server/package.json`

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate":  "drizzle-kit migrate",
    "db:studio":   "drizzle-kit studio"
  }
}
```

---

### 📊 So sánh TypeORM vs Drizzle ORM

| Tiêu chí | TypeORM | Drizzle ORM |
|---|---|---|
| **Định nghĩa schema** | Decorator `@Entity`, `@Column` trên class | Plain TypeScript functions — không decorator |
| **Vị trí schema** | Nằm trong từng `modules/*/entities/` | Tập trung tại `database/schema/` |
| **Cách query** | `repo.find()`, `repo.save()` | `db.select().from(table).where(...)` — SQL-like |
| **Type-safety** | Tốt | **Xuất sắc** — tự suy luận type từ schema |
| **Migration** | `synchronize: true` (dev) hoặc migration class | `drizzle-kit generate` → `drizzle-kit migrate` (SQL file) |
| **Bundle size** | Nặng hơn | Nhẹ hơn đáng kể |
| **Phù hợp với** | Dev quen OOP / Active Record pattern | Dev quen SQL / muốn kiểm soát rõ query |
| **Quan hệ bảng** | `@ManyToOne`, `@OneToMany` | `relations()` function — explicit & rõ ràng |

### ✅ Những gì KHÔNG THAY ĐỔI khi dùng Drizzle

- Toàn bộ `modules/*/dto/` — vẫn dùng `class-validator` để validate input.
- Toàn bộ `common/` — guards, interceptors, filters, decorators, utils.
- Toàn bộ `config/` — chỉ cần đổi `database.config.ts` sang dùng connection string.
- Cách tổ chức Controller, Service, Module — **không đổi gì cả**.
- Luồng xử lý Request (Request Lifecycle) — **hoàn toàn giống nhau**.

> 💡 **Kết luận**: Drizzle ORM về bản chất chỉ **thay thế phần `entities/` và `Repository pattern`** của TypeORM. Toàn bộ kiến trúc NestJS còn lại giữ nguyên hoàn toàn.

---

_Made with ❤️ by PhongphanQ_
