import { Routes, Route } from 'react-router-dom';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Home from './pages/Home';
import OtpVerify from './pages/OtpVerify';
import FingerprintVerify from './pages/FingerprintVerify';
import VerifiedUsers from './pages/VerifiedUsers';
import ChatPage from './pages/ChatPage'; // Only one chat page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/SignUp" element={<Signup />} />
      <Route path="/SignIn" element={<Signin />} />
      <Route path="/verify-otp" element={<OtpVerify />} />
      <Route path="/fingerprint" element={<FingerprintVerify />} />
      <Route path="/home" element={<Home />} />
      <Route path="/verified-users" element={<VerifiedUsers />} />
      <Route path="/chat" element={<ChatPage />} /> {/* Keep only one */}
    </Routes>
  );
};

export default App;
