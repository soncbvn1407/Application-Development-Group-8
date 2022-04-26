const express = require("express");

const dbHandler = require("../databaseHandler");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async (req, res) => {
  const books = await dbHandler.getAll(
    "Book",
  );
  

  if (!req.session.user) {
    res.render("HomePage", { books: books });
  } else {
    res.render("HomePage", {
      books: books,
      user: req.session.user,
    });
  }
});

router.get("/search", async (req, res) => {
  const truyen = await dbHandler.searchObjectbyCategory(
    "Book",
    "61e570c7ba41b21dee1346b3"
  );
  const ITbook = await dbHandler.searchObjectbyCategory(
    "Book",
    "61e570ddba41b21dee1346b4"
  );
  const searchInput = req.query.searchInput;
  if (isNaN(searchInput) == false) {
    await SearchObject(
      req,
      searchInput,
      res,
      truyen,
      ITbook,
      dbHandler.searchObjectbyPrice,
      "Book",
      Number.parseFloat(searchInput),
      " VND"
    );
  } else {
    await SearchObject(
      req,
      searchInput,
      res,
      truyen,
      ITbook,
      dbHandler.searchObjectbyName,
      "Book",
      searchInput,
      ""
    );
  }
});

async function SearchObject(
  req,
  searchInput,
  res,
  truyen,
  ITbook,
  dbFunction,
  collectionName,
  searchInput,
  mess
) {
  const resultSearch = await dbFunction(collectionName, searchInput);
  if (resultSearch.length != 0) {
    if (!req.session.user) {
      res.render("HomePage", {
        searchBook: resultSearch,
        truyens: truyen,
        ITbooks: ITbook,
      });
    } else {
      res.render("HomePage", {
        searchBook: resultSearch,
        truyens: truyen,
        ITbooks: ITbook,
        user: req.session.user,
      });
    }
  } else {
    if (!req.session.user) {
      const message = "Not found " + searchInput + mess;
      res.render("HomePage", {
        truyens: truyen,
        ITbooks: ITbook,
        errorSearch: message,
      });
    } else {
      const message = "Not found " + searchInput + mess;
      res.render("HomePage", {
        truyens: truyen,
        ITbooks: ITbook,
        errorSearch: message,
        user: req.session.user,
      });
    }
  }
}

router.get("/detail", async (req, res) => {
  const id = req.query.id;
  const result = await dbHandler.getDocumentById(id, "Book");

  if (!req.session.user) {
    res.render("detail", { details: result });
  } else {
    res.render("detail", {
      details: result,

      user: req.session.user,
    });
  }
});

module.exports = router;