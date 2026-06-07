import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogView } from './pages/BlogView';
import { Projects } from './pages/Projects';
import { ProjectView } from './pages/ProjectView';
import { Demos } from './pages/Demos';
import { About } from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:documentId" element={<ProjectView />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
