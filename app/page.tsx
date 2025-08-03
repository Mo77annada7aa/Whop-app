'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to clip maker page immediately
		router.replace('/clip-maker');
	}, [router]);

	// Show a loading state while redirecting
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<div className="w-16 h-16 bg-gradient-to-r from-accent-9 to-accent-10 rounded-lg flex items-center justify-center mx-auto mb-4">
					<svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</div>
				<h1 className="text-2xl font-bold text-gray-9 mb-2">AI Video Clip Maker</h1>
				<p className="text-gray-6">Loading your clip maker...</p>
			</div>
		</div>
	);
}
