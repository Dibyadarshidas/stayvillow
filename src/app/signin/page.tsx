'use client';
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign-in for demonstration
    signIn({ name: "User", email });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-background)] to-[#ffffff]">
      <div className="glass-card w-full max-w-md flex flex-col gap-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] mb-2">Welcome Back</h1>
          <p className="text-[var(--color-text-light)]">Sign in to your Stayvillow account</p>
        </div>
        
        <button className="btn flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 w-full transition-all shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Sign in with Google</span>
        </button>
        
        <div className="flex items-center gap-2 text-[var(--color-text-light)]">
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="text-sm">or</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-light)]">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="your@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg border aqua-border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-white/50 backdrop-blur-sm"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-[var(--color-text-light)]">Password</label>
              <Link href="/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              id="password"
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg border aqua-border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-white/50 backdrop-blur-sm"
              required 
            />
          </div>
          
          <button 
            className="btn btn-primary w-full py-3 text-white font-medium mt-2 hover-lift" 
            type="submit"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center text-sm text-[var(--color-text-light)]">
          Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-primary)] hover:underline font-medium">Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 