module.exports={
    // Comment:{
    //     "_refId":"aid",
    //     "content":"content",
    //     "_model":require("../models/Article"),
    //     "queryAct":"findByIdAndUpdate",
    //     "options":function(_id){
    //        return {
    //            "$push":{
    //                "comments":_id
    //            },
    //            "$inc":{
    //                 "comment_num":1
    //            }
    //        }
    //     }

    // },
    Article:{
        "queryAct":"findByIdAndUpdate",
        "options":function(_id){
           return {
               "$inc":{
                   "hit_num":1
               }
           }
        }
    },
    //访客量
    // User:{
    //     "queryAct":"findByIdAndUpdate",
    // }
    // Column:{
    //     "_refId":"aids", 
    //     "_model":require("../models/Article"),
    //     "queryAct":"findByIdAndUpdate",
    //     "options":function(_id){
    //        return {
    //            "$set":{
    //                "column":_id
    //            }
    //        }
    //     }
    // },
}