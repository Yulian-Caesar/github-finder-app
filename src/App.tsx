import { BrowserRouter, Routes, Route } from "react-router"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Home as Homepage } from "./pages/Home";
import { About as AboutPage } from "./pages/About";
import { NotFound as NotFoundPage } from "./pages/NotFound";
import { User as UserPage } from "./pages/User";
import GithubProvider from "./context/github/GithubContext";
import AlertProvider from "./context/alert/AlertContext";
import { Alert } from "./components/layout/Alert";



function App() {
	return (
		<GithubProvider>
			<AlertProvider>
				<BrowserRouter>
					<div className="flex flex-col justify-between h-screen">
						<Navbar />
						<main className="container mx-auto px-3 pb-12">
							<Alert />
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="/about" element={<AboutPage />} />
								<Route path="/user/:login" element={<UserPage />} />
								<Route path="/*" element={<NotFoundPage />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</BrowserRouter>
			</AlertProvider>
		</GithubProvider>
	)
}

export default App
