// src/pages/OtpVerificationPage.jsx
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const OtpVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user_id } = location.state || {};         // pulled from LoginPage
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // If someone lands here without a user_id, kick them back to login
  useEffect(() => {
    if (!user_id) navigate("/login");
  }, [user_id, navigate]);

  const handleChange = (i, val) => {
    if (/^\d?$/.test(val)) {
      const next = [...otp];
      next[i] = val;
      setOtp(next);
      if (val && i < 5) inputRefs[i + 1].current.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs[i - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, 6).split("");
    const next = [...otp];
    paste.forEach((d, idx) => { if (idx < 6 && /^\d$/.test(d)) next[idx] = d; });
    setOtp(next);
    const lastIdx = Math.min(paste.length - 1, 5);
    inputRefs[lastIdx]?.current?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return alert("Enter the 6‑digit code.");

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8082/api/otp", {
      user_id: String(user_id), // Convert user_id to string
        otp: code,
      });
      console.log(data.data)

            const { token, user ,active } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.role);
            // Role-based navigation
      if (user.role === "admin") {
        navigate("/admin/home");
      } else if (user.role === "superadmin") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard"); // Default route
      }   
      // alert(data.message);
      // navigate("/admin/home");
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      // Re‑hit login to regenerate OTP
      await axios.post("http://localhost:8082/api/login", {
        user_id,
        password: "" // <-- you might need to store the password in state or call a dedicated resend-otp endpoint
      });
      alert("A new OTP has been sent.");
    } catch {
      alert("Could not resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        {/* Illustration */}
        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src="/placeholder.svg"
            alt="OTP verification illustration"
            width={400}
            height={400}
          />
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-500">
                We've sent a 6‑digit code to <strong>{user_id}</strong>. Enter it below.
              </p>
            </div>

            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  type="text" inputMode="numeric" maxLength={1}
                  value={d}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="h-14 w-14 rounded-md border border-gray-300 text-center text-xl font-bold focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="h-12 w-full rounded-md bg-green-600 font-medium text-white disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Verify"}
            </button>

            <div className="text-center text-sm text-gray-500">
              Didn’t receive a code?{" "}
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="font-medium text-green-600 hover:text-green-500 disabled:opacity-50"
              >
                {resendLoading ? "Resending…" : "Resend"}
              </button>
            </div>

            <div className="text-center text-sm">
              <Link
                to="/login"
                className="inline-flex items-center font-medium text-green-600 hover:text-green-500"
              >
                <FaArrowLeft className="mr-2 h-3 w-3" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
