import {useState, useEffect} from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function App() {

  const[list, setList] = useState([]);
  const[index, setIndex] = useState(2);
  const[status, setStatus] = useState();

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
  
  useEffect(() => {
    getApiData();
  }, []);
  
  const showTask = (e, key) => {
    e.preventDefault();
    setIndex(key);
    setStatus(list[index]?.completed);
    console.log(index); 
    console.log(list[index]); 
  }

  const completeTask = (e) =>{
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${index+1}`, {completed : true})
      .then((res) => {
        console.log(res.data);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteTask = (e) =>{
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${index+1}`, {completed : false})
      .then((res) => {
        console.log(res.data);
        console.log(`Deleted task ${index}`);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
    <Container>
      <Row>
        <Col className = "col1">
          <ListGroup>
          {
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
          <span>
          <Button variant="danger" onClick= {
            () => {deleteTask()}
          }>Delete</Button>
          <Button variant="success" onClick = {
            () => {completeTask()}
          }>Completed</Button>
          </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;