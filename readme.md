DrinkMaster

=============================================================================

UKR (scroll below to read in English)

DrinkMaster - це веб-додаток, який дозволяє шукати, створювати та додавати до обраних рецепти коктейлів.

Колекції рецептів та користувачів, які пройшли реєстрацію у додатку, зберігаються у базі даних MongoDB.

---

Повна документація щодо взаємодії з базою даних розміщена за посиланням:

https://drink-master-backend.onrender.com/api-docs/

---

Структура проєкту:

- controllers - функції для взаємодії з основними ендпоінтами (авторизація та аутентифікація, підписка, отримання колекцій категорій, бокалів та інгридієнтів коктейлів, отримання, створення та видалення власних, улюблених та популярних коктейлів, пошук за ключовими словами);

- DB - колекції категорій та бокалів (не зберігаються у MongoDB);

- helpers - допоміжні функції (обробка помилок, відправка листів тощо);

- middlewares - проміжне ПЗ (валідація, завантаження зображень тощо);

- models - mongoose-моделі рецептів, інгридієнтів та користувачів;

- routes/api - основні ендпоінти, за якими відбувається взаємодія з базою даних;

- schemas - схеми валідації;

- .env.example - змінні оточення;

- app.js - налаштування додатку;

- package.json - залежності проєкту;

- server.js - налаштування серверу;

- swagger.json - опис документації.

---

Технології та бібліотеки, використані при створені проєкту:

- Node.js

- bcrypt - хешування паролів;
- cloudinary - хмарне сховище для зберігання зображень;
- cors - крос-доменні запити;
- cross-env, dotenv - налаштування та використання змінних оточення;
- express - веб-фреймворк для створення програм Node.js;
- fs - взаємодія з файловою системою;
- joi, joi-password - бібліотеки валідації;
- jsonwebtoken - шифрування jwt-токену;
- mongoose - бібліотека для роботи із MongoDB;
- morgan - логування http-запитів;
- multer - проміжне ПЗ для обробки multipart/form-data;
- nodemailer - відправка листів;
- swagger-ui-express - бібліотека для створення документації.

---

Команди:

- npm install — встановлення необхідних пакетів та залежностей;
- npm start — старт сервера в режимі production;
- npm run start:dev — старт сервера в режимі розробки (development);
- npm run lint — запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера;
- npm lint:fix — та ж перевірка лінтера, але з автоматичними виправленнями простих помилок.

---

Корисні посилання:

- додаток: https://dtripled.github.io/project-drink-master/

- фронтенд: https://github.com/DTripleD/project-drink-master

=============================================================================

ENG (прогорніть вище, щоб прочитати українською)

DrinkMaster is a web application that allows you to search, create and add cocktail recipes to your favorites.

Collections of recipes and users who have registered in the application are stored in the MongoDB database.

Full documentation on interaction with the database is available at the following link:

https://drink-master-backend.onrender.com/api-docs/

---

Project structure:

- controllers - functions for interaction with the main endpoints (authorization and authentication, subscription, getting collections of categories, glasses and cocktail ingredients, getting, creating and deleting own, favorite and popular cocktails, searching by keywords);

- DB - collections of categories and glasses (not stored in MongoDB);

- helpers - auxiliary functions (error processing, sending letters, etc.);

- middlewares - intermediate software (validation, uploading images, etc.);

- models - mongoose models of recipes, ingredients and users;

- routes/api - the main endpoints that interact with the database;

- schemas - validation schemes;

- .env.example - environment variables;

- app.js - application settings;

- package.json - project dependencies;

- server.js - server settings;

- swagger.json - documentation description.

---

Technologies and libraries used in the creation of the project:

- Node.js

- bcrypt - password hashing;
- cloudinary - cloud storage for storing images;
- cors - cross-domain requests;
- cross-env, dotenv - configuration and use of environment variables;
- express - a web framework for creating Node.js programs;
- fs - interaction with the file system;
- joi, joi-password - validation libraries;
- jsonwebtoken - jwt-token encryption;
- mongoose - a library for working with MongoDB;
- morgan - logging of http requests;
- multer - middleware for processing multipart/form-data;
- nodemailer - sending letters;
- swagger-ui-express - a library for creating documentation.

---

The commands:

- npm install — installation of necessary packages and dependencies;
- npm start — start the server in production mode;
- npm run start:dev — start the server in development mode;
- npm run lint — run code checking with eslint, must be performed before each PR and fix all linter errors;
- npm lint:fix — same linter check, but with automatic fixes for simple errors.

---

Useful links:

- application: https://dtripled.github.io/project-drink-master/

- frontend: https://github.com/DTripleD/project-drink-master
