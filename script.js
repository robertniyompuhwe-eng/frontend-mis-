try{ 
const users=await fetch('http://localhost:3000/api/v1/users')
 const data=await users.json()
}catch(error){
    
};
