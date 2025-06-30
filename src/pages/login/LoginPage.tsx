import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Music } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuthStore } from '../../stores/useAuthStore';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuthStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Use mock login
			await login(email, password);
			navigate('/');
		} catch (error) {
			console.error('Login failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="flex justify-center mb-6">
						<div className="p-3 bg-[#D77B1E] rounded-full">
							<Music className="h-8 w-8 text-white" />
						</div>
					</div>
					<h2 className="text-3xl font-bold text-white">Welcome back</h2>
					<p className="mt-2 text-zinc-400">
						Sign in to your account to continue
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
							Email address
						</label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							required
							className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
							Password
						</label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
								className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
							>
								{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
							</button>
						</div>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full bg-[#D77B1E] hover:bg-[#D77B1E]/90 text-white font-semibold"
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</Button>
				</form>

				<div className="text-center">
					<p className="text-sm text-zinc-400">
						Demo credentials: admin@example.com / password123
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage; 