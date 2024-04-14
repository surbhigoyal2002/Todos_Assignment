//importing hooks from react
import {useState, useEffect} from 'react';
//importing axios
import axios from 'axios';
//imports from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function App() {

  const[list, setList] = useState([]); //storing todo-tasks in list
  const[index, setIndex] = useState(2); //storing indexes of tasks in index
  const[status, setStatus] = useState(); // completion or deletion status

  //asynchronous function fetching api and updating setList
  const getApiData = async () => {
    
    try{
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      console.log(res.data);
      setList(res.data);
      // console.log(list);
    }
    catch(err){
      console.log(err);
    }
  };
  
  //using useEffect hook
  useEffect(() => {
    getApiData();
  }, []);
  
  //on clicking task
  const showTask = (e, key) => {
    e.preventDefault();
    setIndex(key);//assigning key to index
    setStatus(list[index]?.completed); // assigning completion status as true or false
    console.log(index); 
    console.log(list[index]); 
  }

  //on clicking completed button
  const completeTask = (e) =>{
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${index+1}`, {completed : true})// updating the task completion status using axios patch
      .then((res) => {
        console.log(res.data);
        setStatus(true);// setting status of completion as true
      })
      .catch((err) => {
        console.log(err);
      })
  }

   //on clicking delete button
  const deleteTask = (e) =>{
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${index+1}`, {completed : false}) // deleting the task by using axios delete 
      .then((res) => {
        console.log(res.data);
        console.log(`Deleted task ${index}`);
        setStatus(false); // setting status of completion as false
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
    <div>
      <Container className = "main-box">
      <Row>
        <Col className = "col1">
          <ListGroup className="List-Group">
          {
            //using map to traverse the task list
            list.map((data, key) => { 
              return(
                <ListGroup.Item className = "item" onClick={(e) => {
                  showTask(e, key);
                }}>{data.title}</ListGroup.Item>
              )
            })
          }
          
          </ListGroup> 
        </Col>
        <Col>
        <div className = "col2">
        <div> <b>Title : </b>
          {
            list[index]?.title
          }
          </div>
          <div> <b>User ID : </b>
          {
            list[index]?.userId
          }
          </div>
          <div>
            <b>Completed : </b> {status ? `${true}` : `${list[index]?.completed}`}
          </div>
          <div className = "btn-group">
          
          <Button variant="danger" onClick= {
            () => {deleteTask()}
          }>Delete</Button>
          <Button variant="success" onClick = {
            () => {completeTask()}
          }>Completed</Button>
          
          </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;