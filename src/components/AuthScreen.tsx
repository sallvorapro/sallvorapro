import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, Sparkles, ArrowLeft, Users, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('admin@lifvox.com');
  const [password, setPassword] = useState('••••••••••••');
  const [invitationCode, setInvitationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const username = email.includes('@') ? email.split('@')[0] : 'User';
      onLoginSuccess({
        email,
        username,
        avatarText: username.slice(0, 2).toUpperCase(),
      });
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F9FAFB] select-none">
      {/* Left Vibrant Green Panel */}
      <div className="w-full md:w-1/2 bg-[#00A651] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 my-auto py-12 text-center max-w-md mx-auto">
          {/* Glowing Brand Icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#00C46A] border-2 border-emerald-300/40 flex items-center justify-center shadow-lg shadow-emerald-900/30 mb-8 transform transition hover:scale-105">
            <Sparkles className="w-10 h-10 text-white fill-white/20" />
          </div>

          {!isSignUp ? (
            <>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                SellvoraPro
              </h1>
              <p className="text-base md:text-lg text-emerald-50 leading-relaxed font-medium">
                Partner with top e-commerce brands. Grab orders, handle sales, and earn commissions.
              </p>

              {/* 3 Metric counters */}
              <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-emerald-400/30">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold">50K+</div>
                  <div className="text-xs text-emerald-100 font-medium mt-1">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold">$2.5M</div>
                  <div className="text-xs text-emerald-100 font-medium mt-1">Daily Volume</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold">99.9%</div>
                  <div className="text-xs text-emerald-100 font-medium mt-1">Uptime</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Join SellvoraPro
              </h1>
              <p className="text-base md:text-lg text-emerald-50 leading-relaxed font-medium mb-10">
                Create your account and start earning commissions from top e-commerce brands
              </p>

              {/* 3 Feature checkmarks */}
              <div className="space-y-4 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                  <span className="text-sm font-semibold text-white">Free to join, no hidden fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                  <span className="text-sm font-semibold text-white">Instant account activation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                  <span className="text-sm font-semibold text-white">24/7 customer support</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#F9FAFB]">
        <div className="w-full max-w-md">
          {/* Back button on sign up */}
          {isSignUp && (
            <button
              id="btn-auth-back"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg('');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {/* Subheader and Header */}
          <div className="mb-8">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#00A651]">
              {!isSignUp ? 'WELCOME BACK' : 'GET STARTED'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1 tracking-tight">
              {!isSignUp ? (
                <>
                  Sign in to <br />
                  <span className="text-[#00A651]">your account</span>
                </>
              ) : (
                <>
                  Create your <br />
                  <span className="text-[#00A651]">account</span>
                </>
              )}
            </h2>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  id="auth-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-emerald-500 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  id="auth-input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-emerald-500 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  id="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Invitation Code (Sign Up Only) */}
            {isSignUp && (
              <div>
                <div className="relative flex items-center">
                  <Users className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    id="auth-input-invitation-code"
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    placeholder="Invitation code (optional)"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-emerald-500 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Remember Me and Forgot Password (Sign In) */}
            {!isSignUp ? (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  id="btn-remember-me-toggle"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      rememberMe ? 'bg-[#00A651] text-white' : 'border border-gray-300'
                    }`}
                  >
                    {rememberMe && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>Remember me</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email.')}
                  className="text-xs font-medium text-[#00A651] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 pt-1 leading-relaxed">
                By registering, you agree to our{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#00A651] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#00A651] hover:underline">
                  Privacy Policy
                </a>
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-auth-submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-[#00A651] hover:bg-[#009247] active:bg-[#007f3e] text-white font-bold rounded-2xl shadow-md shadow-emerald-700/20 text-sm transition-all duration-150 transform hover:-translate-y-0.5 disabled:opacity-75 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : !isSignUp ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-8 text-center text-xs text-gray-600 font-medium">
            {!isSignUp ? (
              <>
                Don't have an account?{' '}
                <button
                  id="btn-switch-to-signup"
                  onClick={() => {
                    setIsSignUp(true);
                    setErrorMsg('');
                  }}
                  className="text-[#00A651] font-bold hover:underline ml-1"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  id="btn-switch-to-signin"
                  onClick={() => {
                    setIsSignUp(false);
                    setErrorMsg('');
                  }}
                  className="text-[#00A651] font-bold hover:underline ml-1"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
