# sequelize-library

Консольное приложение на Node.js: Sequelize + SQLite. Связь таблиц 1:N — вариант A (Author — Book).

## Запуск

```bash
npm install
node index.js
```

## Предметная область

Связь «один-ко-многим»: один автор пишет много книг.

| Модель | Поля |
| --- | --- |
| Author | name (обязательное), country |
| Book | title (обязательное), year, genre |

- внешний ключ `authorId` создаётся в таблице Book (через `belongsTo`);
- ассоциация объявлена в паре: `Author.hasMany(Book)` + `Book.belongsTo(Author)`;
- использованы псевдонимы: `as: "books"` у автора и `as: "author"` у книги;
- специальный метод экземпляра: `author.createBook()` — создаёт книгу, привязанную к автору;
- жадная загрузка: `Author.findAll({ include: [{ model: Book, as: "books" }] })`.

## Что делает скрипт

1. Подключается к SQLite (`./library.sqlite`) и проверяет соединение;
2. Синхронизирует таблицы с `{ force: true }` (пересоздаёт при каждом запуске);
3. Создаёт автора и 3 его книги через `createBook()`;
4. Делает выборку авторов с книгами через `include` и выводит в консоль;
5. Закрывает соединение.

## Структура

```
db.js            — экземпляр Sequelize (dialect: sqlite)
models/index.js  — модели Author, Book + ассоциация 1:N
index.js         — основной скрипт
library.sqlite   — файл базы (в git не попадает)
```