import { Link } from 'react-router-dom';
import {  Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const NotFoundPage = () => {
	return (
		<div className='min-h-screen bg-zinc-900 flex items-center justify-center px-4'>
			<div className='text-center space-y-8'>
				<div className='space-y-4'>
					<img src='/spiritual-streams.png' className='size-24 mx-auto animate-bounce' />
					<h1 className='text-6xl font-bold text-white'>404</h1>
					<h2 className='text-2xl font-semibold text-zinc-300'>
						Page Not Found
					</h2>
					<p className='text-zinc-400 max-w-md mx-auto'>
						The page you're looking for doesn't exist. It might have been moved,
						deleted, or you entered the wrong URL.
					</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Button
						asChild
						className='bg-[#D77B1E] hover:bg-[#D77B1E]/90 text-white w-full sm:w-auto'
					>
						<Link to='/'>
							<Home className='size-4 mr-2' />
							Go Home
						</Link>
					</Button>
					<Button
						variant='outline'
						onClick={() => window.history.back()}
						className='w-full sm:w-auto'
					>
						<ArrowLeft className='size-4 mr-2' />
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
