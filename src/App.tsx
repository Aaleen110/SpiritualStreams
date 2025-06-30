import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "react-hot-toast";

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
        const { isAuthenticated, isAdmin } = useAuthStore();
        if (!isAuthenticated) return <Navigate to="/login" replace />;
        if (!isAdmin) return <Navigate to="/" replace />;
        return <>{children}</>;
};

// Placeholder components for Day 1
const HomePage = () => (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">Welcome to SpiritualStreams</h1>
                        <p className="text-zinc-400">Home page coming soon...</p>
                </div>
        </div>
);

const LoginPage = () => (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">Login</h1>
                        <p className="text-zinc-400">Login page coming soon...</p>
                </div>
        </div>
);

const AdminPage = () => (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">Admin Dashboard</h1>
                        <p className="text-zinc-400">Admin page coming soon...</p>
                </div>
        </div>
);

const AlbumPage = () => (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">Album Details</h1>
                        <p className="text-zinc-400">Album page coming soon...</p>
                </div>
        </div>
);

const NotFoundPage = () => (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">404 - Not Found</h1>
                        <p className="text-zinc-400">Page not found</p>
                </div>
        </div>
);

// Main Layout Component
const MainLayout = () => (
        <div className="min-h-screen bg-zinc-900">
                <div className="flex">
                        {/* Sidebar placeholder */}
                        <div className="w-64 bg-zinc-800 min-h-screen p-4">
                                <h2 className="text-[#D77B1E] font-bold">SpiritualStreams</h2>
                                <p className="text-zinc-400 text-sm mt-2">Sidebar coming soon...</p>
                        </div>
                        
                        {/* Main content */}
                        <div className="flex-1">
                                <Routes>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/albums/:albumId' element={<AlbumPage />} />
                                        <Route path='*' element={<NotFoundPage />} />
                                </Routes>
                        </div>
                </div>
        </div>
);

function App() {
        return (
                <>
                        <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

                                <Route element={<MainLayout />}>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/albums/:albumId' element={<AlbumPage />} />
                                        <Route path='*' element={<NotFoundPage />} />
                                </Route>
                        </Routes>
                        <Toaster />
                </>
        );
}

export default App;
