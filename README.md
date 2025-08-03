# 🚀 Whop Next.js App Template

A beginner-friendly template for building Whop apps with Next.js, TypeScript, and Tailwind CSS. This template includes authentication, user access control, and a clean, modern UI.

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager
- A Whop account and developer access

## 🛠️ Quick Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

1. Go to your [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
2. Create a new app or select an existing one
3. Copy your app credentials
4. Open the `.env.local` file in your project root
5. Replace the placeholder values with your actual Whop credentials:

```env
WHOP_API_KEY="your_actual_api_key_here"
WHOP_WEBHOOK_SECRET="your_webhook_secret_here"
NEXT_PUBLIC_WHOP_APP_ID="your_app_id_here"
NEXT_PUBLIC_WHOP_COMPANY_ID="your_company_id_here"
NEXT_PUBLIC_WHOP_AGENT_USER_ID="your_agent_user_id_here"
```

### 3. Configure Your App Settings

In your Whop Developer Dashboard, set:
- **Base URL**: Your domain (e.g., `https://yourapp.vercel.app` or `http://localhost:3000` for development)
- **App Path**: `/experiences/[experienceId]`
- **Discover Path**: `/discover`

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test Your App

1. In the top right of your browser window, find the translucent settings icon
2. Select "localhost" 
3. The default port 3000 should work
4. Follow the on-screen instructions to complete setup

## 📁 Project Structure

```
├── app/
│   ├── api/webhooks/          # Webhook handlers
│   ├── discover/              # App discovery page
│   ├── experiences/[id]/      # Main app experience
│   ├── layout.tsx             # Root layout with WhopApp wrapper
│   └── page.tsx               # Landing/setup page
├── lib/
│   └── whop-sdk.ts           # Whop SDK configuration
├── .env.local                # Your environment variables
└── .env.development          # Template for environment variables
```

## 🔐 Authentication & Access Control

This template includes built-in authentication using the Whop SDK:

### User Authentication
- Automatic user token verification
- User information retrieval
- Access level checking (admin, customer, no_access)

### Example Usage

```typescript
// In your page component
import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";

export default async function MyPage() {
  const headersList = await headers();
  const { userId } = await whopSdk.verifyUserToken(headersList);
  
  // Check user access to specific experience
  const result = await whopSdk.access.checkIfUserHasAccessToExperience({
    userId,
    experienceId: "your-experience-id",
  });
  
  if (!result.hasAccess) {
    return <div>Access denied</div>;
  }
  
  // Your protected content here
  return <div>Welcome to your app!</div>;
}
```

## 🎨 Styling

This template uses:
- **Tailwind CSS 4** for styling
- **Geist fonts** for typography
- **Responsive design** out of the box
- **Modern UI components** ready to customize

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add your environment variables from `.env.local`
5. Deploy!

### Update Whop Settings

After deployment, update your Whop app settings:
- **Base URL**: Your production domain
- **Webhook URLs**: Update to your production endpoints

## 🔧 Customization

### Adding New Pages

1. Create a new file in the `app/` directory
2. Use the Whop SDK for authentication:

```typescript
import { whopSdk } from "@/lib/whop-sdk";

export default async function NewPage() {
  // Your page logic here
}
```

### Adding API Routes

1. Create files in `app/api/`
2. Use the Whop SDK for server-side operations:

```typescript
import { whopSdk } from "@/lib/whop-sdk";

export async function POST(request: Request) {
  // Your API logic here
}
```

### Styling Components

Use Tailwind CSS classes for styling:

```tsx
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Your Content</h2>
</div>
```

## 📚 Key Features

- ✅ **User Authentication** - Built-in Whop user verification
- ✅ **Access Control** - Check user permissions and access levels
- ✅ **Responsive Design** - Mobile-friendly out of the box
- ✅ **TypeScript** - Full type safety
- ✅ **Modern Stack** - Next.js 15, React 19, Tailwind CSS 4
- ✅ **Webhook Support** - Handle Whop webhooks
- ✅ **Developer Experience** - Hot reload, TypeScript, ESLint

## 🆘 Troubleshooting

### App not loading properly?
- Ensure the "App path" is set to `/experiences/[experienceId]` in your Whop dashboard
- Check that all environment variables are correctly set in `.env.local`

### Environment variables not working?
- Make sure `.env.local` exists and has the correct values
- Restart your development server after changing environment variables
- Verify your API keys are correct in the Whop dashboard

### Authentication issues?
- Check that your `WHOP_API_KEY` is valid
- Ensure your app is properly installed in your Whop
- Verify the user has access to the experience

## 📖 Resources

- [Whop Developer Documentation](https://dev.whop.com/introduction)
- [Whop SDK Reference](https://dev.whop.com/sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

Need help? 
- Check the [Whop Developer Docs](https://dev.whop.com)
- Join the Whop Developer Community
- Review the example code in this template

---

**Happy building! 🎉**
