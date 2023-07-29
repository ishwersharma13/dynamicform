import './App.css';
import FormBuilder from './components/FormBuilder';
import FormList from './components/FormList';

function App() {
  const formId = Date.now()
  return (
    <div className="App">
      <FormBuilder formId={formId} />
      <FormList />
    </div>
  );
}

export default App;
