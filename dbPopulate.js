const { Client } = require('pg')
 
const client_new = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'dadajibesthai',
  database:'Instispace_New'
})

const client_old = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'dadajibesthai',
    database: 'instispace_backup'
  })

  client_new.connect();
  client_old.connect();


  client_old.query(`SELECT * FROM "User" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`);
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "User"("id","name","ldapName","roll","password","mobile","isNewUser","role","mpath","permissionId","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
        const values = [i.id,i.name,i.ldapName,i.roll,i.password,i.mobile,i.isNewUser,i.role,null,null,null]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`)
    }
    else{
        console.log(err.stack);
    }
  })

  client_old.query(`select * from "Tag" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "Tag"("id","title","category") VALUES($1, $2, $3) RETURNING *'
        const values = [i.id,i.title,i.category]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })

  client_old.query(`select * from "tag_users_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "tag_users_user"("tagId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.tagId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })

  client_old.query(`select * from "Event" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
  for (const i of res.rows) {
    const text = 'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
    const values=[i.id,i.createdAt,i.createdAt, i.title,i.content,"clubEvent",i.photo,i.isHidden,i.location,"POSTED",i.linkName,i.linkToAction,i.time,i.createdById]
    client_new.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } 
        else{
          count=count+1;
        }
        
      })
   }
   console.log(`retrived entries ${count}`);
  }

   else{
      console.log(err.message)
    }
})


  client_old.query(`select * from "Item" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
  for (const i of res.rows) {
    const text = 'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
    const values=[i.id,i.createdAt,i.createdAt,i.contact,i.name,i.category,i.images,i.isResolved,i.location,'POSTED',null,null,null,i.userId]
    client_new.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } 
        else{
          count++;
        }
        
      })
   }
   console.log(`retrived entries ${count}`);
  }

   else{
      console.log(err.message)
    }
})


client_old.query(`select * from "MyQuery" `,(err,res)=>{
  if(!err){
    console.log(`fetched entries ${res.rows.length}`)
    let count=0;
for (const i of res.rows) {
  const text = 'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
  const values=[i.id,i.createdAt,i.createdAt,i.title,i.content,"query",i.photo,i.isHidden,null,i.status,null,null,null,i.createdById]
  client_new.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } 
      else{
        count++;
      }
      
    })
 }
 console.log(`retrived entries ${count}`);
}

 else{
    console.log(err.message)
  }
})



client_old.query(`select * from "Netop" `,(err,res)=>{
  if(!err){
    console.log(`fetched entries ${res.rows.length}`)
    let count=0;
for (const i of res.rows) {
  const text = 'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
  const values=[i.id,i.createdAt,i.createdAt,i.title,i.content,"opportunities",i.photo,i.isHidden,null,i.status,i.linkName,i.linkToAction,i.endTime,i.createdById]
  client_new.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } 
      else{
        count++;
      }
      
    })
 }
 console.log(`retrived entries ${count}`);
}

 else{
    console.log(err.message)
  }
})


 client_old.query(`select * from "event_liked_by_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.eventId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


  client_old.query(`select * from "event_stared_by_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_saved_by_user"("postId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.eventId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


  client_old.query(`select * from "event_tags_tag" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_tags_tag"("postId","tagId") VALUES($1, $2) RETURNING *'
        const values = [i.eventId,i.tagId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


   client_old.query(`select * from "netop_liked_by_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.netopId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


  client_old.query(`select * from "netop_stared_by_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_saved_by_user"("postId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.netopId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


  client_old.query(`select * from "netop_tags_tag" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_tags_tag"("postId","tagId") VALUES($1, $2) RETURNING *'
        const values = [i.netopId,i.tagId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })


    client_old.query(`select * from "my_query_liked_by_user" `,(err,res)=>{
    if(!err){
      console.log(`fetched entries ${res.rows.length}`)
      let count=0;
       for (const i of res.rows) {
        const text = 'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *'
        const values = [i.myQueryId,i.userId]

        client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack)
            } 
            else{
              count++;
            }
          })
       }
       console.log(`retrived entries ${count}`);
    }
    else{
        console.log(err.message);
    }
  })






  client_old.end;
  client_new.end;


  






  