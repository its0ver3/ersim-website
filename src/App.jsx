import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Team />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
