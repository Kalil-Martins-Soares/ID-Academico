import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Renewal from './pages/Renewal';
import Settings from './pages/Settings';
import { AuthState, Student, StudentStatus, ThemeContextType } from './types';

// Mock Initial User context
const AuthContext = createContext<AuthState | undefined>(undefined);
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<Student | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Restore session from localStorage (Mock persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('ufpi_student_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
    }

    // Initialize Theme
    const storedTheme = localStorage.getItem('ufpi_theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('ufpi_theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (email: string) => {
    // Logic: In a real app, verify credential against Firebase Auth
    // Here, we simulate fetching data from Firestore based on email
    
    // Check if we have stored data for this email, else create dummy
    const existing = localStorage.getItem('ufpi_student_user');
    let studentData: Student;

    if (existing) {
        studentData = JSON.parse(existing);
    } else {
        // Default dummy data if simulating fresh login
        // Updated for Demo: Kalil Martins
        studentData = {
            uid: '123456',
            email: email,
            fullName: 'Kalil Martins', 
            course: 'Engenharia de Produção',
            enrollmentId: '20239015',
            photoUrl: 'https://picsum.photos/200',
            status: StudentStatus.ACTIVE, // Set to active for demo purposes
            validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            documentsUploaded: true
        };
    }
    
    setUser(studentData);
    setIsAuthenticated(true);
    localStorage.setItem('ufpi_student_user', JSON.stringify(studentData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ufpi_student_user');
  };

  const updateStatus = (status: StudentStatus) => {
    if (user) {
        const updated = { ...user, status };
        setUser(updated);
        localStorage.setItem('ufpi_student_user', JSON.stringify(updated));
    }
  };

  const updateStudentData = (data: Partial<Student>) => {
      if (user) {
          const updated = { ...user, ...data };
          setUser(updated);
          localStorage.setItem('ufpi_student_user', JSON.stringify(updated));
      }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateStatus, updateStudentData }}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/" />
            } />
            
            <Route path="/renew" element={
              isAuthenticated ? <Layout><Renewal /></Layout> : <Navigate to="/" />
            } />

            <Route path="/settings" element={
              isAuthenticated ? <Layout><Settings /></Layout> : <Navigate to="/" />
            } />

          </Routes>
        </HashRouter>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;