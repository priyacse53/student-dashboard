import { useState } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([
    { id: 1, name: "Priya", department: "CSE", year: "Final Year" }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);


  const addStudent = () => {
    if(name && department && year){
      const newStudent = {
        id: Date.now(),
        name,
        department,
        year
      };

      setStudents([...students,newStudent]);

      setName("");
      setDepartment("");
      setYear("");
    }
  };


  const deleteStudent = (id) => {
    setStudents(
      students.filter((student)=>student.id !== id)
    );
  };


  const editStudent = (student) => {
    setName(student.name);
    setDepartment(student.department);
    setYear(student.year);
    setEditId(student.id);
  };


  const updateStudent = () => {

    setStudents(
      students.map((student)=>
        student.id === editId
        ? {id:editId,name,department,year}
        : student
      )
    );

    setName("");
    setDepartment("");
    setYear("");
    setEditId(null);
  };


  const filteredStudents = students.filter((student)=>
    student.name.toLowerCase()
    .includes(search.toLowerCase())
  );


  return (
    <div className="container">

      <h1>Student Dashboard</h1>

      <input 
        placeholder="Student Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input 
        placeholder="Department"
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
      />

      <input 
        placeholder="Year"
        value={year}
        onChange={(e)=>setYear(e.target.value)}
      />

      {
        editId ?
        <button onClick={updateStudent}>
          Update
        </button>
        :
        <button onClick={addStudent}>
          Add Student
        </button>
      }


      <br/>

      <input
        className="search"
        placeholder="Search Student"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />


      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>

        {
          filteredStudents.map((student)=>(
            <tr key={student.id}>

              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>

              <td>
                <button onClick={()=>editStudent(student)}>
                  Edit
                </button>

                <button 
                className="delete"
                onClick={()=>deleteStudent(student.id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))
        }

        </tbody>

      </table>

    </div>
  );
}

export default App;