 

db.studentsmarks.aggregate(
   [
      {
        $group : {
           _id :  "$roll" ,
                creditsum:{ $sum: "$Credits"}
                     
                       
        }
      },
      ,
      { $match: { 
        creditsum:
          { $eq:   23   },
                  
      } }
   ]
)
      
      