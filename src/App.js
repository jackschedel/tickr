import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Get ticker data</Form.Label>
            <Form.Control type="name" placeholder="Enter stock ticker" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Get Data
          </Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
