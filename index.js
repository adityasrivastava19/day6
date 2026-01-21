const user=[
    {
        name: "john",
        kidney:[{
            health:false,
        }]
    }
]
  const express=require('express');
    const app=express();
    app.use(express.json());
    app.get('/',function (req,res)
{
    let kideny=user[0].kidney;
    let healthy=0;
    let nokidney=0;
    let unhealthy=0;
    for(let i=0;i<kideny.length;i++)
    {
        if(kideny[i].health==true)
        {
            healthy++;
        }
        else if(kideny[i].health==false)
        {
            unhealthy++;
        }
        nokidney++;
    }
    res.json({
        nokidney:nokidney,
        healthy:healthy,
        unhealthy:unhealthy,
    })
})
app.post('/',function (req,res)
{
    let health=req.body.health;
    user[0].kidney.push({health:health});
    res.json({
        message:"kidney added",
        kidney:user[0].kidney,
    })
})
app.put('/',function(req,res)
{
    for(let i=0;i<user[0].kidney.length;i++){
        user[0].kidney[i].health=true;
    }
    res.json({});
})
app.delete('/',function(req,res)
{
   if(unhealthy())
   {
     const newkidney=[];
    for(let i=0;i<user[0].kidney.length;i++)
    {
        if(user[0].kidney[i].health==true)
        {
            newkidney.push(user[0].kidney[i]);
        }
    }
    user[0].kidney=newkidney;
    res.json({
        message:"unhealthy kidney deleted",
        kidney:user[0].kidney,
    })
   }
    else{
        res.status(411).json({
            message:"no unhealthy kidney to delete",
        });
    }
})
function unhealthy()
{
    let uhealthy=false;
    for(let i=0;i<user[0].kidney.length;i++)
    {
        if(user[0].kidney[i].health==false)
        {
            uhealthy=true;
        }
    }
    return uhealthy;
}
app.listen(3000);
console.log("server is running on port 3000");
