import { useRoutes } from 'react-router-dom';
import router from './routers'
import './App.css';

function App() {
  return useRoutes(router)
}

export default App;
