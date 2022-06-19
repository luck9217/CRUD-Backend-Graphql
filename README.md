CRUD-Backend-Graphql

Database:MySql and Graphql

Connection: TypeORM

url : http://localhost:3000/Graphqlm

Unique Url with playground to use Query and Mutation (manipulate table)

Querys:


query{
getAllUsers{
  name
  username
  id
}

}
query{
getUser(id:15){
  name
  username
}
}

query{
greeting
}

mutation{
updateUser(id:15,
input:{name:"PRUEBA",
  username:"PRUEBA",
  oldPassword:"admin",
  newPassword:"admin"
 
})
  {
    success
    message
  }
}

mutation{
createUser(  
  name:"Prueba"
  username:"Prueba"
  password:"admin"
){
  id
  name
}  
}

mutation{
deleteUser(id:1)
}




