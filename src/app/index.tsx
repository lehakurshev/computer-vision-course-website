// External imports
import { Routes, Route } from 'react-router-dom';

// Local imports
import HomePage from '../pages/Home';
import CourseProgram from '../pages/course-program';
import AboutAuthor from '../pages/about-author';
import GetConsultation from '../pages/get-consultation';

import NavigationButtons from '../components/NavigationButtons';

// Component definition
function App() {
  return (
    <div>
      <NavigationButtons />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="course-program" element={<CourseProgram />} />
        <Route path="about-author" element={<AboutAuthor />} />
        <Route path="get-consultation" element={<GetConsultation />} />
      </Routes>
    </div>
  );
}

// Default export
export default App;
