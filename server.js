var express = require("express");
var app = express();
var mongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var url = "mongodb://localhost:27017/runoob";
var port = 8080;

mongoClient.connect(url,function (err,db) {
    if(err) throw err;
    var dbase = db.db("runoob");
    dbase.collection("userlist").find({}).toArray(function(err, result) {
        if (err) throw err;
        if(!result.length){
            dbase.createCollection("userlist",function (err,res) {
                console.log("建库")
                db.close();
            })
        }else{
            db.close();
        }
    });
})


app.post("/submit",urlencodedParser,function (req,res) {
    res.setHeader("Content-type","text-plain");
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mongoClient.connect(url,function (err,db) {
        if(err) throw err;
        var dbase = db.db("runoob");
        dbase.collection("userlist").insertOne(req.body,function (err,resu) {
            var data = JSON.stringify({code:"200",msg:"success"});
            if(err) throw err;
            res.end(data);
        })
    })
})

app.get("/getuserlist",function (req,res) {
    var data;
    res.setHeader("Content-type","text-plain");
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mongoClient.connect(url,function (err,db) {
        if(err) throw err;
        var dbase = db.db("runoob");
        dbase.collection("userlist").find({}).toArray(function (err,result) {
            if(err) throw err;
            data = JSON.stringify(result);
            res.end(data);
        })
    })

})
var server = app.listen(port,function (req,res) {
    
})


