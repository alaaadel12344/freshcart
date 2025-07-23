
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      });
      toast.success("Reset code sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetCodeSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      });
      toast.success("Code verified successfully");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid reset code");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
        resetCode,
      });
      toast.success("Password updated successfully");
      navigate("/login"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4 text-success">Forget Password</h3>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="w-75 mx-auto">
          <label className="form-label">Email address:</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetCodeSubmit} className="w-75 mx-auto">
          <label className="form-label">Enter reset code:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordChange} className="w-75 mx-auto">
          <label className="form-label">Enter new password:</label>
          <input
            type="password"
            className="form-control mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Saving..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}
