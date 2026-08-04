import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { TechStack } from './components/TechStack'
import { Projects } from './components/Projects'
import { MoreProjects } from './components/MoreProjects'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <TechStack />
        <Projects />
        <MoreProjects />
      </main>
      <Contact />
    </div>
  )
}
