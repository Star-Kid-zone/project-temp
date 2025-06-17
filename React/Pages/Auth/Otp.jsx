import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if filled
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");

    if (pastedData.length) {
      const newOtp = [...otp];
      pastedData.forEach((value, index) => {
        if (index < 4) {
          newOtp[index] = value;
        }
      });
      setOtp(newOtp);

      // Focus the next empty input or last input
      const lastFilledIndex = Math.min(pastedData.length - 1, 3);
      inputRefs[lastFilledIndex].current.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src="/placeholder.svg"
            alt="OTP verification illustration"
            width={400}
            height={400}
            className="max-w-full"
          />
        </div>

        {/* Right side - OTP verification form */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verify Your Email</h1>
              <p className="text-gray-500">
                We've sent a code to your email. Please enter it below to verify your account.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-14 w-14 rounded-md border border-gray-300 text-center text-xl font-bold focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                ))}
              </div>

              <button className="h-12 w-full rounded-md bg-green-600 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Verify
              </button>

              <div className="text-center text-sm text-gray-500">
                Didn’t receive a code?{" "}
                <button className="font-medium text-green-600 hover:text-green-500">Resend</button>
              </div>

              <div className="text-center text-sm">
                <Link
                  to="/sign-in"
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
    </div>
  );
};

export default OtpVerificationPage;
