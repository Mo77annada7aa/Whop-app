import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";

export default async function ExamplePage() {
	// Example of how to add authentication to any page
	const headersList = await headers();
	
	try {
		// Verify user token - this will throw if user is not authenticated
		const { userId } = await whopSdk.verifyUserToken(headersList);
		
		// Get user information
		const user = await whopSdk.users.getUser({ userId });
		
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-xl shadow-lg p-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-6">
							🎉 Welcome to Your Custom Page!
						</h1>
						
						<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
							<h2 className="text-xl font-semibold text-green-800 mb-2">
								Authentication Success!
							</h2>
							<p className="text-green-700">
								Hello <strong>{user.name}</strong> (@{user.username})! 
								You are successfully authenticated.
							</p>
							<p className="text-sm text-green-600 mt-2">
								User ID: {userId}
							</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-blue-50 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-blue-900 mb-3">
									🔐 Authentication Features
								</h3>
								<ul className="text-blue-800 space-y-2">
									<li>✅ User token verification</li>
									<li>✅ User information retrieval</li>
									<li>✅ Access level checking</li>
									<li>✅ Experience-based permissions</li>
								</ul>
							</div>
							
							<div className="bg-purple-50 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-purple-900 mb-3">
									🚀 Next Steps
								</h3>
								<ul className="text-purple-800 space-y-2">
									<li>• Add your custom logic here</li>
									<li>• Create API routes in /api</li>
									<li>• Style with Tailwind CSS</li>
									<li>• Deploy to Vercel</li>
								</ul>
							</div>
						</div>
						
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								💡 Pro Tip
							</h3>
							<p className="text-gray-700">
								This page demonstrates how easy it is to add authentication to any route. 
								Simply import the Whop SDK and verify the user token. You can copy this 
								pattern to any page in your app!
							</p>
						</div>
						
						<div className="mt-6 text-center">
							<a 
								href="/"
								className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
							>
								← Back to Home
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		// User is not authenticated or token is invalid
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4">
				<div className="max-w-2xl mx-auto">
					<div className="bg-white rounded-xl shadow-lg p-8 text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-6">
							🔒 Authentication Required
						</h1>
						
						<div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
							<h2 className="text-xl font-semibold text-red-800 mb-2">
								Access Denied
							</h2>
							<p className="text-red-700">
								You need to be authenticated to view this page. 
								Please make sure you're accessing this page through a Whop experience.
							</p>
						</div>
						
						<div className="text-left bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								How to test authentication:
							</h3>
							<ol className="text-gray-700 space-y-2 list-decimal list-inside">
								<li>Set up your environment variables in .env.local</li>
								<li>Install your app in a Whop community</li>
								<li>Access this page through the Whop experience URL</li>
								<li>Use the Whop proxy for local development</li>
							</ol>
						</div>
						
						<div className="mt-6">
							<a 
								href="/"
								className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
							>
								← Back to Home
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}