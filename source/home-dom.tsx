import { hydrateRoot } from 'react-dom/client';
function App(){
  return <h1>App</h1>
}

hydrateRoot(
  document.getElementById('root'),
  <App />
);
