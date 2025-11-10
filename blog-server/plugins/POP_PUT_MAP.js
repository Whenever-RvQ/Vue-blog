module.exports = {
    "Article": {
        "revisable": ["title", "cover", "content","like_num"],
        "authField": "author"
    },
    "User": {
        "revisable": ["avator","password", "email", "nikname","signature"],
        "authField": "_id"
    },
    "Comment": {
        "revisable": ["content"],
        "authField": "uid"
    },
    "Column": {
        "revisable": ["aids"],
        "authField": "name"
    }
}