import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AnalysisFlow from './pages/analysis/AnalysisFlow';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analysis/:stepId" element={<AnalysisFlow />} />
      </Routes>
    </BrowserRouter>
  );
}
