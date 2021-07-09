const express= require('express');
const mongoose= require('mongoose');
const User= require('./model/schema');

const usertask= require('./model/taskSchema');


const app= express();

//mongodb url config
let db= require('./config/keys.js').mongoURL ;
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true })
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log(err));

app.use(express.urlencoded({extended: true }));

app.set('view engine','ejs');
app.use(express.static('./public/styles'));
app.use(express.static('./public/images'));
app.use(express.static('./public/script'));
app.get('/', (req,res)=> {
    res.render('home',{title:'Learn anytime , any where'});
});

app.get('/login',(req,res)=> {
    res.render('login' ,{title:'Log in',msg:''});
})


app.get('/signup',(req,res)=> {
    res.render('sign up',{title:'Sign up and start learning'});
    res.status(200)
})

//post methode for signup 
app.post('/signup',(req,res)=> {
    const {firstname, lastname, email,password,repassword}= req.body ;
    let errors=[];
    let title='Sign Up and Start Learning';
    if(!firstname || !lastname || !email || !password || !repassword){
        errors.push({msg:'must fill all the fields'});
        
    }
    if(password !== repassword){
        errors.push({msg:'password is not matching'});
    }
     if(password.length <8){
        errors.push({msg:'password must be atleast 8 characters'});
        
    }
    if(errors.length > 0){
        res.render('sign up',{
            errors,
            firstname,
            lastname,
            email,
            password,
            repassword,
            title
            
        });
    }
    else{
        User.findOne({email: email})
        .then(( users)=> {
            if(users){
                errors.push({msg:'Email is already exists, plase Log In'});
                res.render('sign up',{
                    errors,
                    firstname,
                    lastname,
                    email,
                    password,
                    repassword,
                    title
                });
            }
            else{
                var newuser= new User({
                    firstname:firstname,
                    lastname:lastname,
                    email: email,
                    password: password,
                    repassword: repassword
                });
                newuser.save()
                    .then(user => {
                    
                        res.render('login',{msg :'you are registered successfully, Log In here' ,title:'Log In user'});
                    })
                    .catch(err=> console.log(err))
            }
        })
        .catch((err)=> console.log(err));
    }
        
});

app.post('/login',(req,res)=> {
    const {email, password,repassword,firstname}= req.body;
    let errors=[]
    let title='Log In user';
    if(!email || !password || !repassword){
        errors.push({msg:'must fill all the fields'})
    }
    if(password !== repassword){
        errors.push({msg:"password doesn't match"});
    }
    if(password.length <8 ){
        errors.push({msg:'password must be atleast 8 characters'});
    }
    if(errors.length > 0){
        res.render('login',{
            errors,
            email,
            password,
            repassword,
            title,
            msg:'',
        });
    }
     else{
        User.findOne({email:email ,password:password})
            .then(user=> {
                 let name=user.email;
                 name=name.slice(0,6);
                 console.log(user);
               
                if(user){
                res.render('rigester',{title:'user profile',name:name})
                }
                else{
                    errors.push({msg:'ur creadentials do not match, plase sign up'})
                
                res.render('login' ,{errors , title});

                }
            })
            .catch(err=> console.log(err))
    }

})

/// learning page 

app.get('/user/learning',(req,res)=> {
    res.render('rigester',{title:'user learning',name:''})

})

// user profile get request

app.get('/user/profile',(req,res)=> {
    User.find().sort({_id:1})
        .then((result)=> {

    res.render('profile',{title:'user profile' ,name:'',result:result ,mes:''})
        })
});

//update profile details


app.post('/user/profile',(req,res)=> {
    User.find().sort({_id:1})
        .then((result)=> {
            let email= result[result.length -1 ].email ;
            if( email !== null){
                const {number,qualification,city ,category}=req.body ;
                User.updateOne({email:email},{$set:{number:number ,qualification:qualification ,city:city,category:category}})
                    .then((result)=> {
                        
                        res.redirect('/user/profile');
                    })
                    .catch((err)=> console.log(err));
                }
        })
        .catch((err) => console.log(err));
});


//user task managet get request


app.get('/user/tasks',(req,res)=> {

    var adding=[{project:'',descri:'',completed:'',date:''}]

    res.render('userblog',{ value :'' ,title:'User blog',name:'',project:'',descri:'',completed:'',date:'',adding});
});

//adding tasks- task manager
app.post('/user/tasks',(req,res)=> {
    const {project, descri , completed, date}=req.body;
    var adding= [{project,descri,completed ,date},];
    var userTask= new usertask({
        project:project,
        descri:descri,
        completed:completed,
        date:date,
    })
    if(!project || !descri || !completed || !date){
        res.render('userblog',{title:'all tasks',name:'',value:'plase , add all the fiels'});
    }
    else{
    userTask.save()
        .then((result)=> {

            res.render('userblog',{title:'all tasks',name:'',value:'Data has been added successfully'});

        })
        .catch((err)=> console.log(err));}

});

app.get('/user/alltasks',(req,res)=> {
    usertask.find()
        .then((result)=> {
            res.render('alltasks',{msg:'',name:'',title:'all tasks',blog:result});

        })
});


//updating tasks

app.post('/user/alltasks',(req,res)=> {
    const {project,descri, completed,date}=req.body;
    
    if(!project || !completed || !descri){
        res.redirect('/user/alltasks');

    }
    else{
    usertask.findOneAndUpdate({project:project},{$set:{descri:descri,completed:completed,date:date},})
        .then((result)=> {
            res.render('alltasks',{name:'',title:'all tasks',blog:result,msg:'your data has been updated succussfully'})
        })
        .catch(err=> console.log(err));

    }
})

// delete your tasks 

app.get('/user/delete',(req,res)=> {
    res.render('delete',{title:'delete task',name:"",msg:''})

});


//deleting 
app.post('/user/delete',(req,res)=> {
    const {project,}=req.body ;
    if(!project){
        res.render('delete',{title:'delete task',name:'',msg:'please enter valid details'})
    }
    else{
    usertask.findOne({project:project})
        .then((result)=>{
            if(result.length !==null){
                usertask.deleteOne({_id:result._id})
                    .then(val=> {
                        res.render('delete',{title:'delete task',name:'',msg:'data has been deleted successfully'})

                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err));
    }
});


const PORT= process.env.PORT || 8080;
app.listen(PORT,console.log(`your server running on port ${PORT}`));