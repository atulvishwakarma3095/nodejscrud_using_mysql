const mysql=require('mysql2');

const conn=mysql.createConnection({
	host:"localhost:81",
	user:"root",
	password:"",
	database:"nodeexp",
	port:3306
});

conn.connect((error)=>{
	if (error) throw error;
	console.log('Connection Successfull');
});

module.exports.conn=conn;