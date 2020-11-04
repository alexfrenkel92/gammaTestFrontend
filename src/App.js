import Products from './components/Products/Products';
import classes from './App.module.css';

function App() {
  return (
    <div className={`${classes.App} container`}>
      <Products />
    </div>
  );
}

export default App;
