import { RoutersMain } from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import Spinner from './components/Spinner';

function App() {
  return (
    <>
      <RoutersMain />

      <ToastContainer />

      <Spinner />
    </>
  )
}

export default App
