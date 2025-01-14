import { BrowserRouter, Routes, Route } from "react-router"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Home as Homepage} from "./pages/Home";
import { About as AboutPage } from "./pages/About";
import { NotFound as NotFoundPage } from "./pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col justify-between h-screen">
				<Navbar />
				<main className="container mx-auto px-3 pb-12">
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
