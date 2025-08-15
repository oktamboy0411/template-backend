# Template Backend / Backend Shabloni

Welcome to **template-backend**, a ready-to-use Node.js + TypeScript backend template.  
**Template-backend** — Node.js va TypeScript asosidagi tayyor backend shablon.

---

## Features / Xususiyatlar

- TypeScript support / TypeScript qo‘llab-quvvatlash
- Express.js framework
- Preconfigured folder structure / Oldindan tayyor papka tuzilishi
- Environment variables support / .env fayl orqali sozlash
- Ready-to-use scripts for development & production / Ishlab chiqish va production uchun tayyor scriptlar

---

## Getting Started / Loyihani boshlash

1. Clone the repository / Repozitoriyani klonlash:

```bash
git clone https://github.com/oktamboy0411/template-backend.git
cd template-backend
```

2. Install dependencies / Paketlarni o‘rnatish:

```bash
yarn install
```

3. **Important:** Update all packages to the latest versions / Muhim: barcha paketlarni eng yangi versiyaga yangilash:

```bash
yarn upgrade --latest
```

> This ensures you are using the latest stable versions of all dependencies.
> Bu barcha kutubxonalarni eng so‘nggi barqaror versiyaga yangilaydi.

4. Copy `.env.example` to `.env` and configure / `.env.example` faylini `.env` ga nusxalab sozlash:

```bash
cp .env.example .env   # Windows: copy .env.example .env
```

5. Start development server / Ishlab chiqish serverini ishga tushirish:

```bash
yarn dev
```

6. Build for production / Production uchun kompilyatsiya qilish:

```bash
yarn build
yarn start
```

---

## Project Structure / Loyihaning tuzilishi

```
src/
├─ controllers/     # Route controllers
├─ services/        # Business logic
├─ models/          # Database models
├─ routes/          # Express routes
├─ utils/           # Utility functions
├─ index.ts         # Entry point
dist/               # Compiled TypeScript files
```

---

## Recommended / Tavsiya qilinadi

- Use **Node.js v18+** for best compatibility.
- Always check `.env` for sensitive data.
- Commit frequently and push to your own repository before deploying.
- Keep dependencies updated regularly with `yarn upgrade --latest`.

---

## License / Litsenziya

MIT
