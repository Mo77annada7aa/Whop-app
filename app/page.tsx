export default function Page() {
	return (
		<div className="min-h-screen bg-gray-a12 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-8 font-bold text-gray-9 mb-4">
						Welcome to Your Whop App
					</h1>
					<p className="text-4 text-gray-6">
						Follow these steps to get started with your Whop application
					</p>
				</div>

				<div className="space-y-8">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-5 font-semibold text-gray-9 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-9 text-white mr-3">
								1
							</span>
							Create your Whop app
						</h2>
						<p className="text-gray-6 ml-11">
							Go to your{" "}
							<a
								href="https://whop.com/dashboard"
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent-9 hover:text-accent-10 underline"
							>
								Whop Dashboard
							</a>{" "}
							and create a new app in the Developer section.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-5 font-semibold text-gray-9 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-9 text-white mr-3">
								2
							</span>
							Set up environment variables
						</h2>
						<p className="text-gray-6 ml-11 mb-4">
							Copy the .env file from your dashboard and create a new .env file
							in your project root. This will contain all the necessary
							environment variables for your app.
						</p>
						{process.env.NODE_ENV === "development" && (
							<div className="text-gray-6 ml-11">
								<pre>
									<code>
										WHOP_API_KEY={process.env.WHOP_API_KEY?.slice(0, 5)}...
										<br />
										NEXT_PUBLIC_WHOP_AGENT_USER_ID=
										{process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID}
										<br />
										NEXT_PUBLIC_WHOP_APP_ID=
										{process.env.NEXT_PUBLIC_WHOP_APP_ID}
										<br />
										NEXT_PUBLIC_WHOP_COMPANY_ID=
										{process.env.NEXT_PUBLIC_WHOP_COMPANY_ID}
									</code>
								</pre>
							</div>
						)}
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-5 font-semibold text-gray-9 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-9 text-white mr-3">
								3
							</span>
							Install your app into your whop
						</h2>
						<p className="text-gray-6 ml-11">
							{process.env.NEXT_PUBLIC_WHOP_APP_ID ? (
								<a
									href={`https://whop.com/apps/${process.env.NEXT_PUBLIC_WHOP_APP_ID}/install`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent-9 hover:text-accent-10 underline"
								>
									Click here to install your app
								</a>
							) : (
								<span className="text-amber-600">
									Please set your environment variables to see the installation
									link
								</span>
							)}
						</p>
					</div>
				</div>

				<div className="mt-12 space-y-6">
					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
						<h3 className="text-lg font-semibold text-blue-900 mb-3">
							🎬 Video Clip Maker Demo
						</h3>
						<p className="text-blue-800 mb-4">
							Try out the professional video clip maker interface! This demo shows the complete UI without requiring Whop authentication.
						</p>
						<a
							href="/clip-maker"
							className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors mr-3"
						>
							🎥 Try Clip Maker →
						</a>
						<a
							href="/example"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
						>
							View Example Page →
						</a>
					</div>
					
					<div className="text-center text-2 text-gray-5">
						<p>
							Need help? Visit the{" "}
							<a
								href="https://dev.whop.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent-9 hover:text-accent-10 underline"
							>
								Whop Documentation
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
