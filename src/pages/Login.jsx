import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [mode, setMode] = useState("login"); // login | register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetMode = (m) => {
    setMode(m);
    setError("");
    setShowPassword(false);
    setForm({ name: "", email: "", password: "" });
  };

  const getErrorMessage = (err) => {
    switch (err.code) {
      case "auth/operation-not-allowed":
        return "Email/Password login is not enabled in Firebase Console";
      case "auth/email-already-in-use":
        return "This email is already registered";
      case "auth/weak-password":
        return "Password must be at least 6 characters";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled";
      default:
        return err?.message || "Something went wrong";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        const res = await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );

        if (form.name.trim()) {
          await updateProfile(res.user, { displayName: form.name.trim() });
        }
      } else {
        await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAD9C6] flex items-center justify-center p-4">
      {/* Outer frame */}
      <div className="w-full max-w-5xl rounded-[28px] bg-[#FCE8DA] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] overflow-hidden border border-white/60">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: Login Card */}
          <div className="p-6 sm:p-10 flex items-center justify-center">
            <div className="w-full max-w-sm">
              {/* Brand */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-[#E56A5A] tracking-wide">
                  Baby Shop
                </p>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {mode === "login" ? "Login" : "Create Account"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {mode === "login"
                    ? "Welcome back! Please login to your account."
                    : "Create your account to start shopping."}
                </p>
              </div>

              {/* Tabs */}
              <div className="mb-5 inline-flex rounded-xl bg-white/70 p-1 border border-white shadow-sm">
                <button
                  type="button"
                  onClick={() => resetMode("login")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => resetMode("register")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                    mode === "register"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name (register only) */}
                {mode === "register" && (
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full h-11 rounded-lg bg-white/80 border border-white/60 px-4 outline-none
                               focus:ring-4 focus:ring-[#FF6B57]/20 focus:border-[#FF6B57] transition"
                    required
                  />
                )}

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-11 rounded-lg bg-white/80 border border-white/60 px-4 outline-none
                             focus:ring-4 focus:ring-[#FF6B57]/20 focus:border-[#FF6B57] transition"
                  required
                />

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full h-11 rounded-lg bg-white/80 border border-white/60 px-4 pr-12 outline-none
                               focus:ring-4 focus:ring-[#FF6B57]/20 focus:border-[#FF6B57] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 shake">
                    <p className="text-sm text-rose-700">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-[#FF6B57] hover:bg-[#F85E4A] text-white font-bold
                             shadow-[0_10px_25px_-12px_rgba(255,107,87,0.8)]
                             transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating..."
                    : mode === "login"
                    ? "Login"
                    : "Create Account"}
                </button>

                {/* Social */}
                <div className="pt-3">
                  <p className="text-center text-xs text-slate-500 mb-3">
                    Or login with
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <IconBtn
                      disabled={loading}
                      onClick={handleGoogleLogin}
                      title="Google"
                    >
                      <GoogleG />
                    </IconBtn>

                    {/* Placeholder buttons (optional) */}
                    <IconBtn disabled={true} onClick={() => {}} title="Facebook">
                      <FacebookF />
                    </IconBtn>

                    <IconBtn disabled={true} onClick={() => {}} title="Apple">
                      <AppleLogo />
                    </IconBtn>
                  </div>
                </div>

                {/* Footer link */}
                <p className="text-center text-xs text-slate-500 pt-4">
                  {mode === "login" ? "Don’t have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => resetMode(mode === "login" ? "register" : "login")}
                    className="font-semibold text-slate-700 hover:underline"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>

                <p className="text-center text-[11px] text-slate-500 pt-1">
                  By continuing, you agree to our{" "}
                  <span className="font-semibold text-slate-700">Terms</span> &{" "}
                  <span className="font-semibold text-slate-700">Privacy Policy</span>.
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT: Illustration */}
          <div className="relative hidden md:flex items-center justify-center overflow-hidden">
            {/* Background layer */}
            <div className="absolute inset-0 bg-[#FAD9C6]" />

            {/* Soft glow */}
            <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
            <div className="absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-[#FF6B57]/20 blur-3xl" />

            {/* Confetti */}
            <Confetti />

            {/* Character */}
            <div className="relative z-10 w-[90%] max-w-md">
              <PumpkinCharacterSVG />
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.35s ease-in-out; }

        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .pumpkin-float { animation: floaty 3.8s ease-in-out infinite; }

        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: .95; }
          50% { transform: translateY(12px) translateX(8px); opacity: .55; }
          100% { transform: translateY(0) translateX(0); opacity: .95; }
        }
        .drift { animation: drift 4.5s ease-in-out infinite; }
        .drift2 { animation: drift 6.2s ease-in-out infinite; }
        .drift3 { animation: drift 5.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

/* Confetti like the reference image */
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <span className="drift absolute top-14 left-16 h-2 w-2 rounded-full bg-[#FF6B57]/75" />
      <span className="drift2 absolute top-20 right-20 h-2 w-2 rounded-full bg-[#7CB7FF]/75" />
      <span className="drift3 absolute top-36 right-10 h-3 w-3 rounded-full bg-white/70" />
      <span className="drift absolute bottom-24 left-24 h-2 w-2 rounded-full bg-[#FFC857]/80" />
      <span className="drift2 absolute bottom-16 right-16 h-2 w-2 rounded-full bg-[#7CD992]/75" />
      <span className="drift3 absolute top-44 left-10 h-2 w-2 rounded-full bg-[#7CD992]/55" />
      <span className="drift absolute bottom-40 right-28 h-2 w-2 rounded-full bg-[#FF6B57]/55" />
      <span className="drift2 absolute top-28 left-40 h-2 w-2 rounded-full bg-[#FFC857]/55" />
    </div>
  );
}

function IconBtn({ children, onClick, disabled, title }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="h-9 w-9 rounded-full bg-white/85 border border-white shadow-sm flex items-center justify-center
                 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

/** Inline SVG illustration (NO necklace dots anymore) */
function PumpkinCharacterSVG() {
  return (
    <svg viewBox="0 0 700 420" className="w-full h-auto pumpkin-float">
      <ellipse cx="360" cy="360" rx="220" ry="40" fill="rgba(0,0,0,0.08)" />

      {/* cape */}
      <path
        d="M510 250c60 30 90 70 82 115-22 20-55 27-92 10-20-10-32-28-38-50 22-35 32-55 48-75z"
        fill="#E85B4A"
        opacity="0.95"
      />

      {/* pumpkin body */}
      <path
        d="M210 160c40-55 90-85 155-85s115 30 155 85c24 35 36 72 36 110 0 95-74 150-191 150S174 365 174 270c0-38 12-75 36-110z"
        fill="#FF6B57"
      />

      {/* highlights */}
      <path
        d="M290 110c-55 40-70 100-62 175 8 70 44 115 102 130-78-10-130-62-130-145 0-68 28-124 90-160z"
        fill="rgba(255,255,255,0.20)"
      />
      <path
        d="M430 110c55 40 70 100 62 175-8 70-44 115-102 130 78-10 130-62 130-145 0-68-28-124-90-160z"
        fill="rgba(0,0,0,0.06)"
      />

      {/* stem */}
      <path
        d="M350 65c-10-30 10-55 40-55 18 0 32 8 38 20-30 2-45 18-55 40 25 0 43 12 50 30-28-10-55-5-73 18z"
        fill="#6B4A2B"
      />

      {/* face */}
      <circle cx="320" cy="215" r="10" fill="#1B1B1B" />
      <circle cx="410" cy="215" r="10" fill="#1B1B1B" />
      <circle cx="310" cy="208" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="400" cy="208" r="4" fill="#FFFFFF" opacity="0.9" />

      <path
        d="M340 255c20 18 45 18 65 0"
        stroke="#1B1B1B"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      <circle cx="285" cy="240" r="10" fill="rgba(255,255,255,0.25)" />
      <circle cx="445" cy="240" r="10" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

/* Icons */
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
function FacebookF() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06C2 17.082 5.657 21.245 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.776-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22C18.343 21.245 22 17.082 22 12.06z"
      />
    </svg>
  );
}
function AppleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#111827"
        d="M16.365 1.43c0 1.14-.42 2.22-1.23 3.15-.87 1.01-2.29 1.79-3.53 1.69-.15-1.18.41-2.34 1.18-3.23.85-.98 2.34-1.72 3.58-1.61zM20.6 17.2c-.45 1.03-.67 1.5-1.25 2.41-.81 1.28-1.95 2.87-3.36 2.88-1.26.01-1.58-.83-3.28-.82-1.7.01-2.05.84-3.31.83-1.41-.01-2.48-1.43-3.29-2.71-2.26-3.58-2.5-7.78-1.1-9.96.99-1.55 2.56-2.46 4.01-2.46 1.3 0 2.38.86 3.28.86.87 0 2.24-1.06 3.78-.9.65.03 2.48.26 3.66 2-.1.07-2.19 1.28-2.16 3.83.03 3.05 2.67 4.07 2.7 4.08-.01.03-.43 1.5-1.38 2.96z"
      />
    </svg>
  );
}

export default Login;
