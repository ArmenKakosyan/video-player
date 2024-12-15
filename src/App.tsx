import useGlobalStyles from './hooks/useGlobalStyles';
import Video from './pages/Video/Video';

function App() {
  useGlobalStyles();

  return <Video />;
}

export default App;
