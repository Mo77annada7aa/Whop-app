'use client';

import { useState } from 'react';

export default function VideoClipMaker() {
	const [videoUrl, setVideoUrl] = useState('');
	const [customClipCount, setCustomClipCount] = useState('');
	const [selectedClipCount, setSelectedClipCount] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const presetClipCounts = [3, 5, 10];

	const handlePresetSelect = (count: number) => {
		setSelectedClipCount(count);
		setCustomClipCount('');
	};

	const handleCustomCountChange = (value: string) => {
		setCustomClipCount(value);
		setSelectedClipCount(null);
	};

	const getSelectedCount = () => {
		if (selectedClipCount !== null) return selectedClipCount;
		if (customClipCount) return parseInt(customClipCount);
		return null;
	};

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const canMakeClips = () => {
		return videoUrl.trim() && isValidUrl(videoUrl) && getSelectedCount() && getSelectedCount()! > 0;
	};

	const handleMakeClips = async () => {
		if (!canMakeClips()) return;

		setIsLoading(true);
		
		// Simulate processing time
		setTimeout(() => {
			setIsLoading(false);
			// Here you'll add the webhook call to your workflow
			alert(`Processing ${getSelectedCount()} clips from: ${videoUrl}`);
		}, 2000);
	};

	return (
		<div className="space-y-8">
			{/* Hero Section */}
			<div className="text-center">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
					<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h2 className="text-3xl font-bold text-gray-900 mb-2">AI Video Clip Maker</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Transform your long-form videos into engaging short clips automatically. 
					Just paste your video URL and choose how many clips you want to create.
				</p>
			</div>

			{/* Main Form */}
			<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
				<div className="space-y-6">
					{/* Video URL Input */}
					<div>
						<label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-900 mb-3">
							Video URL
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
								</svg>
							</div>
							<input
								id="videoUrl"
								type="url"
								value={videoUrl}
								onChange={(e) => setVideoUrl(e.target.value)}
								placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
								className="block w-full pl-12 pr-4 py-4 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
							/>
						</div>
						{videoUrl && !isValidUrl(videoUrl) && (
							<p className="mt-2 text-sm text-red-600 flex items-center">
								<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Please enter a valid URL
							</p>
						)}
					</div>

					{/* Clip Count Selection */}
					<div>
						<label className="block text-sm font-semibold text-gray-900 mb-3">
							Number of Clips
						</label>
						
						{/* Preset Buttons */}
						<div className="grid grid-cols-3 gap-3 mb-4">
							{presetClipCounts.map((count) => (
								<button
									key={count}
									onClick={() => handlePresetSelect(count)}
									className={`py-4 px-6 rounded-xl border-2 transition-all duration-200 font-semibold text-lg ${
										selectedClipCount === count
											? 'border-blue-500 bg-blue-50 text-blue-700'
											: 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
									}`}
								>
									{count} Clips
								</button>
							))}
						</div>

						{/* Custom Input */}
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
								</svg>
							</div>
							<input
								type="number"
								min="1"
								max="50"
								value={customClipCount}
								onChange={(e) => handleCustomCountChange(e.target.value)}
								placeholder="Or enter custom number (1-50)"
								className={`block w-full pl-12 pr-4 py-4 text-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg ${
									customClipCount ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-white'
								}`}
							/>
						</div>
					</div>

					{/* Selected Count Display */}
					{getSelectedCount() && (
						<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
							<div className="flex items-center">
								<svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-blue-800 font-medium">
									Ready to create {getSelectedCount()} clips from your video
								</span>
							</div>
						</div>
					)}

					{/* Make Clips Button */}
					<button
						onClick={handleMakeClips}
						disabled={!canMakeClips() || isLoading}
						className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
							canMakeClips() && !isLoading
								? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
					>
						{isLoading ? (
							<>
								<svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span>Creating Clips...</span>
							</>
						) : (
							<>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>Make Clips Now</span>
							</>
						)}
					</button>
				</div>
			</div>

			{/* Features Section */}
			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
					<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
						<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
					<p className="text-gray-600">AI-powered processing creates your clips in minutes, not hours.</p>
				</div>

				<div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
					<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
						<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Selection</h3>
					<p className="text-gray-600">Advanced AI identifies the most engaging moments automatically.</p>
				</div>

				<div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
					<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
						<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Share</h3>
					<p className="text-gray-600">Clips are optimized for social media platforms and ready to post.</p>
				</div>
			</div>
		</div>
	);
}