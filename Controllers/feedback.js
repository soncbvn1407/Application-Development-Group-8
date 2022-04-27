const express = require('express');
const router = express.Router();
const dbHandler = require('../databaseHandler');


router.use((req, res, next) => {
    if (req.session.user == null) {
        res.redirect("/login");
    } else {
        if (req.session.user.role == 'Customer') {
            next();
        } else {
            res.redirect("/admin");
        }
    }
})

router.get("/", async(req, res) => {
    const result = await dbHandler.getAll("Feedback");
    const arr = [];
    const book = await dbHandler.getDocumentByName("Book", req.query.name);
    result.forEach(e => {
        if (req.query.name === e.name) {
            arr.push(e);
        }

    })
    console.log(book)
    res.render("feedback", { query: req.body.name, list: arr, book: book }); //lay id cua sach truyen vao form
});
router.post("/", (req, res) => {
    const obj = {
        ...req.body, //copy all element of req.body
        username: req.session.user.name,
        time: new Date().toISOString(),
    };
    dbHandler.insertObject("Feedback", obj);
    res.redirect("/");
});



module.exports = router;