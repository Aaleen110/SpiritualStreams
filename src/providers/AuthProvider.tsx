import { createContext, useContext, useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

interface AuthContextType {
        isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
        const context = useContext(AuthContext);
        if (context === undefined) {
                throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
};

interface AuthProviderProps {
        children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
        const [isLoading, setIsLoading] = useState(true);
        const { checkAdminStatus, user } = useAuthStore();

        useEffect(() => {
                const initAuth = async () => {
                        try {
                                if (user) {
                                        await checkAdminStatus();
                                }
                        } catch (error) {
                                console.error('Auth initialization failed:', error);
                        } finally {
                                setIsLoading(false);
                        }
                };

                initAuth();
        }, [user, checkAdminStatus]);

        if (isLoading) {
                return (
                        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                                <div className="text-center">
                                        <Loader className='size-8 text-[#D77B1E] animate-spin mx-auto mb-4' />
                                        <p className="text-zinc-400">Loading...</p>
                                </div>
                        </div>
                );
        }

        return (
                <AuthContext.Provider value={{ isLoading }}>
                        {children}
                </AuthContext.Provider>
        );
}; 