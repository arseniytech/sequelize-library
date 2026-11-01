const sequelize = require("./db");
const { Author, Book } = require("./models");

async function main() {
    try {
        await sequelize.authenticate();
        console.log("Подключение к базе данных установлено");

        await sequelize.sync({ force: true });
        console.log("Таблицы Authors и Books созданы");

        const author = await Author.create({ name: "Михаил Булгаков", country: "Россия" });

        await author.createBook({ title: "Мастер и Маргарита", year: 1967, genre: "Роман" });
        await author.createBook({ title: "Собачье сердце", year: 1925, genre: "Повесть" });
        await author.createBook({ title: "Белая гвардия", year: 1925, genre: "Роман" });

        const authors = await Author.findAll({ include: [{ model: Book, as: "books" }] });
        console.log("Авторы и их книги:");
        authors.forEach(a => {
            console.log(`- ${a.name} (${a.country}), книг: ${a.books.length}`);
            a.books.forEach(book => {
                console.log(`    * ${book.title}, ${book.year}, ${book.genre}`);
            });
        });
    } catch (error) {
        console.error("Ошибка:", error.message);
    } finally {
        await sequelize.close();
        console.log("Соединение закрыто");
    }
}

main();