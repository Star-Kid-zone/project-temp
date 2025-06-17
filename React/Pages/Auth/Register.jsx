import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    user_id: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!agreed) return alert("Please agree to the Terms and Privacy Policy.");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match.");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8082/api/register", {
        user_id: formData.user_id || formData.email,
        password: formData.password,
        role: "admin",
      });

      alert("Registration successful!");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Registration failed!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Illustration */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img src="/placeholder.svg" alt="Register illustration" width={400} height={400} />
          </Box>
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} md={6}>
          <Box maxWidth={400} mx="auto">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#1f2937" }}>
              Create an Account
            </Typography>
            <Typography sx={{ color: "#6b7280", mb: 3 }}>
              Join FreshCart to start shopping for fresh groceries!
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  sx={{
                    color: "#22c55e",
                    "&.Mui-checked": { color: "#22c55e" },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <MuiLink component={Link} to="#" sx={{ color: "#22c55e", "&:hover": { color: "#16a34a" } }}>
                    Terms of Service
                  </MuiLink>{" "}
                  and{" "}
                  <MuiLink component={Link} to="#" sx={{ color: "#22c55e", "&:hover": { color: "#16a34a" } }}>
                    Privacy Policy
                  </MuiLink>
                </Typography>
              }
              sx={{ mt: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#22c55e",
                "&:hover": { backgroundColor: "#16a34a" },
                color: "#fff",
              }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" sx={{ color: "#22c55e", "&:hover": { color: "#16a34a" } }}>
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
