import { BrowserRouter } from 'react-router-dom';
import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Rutas from "./routes/Routes.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Rutas />
            </BrowserRouter>
        </>
    )
}

export default App;
