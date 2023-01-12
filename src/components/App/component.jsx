import '../../_styles/App.css';

function App(props) {
    const { productList } = props;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Kemana App {productList}
        </p>
        
      </header>
    </div>
  );
}

export default App;
