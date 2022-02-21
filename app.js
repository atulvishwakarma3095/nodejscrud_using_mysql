const express=require('express');

const app=express();
const port=3004;
const mysql=require('./connection').conn;


//configuration
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));

//routing
app.get('/',(req,res)=>{
	res.render('index')
});
app.get('/add',(req,res)=>{
	res.render('add')
});
app.get('/addusers',(req,res)=>{

	const{txtname,txtcontact,txtemail,txtgender}=req.query;

	//sanitization XSS

	let qry="select * from users where email=? and contact=?";
	mysql.query(qry,[txtemail,txtcontact],(err,result)=>{
		if(err) throw err
			else{
				if(result.length>0)
				{

				}
				else
				{
					let qry1="insert into users values(?,?,?,?,?)";
					mysql.query(qry1,['1',txtname,txtcontact,txtemail,txtgender],(err,result)=>{
						if(result.affectedRows>0)
						{
							res.render('add',{mesg:true});
						}
					});
				}
			}
	});

});
app.get('/search',(req,res)=>{
	res.render('search')
});
app.get('/update',(req,res)=>{
	res.render('update')
});
app.get('/delete',(req,res)=>{
	res.render('delete')
});
app.get('/view',(req,res)=>{
	res.render('view')
});

//server
app.listen(port,(err)=>{
	if (err) {throw err}else{ console.log('server is running')}
});