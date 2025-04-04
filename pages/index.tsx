import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Välkommen till Konsthall Tornedalen</h1>
        <p>Upplev konsten, kulturen och gemenskapen vid polcirkeln.</p>
      </main>
      <Footer />
    </>
  )
}
