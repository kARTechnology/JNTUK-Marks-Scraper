db.getCollection('studentsmarks').find({Subject_Name:'WEB TECHNOLOGIES',Credits:{$ne: 3} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'DATA WARE HOUSING AND MINING',Credits:{$ne: 3} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'SOFTWARE TESTING',Credits:{$ne: 3} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'COMPUTER NETWORKS',Credits:{$ne: 3} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'DESIGN AND ANALYSIS OF ALGORITHMS',Credits:{$ne: 3} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'IPR AND PATENTS',Credits:{$ne: 2} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'COMPUTER NETWORKS AND NETWORK PROGRAMMING  LAB',Credits:{$ne: 2} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'SOFTWARE TESTING LAB',Credits:{$ne: 2} }).count()
db.getCollection('studentsmarks').find({Subject_Name:'WEB TECHNOLOGIES LAB',Credits:{$ne: 2} }).count()