'use client';

import { useState } from 'react';

export default function HomePage() {
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
			return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || url.includes('twitch.tv');
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
		
		// Simulate processing time with better feedback
		setTimeout(() => {
			setIsLoading(false);
			// Here you'll add the webhook call to your workflow
			console.log(`Processing ${getSelectedCount()} clips from: ${videoUrl}`);
			// Show success message instead of alert
			alert(`✨ Successfully started processing ${getSelectedCount()} clips from your video!`);
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							{/* Scissors Logo */}
							<div className="w-12 h-12 bg-gradient-to-r from-accent-9 to-accent-10 rounded-lg flex items-center justify-center">
								<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
								</svg>
							</div>
							{/* User Authentication - Small next to logo */}
							<div className="text-sm text-gray-600">
								Welcome, User
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Left Column - Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg p-6 shadow-md">
							<div className="mb-8">
								<h2 className="text-5 font-semibold text-gray-9 mb-4 flex items-center">
									<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-9 text-white mr-3">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</span>
									Create Your Clips
								</h2>
							</div>

							<div className="space-y-8">
								{/* Video URL Input */}
								<div>
									<label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-9 mb-4 flex items-center">
										<svg className="w-5 h-5 mr-2 text-accent-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
										Video URL
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
											</svg>
										</div>
										<input
											id="videoUrl"
											type="url"
											value={videoUrl}
											onChange={(e) => setVideoUrl(e.target.value)}
											placeholder="🎬 Paste your YouTube, Vimeo, or Twitch URL here..."
											className="block w-full pl-14 pr-4 py-5 text-gray-9 border-2 border-gray-300 bg-gray-50 rounded-xl focus:ring-2 focus:ring-accent-9 focus:border-accent-9 transition-all duration-200 text-lg placeholder-gray-500 shadow-sm"
										/>
										{videoUrl && isValidUrl(videoUrl) && (
											<div className="absolute inset-y-0 right-0 pr-4 flex items-center">
												<svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
										)}
									</div>
									{videoUrl && !isValidUrl(videoUrl) && (
										<p className="mt-3 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-lg">
											<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											Please enter a valid video URL from YouTube, Vimeo, or Twitch
										</p>
									)}
									{videoUrl && isValidUrl(videoUrl) && (
										<p className="mt-3 text-sm text-green-600 flex items-center bg-green-50 p-3 rounded-lg">
											<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											✨ Great! Video URL is valid and ready for processing
										</p>
									)}
								</div>

								{/* Clip Count Selection */}
								<div>
									<label className="block text-sm font-semibold text-gray-9 mb-4 flex items-center">
										<svg className="w-5 h-5 mr-2 text-accent-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
										</svg>
										Number of Clips
									</label>
									
									{/* Preset Buttons */}
									<div className="grid grid-cols-3 gap-4 mb-6">
										{presetClipCounts.map((count) => (
											<button
												key={count}
												onClick={() => handlePresetSelect(count)}
												className={`py-5 px-6 rounded-lg border-2 transition-all duration-200 font-bold text-lg relative overflow-hidden ${
												selectedClipCount === count
													? 'border-accent-9 bg-accent-9 text-white shadow-lg transform scale-105'
													: 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md hover:transform hover:scale-102'
											}`}
											>
												<div className="flex items-center justify-center space-x-2">
													<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
													</svg>
													<span>{count} Clips</span>
												</div>
												{selectedClipCount === count && (
													<div className="absolute top-2 right-2">
														<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
														</svg>
													</div>
												)}
											</button>
										))}
									</div>

									{/* Custom Input */}
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
											</svg>
										</div>
										<input
											type="number"
											min="1"
											max="50"
											value={customClipCount}
											onChange={(e) => handleCustomCountChange(e.target.value)}
											placeholder="🎯 Or enter custom number (1-50)"
											className={`block w-full pl-14 pr-4 py-5 text-gray-9 border-2 rounded-xl focus:ring-2 focus:ring-accent-9 focus:border-accent-9 transition-all duration-200 text-lg placeholder-gray-500 shadow-sm ${
												customClipCount ? 'border-accent-9 bg-gray-50' : 'border-gray-300 bg-gray-50'
											}`}
										/>
										{customClipCount && (
											<div className="absolute inset-y-0 right-0 pr-4 flex items-center">
												<svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
										)}
									</div>
								</div>

								{/* Selected Count Display */}
								{getSelectedCount() && (
									<div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-2 border-green-700/50 rounded-xl p-5 shadow-sm">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
													<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
													</svg>
												</div>
												<div>
													<p className="text-green-300 font-bold text-lg">
														Ready to Process!
													</p>
													<p className="text-green-400 text-sm">
														Creating {getSelectedCount()} clips from your video
													</p>
												</div>
											</div>
											<div className="text-right">
												<div className="text-2xl font-bold text-green-400">
													{getSelectedCount()}
												</div>
												<div className="text-xs text-green-500">
													clips
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Generate Button */}
								<div className="pt-6">
									<button
										onClick={handleMakeClips}
										disabled={!canMakeClips() || isLoading}
										className="w-full bg-accent-9 hover:bg-accent-10 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-lg transition-all duration-200 text-xl shadow-md disabled:opacity-50 flex items-center justify-center space-x-3"
									>
										{isLoading ? (
											<>
												<svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												<span>Processing...</span>
											</>
										) : (
											<>
												<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												<span>✨ Make {getSelectedCount() || 0} Clip{(getSelectedCount() || 0) !== 1 ? 's' : ''}</span>
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - How it Works */}
					<div className="space-y-6">
						{/* How it Works */}
						<div className="bg-white rounded-lg p-6 shadow-md">
							<h3 className="text-lg font-semibold text-gray-9 mb-4 flex items-center">
								<svg className="w-6 h-6 mr-2 text-accent-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								How It Works
							</h3>
							<div className="space-y-4">
								<div className="flex items-start">
									<div className="flex-shrink-0 w-8 h-8 bg-accent-9 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
										1
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">Paste URL</h4>
										<p className="text-gray-6 text-sm">Add your video link from any supported platform</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex-shrink-0 w-8 h-8 bg-accent-9 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
										2
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">Choose Count</h4>
										<p className="text-gray-6 text-sm">Select how many clips you want to create</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex-shrink-0 w-8 h-8 bg-accent-9 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
										3
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">Get Results</h4>
										<p className="text-gray-6 text-sm">Download your professional clips instantly</p>
									</div>
								</div>
							</div>
						</div>

						{/* Features Section */}
						<div className="bg-white rounded-lg p-6 shadow-md">
							<h3 className="text-lg font-semibold text-gray-9 mb-4 flex items-center">
								<svg className="w-6 h-6 mr-2 text-accent-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
								</svg>
								Key Features
							</h3>
							<div className="space-y-4">
								<div className="flex items-start">
									<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
										<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">⚡ Lightning Fast</h4>
										<p className="text-gray-6 text-sm">AI-powered processing creates your clips in minutes, not hours.</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
										<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
										</svg>
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">🧠 Smart Selection</h4>
										<p className="text-gray-6 text-sm">Advanced AI identifies the most engaging moments automatically.</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
										<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</div>
									<div>
										<h4 className="font-semibold text-gray-9">🚀 Ready to Share</h4>
										<p className="text-gray-6 text-sm">Clips are optimized for social media platforms.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
