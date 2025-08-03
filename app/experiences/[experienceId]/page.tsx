import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import VideoClipMaker from "./VideoClipMaker";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// The headers contains the user token
	const headersList = await headers();

	// The experienceId is a path param
	const { experienceId } = await params;

	try {
		// The user token is in the headers
		const { userId } = await whopSdk.verifyUserToken(headersList);

		const result = await whopSdk.access.checkIfUserHasAccessToExperience({
			userId,
			experienceId,
		});

		if (!result.hasAccess) {
			return (
				<div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
					<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
						<p className="text-gray-600 mb-6">
							You don't have access to this video clip maker. Please purchase a plan to continue.
						</p>
						<a
							href={`https://whop.com/checkout?experienceId=${experienceId}`}
							className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
						>
							Get Access
						</a>
					</div>
				</div>
			);
		}

		const user = await whopSdk.users.getUser({ userId });
		const experience = await whopSdk.experiences.getExperience({ experienceId });

		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
				{/* Header */}
				<div className="bg-white border-b border-gray-200 shadow-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center py-4">
							<div className="flex items-center space-x-4">
								<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<h1 className="text-xl font-bold text-gray-900">{experience.name}</h1>
									<p className="text-sm text-gray-500">Video Clip Maker</p>
								</div>
							</div>
							
							{/* User Info */}
							<div className="flex items-center space-x-3">
								<div className="text-right">
									<p className="text-sm font-medium text-gray-900">Welcome, {user.name}</p>
									<p className="text-xs text-gray-500">@{user.username}</p>
								</div>
								<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
									<span className="text-white text-sm font-medium">
										{user.name?.charAt(0).toUpperCase() || 'U'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<VideoClipMaker />
				</div>
			</div>
		);
	} catch (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
					<p className="text-gray-600 mb-6">
						Please access this app through a Whop experience to continue.
					</p>
					<a
						href="/"
						className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
					>
						← Back to Home
					</a>
				</div>
			</div>
		);
	}
}
