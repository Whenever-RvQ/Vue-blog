module.exports = {
    "Article": [
        {
            "path": "author",
            "select": "nikname avator username"
        },
        {
            "path": "column",
            "select": "name date"
        },
        {
            "path": "comments",
            "select": "content date uid",
            "populate": {
                "path": "uid",
                "select": "nikname avator username"
            }
        }
    ],
    "Comment": [
        {
            "path": "uid",
            "select": "nikname avator"
        }
    ],
    "User": [
        
    ],
    
}