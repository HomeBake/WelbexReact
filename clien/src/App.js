import './App.css';
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Table from "./pages/Table";


function App() {
    return (
        <div className="App">
            <div className={'side-bar'}>
                <Filter/>
                <Sort/>
            </div>
            <Table/>
        </div>
    );
}

export default App;
