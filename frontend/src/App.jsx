import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss'
import StoreProvider from './store/StoreProvider';
import Router from './routes';
import CustomToast from './components/CustomToast';
import { ToastProvider } from './context/custom-toast';

function App() {

  return (
    <>
      <StoreProvider>
        <ToastProvider>
          <Router />
          <CustomToast />
        </ToastProvider>
      </StoreProvider>
    </>
  )
}

export default App
