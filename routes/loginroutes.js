var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '54.164.147.172',
  user     : 'sadmin',
  password : 'welcome',
  database : 'ltod'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});


////////////////////

exports.login = async function(req,res){
    var username= req.headers['username'];
    var mpin = req.headers['mpin'];
    var columns = [username, mpin ];
   
    var query = mysql.format('select ma_user_auth_f(??) auth,ma_get_user_id_f(?) userid',[columns, username]);
    var sql = query.replace(/`/gi, "'")
    console.log(sql);
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred",
          "error": error
        })
    } else {
        res.send({
            "code":200,
            "mesg":"success",
            "result": results
          })
    }
      });
  }

  exports.leadlist = async function(req,res){
    var userid= req.headers['userid'];
    var query = mysql.format('SELECT lead_id,lead_name,lead_received_date,district_name,status_name FROM crm_leads_v where crm_check_view_priv(?,assigned_to,created_by)="Y" order by lead_received_date',[userid]);
    var sql = query.replace(/`/gi, "'")
    console.log(sql);
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred",
          "error": error
        })
    } else {
        res.send({
            "code":200,
            "mesg":"success",
            "result": results
          })
    }
      });
  }

  exports.activitylist = async function(req,res){
    var leadid= req.headers['leadid'];
    var query = mysql.format('SELECT activity_id,activity_name,activity_date,activity_time,reminder_required,reminder_date,reminder_time FROM crm_activities_v where lead_id=? and IFNULL(mute_reminder,"N")<>"Y";',[leadid]);
    var sql = query.replace(/`/gi, "'")
    console.log(sql);
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred",
          "error": error
        })
    } else {
        res.send({
            "code":200,
            "mesg":"success",
            "result": results
          })
    }
      });
  }
  


