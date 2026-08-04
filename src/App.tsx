import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TechStack } from './components/TechStack'
import { Projects } from './components/Projects'
import { MoreProjects } from './components/MoreProjects'
import { Dashboard } from './components/Dashboard'
import { Snippets } from './components/Snippets'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <MoreProjects />
        <Dashboard />
        <Snippets />
      </main>
      <Contact />
    </div>
  )
}
