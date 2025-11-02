FROM node:20

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

# Chỉ tạo file cấu hình nếu chưa tồn tại
RUN [ ! -f tailwind.config.js ] && npx tailwindcss init -p || echo "Tailwind config already exists"

EXPOSE 5173

CMD ["npm", "run", "dev"]
