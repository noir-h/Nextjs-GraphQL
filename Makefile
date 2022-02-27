up:
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
nextjs-install:
	docker compose exec app npx create-next-app .
create-project:
	mkdir -p project
	@make build
	@make up
	@make nextjs-install
	docker compose exec app yarn add @apollo/client graphql @apollo/react-hooks cross-fetch @heroicons/react
	docker compose exec app yarn add -D msw@0.35.0 next-page-tester jest @testing-library/react @types/jest @testing-library/jest-dom @testing-library/dom babel-jest @babel/core @testing-library/user-event jest-css-modules
	touch ./project/{.babelrc, .prettirrc, tsconfig.json}
	docker-compose exec app yarn add -D typescript @types/react @types/node
	docker-compose exec app yarn add tailwindcss@latest postcss@latest autoprefixer@latest
	docker-compose exec app npx tailwindcss init -p
	mv project/pages/_app.js ./project/pages/_app.tsx
	mv project/pages/index.js ./project/pages/index.tsx
	docker-compose exec app yarn add -D @graphql-codegen/cli

stop:
	docker compose stop
down:
	docker compose down --remove-orphans
app:
	docker compose exec app sh
