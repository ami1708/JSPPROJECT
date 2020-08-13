const express = require('express')
const path = require('path');
const { title } = require('process');
const port = 1000;
const db = require('./cofig/mongoose');
const Contact = require('./models/contact')
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     req.myName = "dog" 
//     // console.log('middleware 1 called')
//     next();
// })
//middleware2

// app.use(function(req,res,next){
//     console.log('middleware 2 called')
//     next();
// })



var contactList = [
    {
        name : "CAt",
        phone: "123456789"
    },
    {
        name : "Tony",
        phone: "11111111"
    },
    {
        name : "Stark",
        phone: "165757585"
    }

]


app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console;e.log("error in fetching the data from db")
            return;
        }
        return res.render('home',{title: "Contact list",
   contact_list : contacts

    });

    // console.log(contactList)


});
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "lets play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone : req.body.phone
    // });


    Contact.create({
       name: req.body.name,
    phone:req.body.phone

    
    },function(err,newContact){

    if(err){
        console.log('error in creating a contact')
        return;
    }
    console.log('*****',newContact)
    return res.redirect('back')
    });
});
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});

// app.get('/delete-contact',function(req,res){
//     // console.log(req.query)
//     // get the id from query in the url
//     let id  = req.query.id;
//     // find the contact in the database using id and delete

//     Contact.findByIdAndDelete(id,function(err){
//         if(err){
//             console.log("error in finding the contact")
//             return;
//         }
//         return res.redirect('back');
//     })
//     // let contactIndex = contactList.findIndex(contact=>contact.phone==phone);
//     // if (contactIndex!= -1)
//     // {
//     //     contactList.splice(contactIndex,1)
//     // }
// })



app.listen(port,function(err){
    if(err){
        console.log("Error in running the  server",err);

    }
    console.log("express is running at port:",port);

});


