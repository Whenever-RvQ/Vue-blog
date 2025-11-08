const Article = require("../models/Article");
const Column = require("../models/Column");
const User = require("../models/User");

module.exports = {
    Comment: [{
        "_refId": "aid",
        "content": "content",
        "_model": Article,
        "queryAct": "findByIdAndUpdate",
        "options": function (_id) {
            return {
                "$push": {
                    "comments": _id
                },
                "$inc": {
                    "comment_num": 1
                }
            }
        }

    }],
    Article: [{
        "_refId": "column",
        "_model": Column,
        "queryAct": "findByIdAndUpdate",
        "options": function (_id) {
            return {
                "$push": {
                    "aids": _id
                }
            }
        }
    },
    {
        "_refId": "author",
        "_model": User,
        "queryAct": "findByIdAndUpdate",
        "options": function (_id) {
            return {
                "$inc": {
                    "articleCount": 1
                },
            }
        }
    },
    ],
    Column: [{
        "_refId": "aids",
        "_model": Article,
        "queryAct": "findByIdAndUpdate",
        "options": function (_id) {
            return {
                "$set": {
                    "column": _id
                }
            }
        }
    },
    {
        "_refId": "uid",
        "_model": User,
        "queryAct": "findByIdAndUpdate",
        "options": function (_id) {
            return {
                "$inc": {
                    "columnCount": 1
                }
            }
        }
    },
    ],
}