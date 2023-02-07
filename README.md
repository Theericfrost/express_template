Пакеты:

1. bcryptjs - криптографическая либа (хеширование паролей)
2. dotenv - подтягивать данные из .env
3. express - фреймворк над node js
4. express-mongo-sanitize - защита от NoSQL атак
5. express-rate-limit - ограничение количества запросов от одного ip ( хорошо продумать количество )
6. helmet - настраивает защитные Headers
7. hpp - защита от HTTP Parameter Pollution (проверить)
8. jsonwebtoken - библиотека для генерации jwt
9. mongoose - либа для работы с mongodb
10. morgan - либа для логирования запросов
11. nodemailer - отправка почты
12. slugify - вспомогательная либа убирающая пробелы и заменяющая их - \_
13. validator - валидатор
14. xss-clean - защита от xss атак
15. nodemon - быстрая пересборка на изменения

Точка Входа: server.js
Команды:
"start": "nodemon server.js",
"start:prod": "NODE_ENV=production nodemon server.js",
"debug": "ndb server.js"

Наборы Данных (миграции):
Папка dev-data данные в формате json. Запустить import-dev-data.js
node import-dev-data.js --delete - удалить все
node import-dev-data.js --import - добавить данные

CRUD:
Логика уже реализована через utils/handlerFactory. Пример можно посмотреть в controllers/carController. Что то кастомное уже реализовывать в своем controller. Не расширять handlerFactory.

Фильтрация:
Логика реализована в utils/apiFeatures по дефолту вызывается в utils/handlerFactory getAll.

1. filter - /api/v1/cars?price=999990 можно пользоваться модификаторами (gte|gt|lte|lt) /api/v1/cars?price[lt]=999990
2. sort - descending /api/v1/cars?sort=-price, a ascending /api/v1/cars?sort=price
3. limitFields - /api/v1/cars?fields=name,description
4. pagination - /api/v1/cars?page=1&limit=1

Авторизация:
1. Пользователь регистрируется /api/v1/user/signup ему в ответе приходит token который надо записать в куки
2. Пользователь логинится /api/v1/user/login приходит также token
token сохраняем на фронте в куки под определеное время и отправляем на запросы как Bearer token
