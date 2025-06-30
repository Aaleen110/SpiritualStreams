import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/login/LoginPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuthStore();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isAdmin } = useAuthStore();
	if (!isAuthenticated) return <Navigate to="/login" replace />;
	if (!isAdmin) return <Navigate to="/" replace />;
	return <>{children}</>;
};

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					{/* <Route path='/chat' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} /> */}
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
