const studentsTable=document.getElementById("studentsCount")
async function fetchstudentscount (){
    try{
  const response=await fetch("http://localhost:3000/api/v1/students")
  const data=await response.json()
  studentsTable.innerHTML=`<table><tr><th>firstname</th><th>lastname</th><th>Email</th><th>gender</th></tr>` 
for(let student of data){
    studentsTable.innerHTML+=`<tr><td>${student.firstName}</td><td>${student.lastName}</td><td>${student.email}</td><td>${student.gender}</td></tr>`
}

}catch(error){const studentsTable = document.getElementById("studentsCount");

async function fetchStudentsCount() {
    try {
        const response = await fetch("http://localhost:3000/api/v1/students");
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();

        // 1. Create the header
        let tableHTML = `<table>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Gender</th>
            </tr>`;

        // 2. Map data to rows and join them (Faster than += in a loop)
        const rows = data.map(student => `
            <tr>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.gender}</td>
            </tr>
        `).join("");

        // 3. Combine and close the table
        studentsTable.innerHTML = tableHTML + rows + `</table>`;

    } catch (error) {
        console.error("Fetch error:", error);
        studentsTable.innerHTML = "There was an error fetching students.";
    }
}

fetchStudentsCount();

        studentsTable.innerHTML="there was an error fetching student count"
    }
}
fetchstudentscount()