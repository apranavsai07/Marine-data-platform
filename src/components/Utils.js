import React from 'react';
import { Loader2, LogOut, Zap, ChevronLeft } from 'lucide-react';

// ====================================================================
// UTILITY COMPONENTS (Exported from Utils.js)
// ====================================================================

// 1. FloatingParticles (Aesthetic Background)
export const FloatingParticles = () => (
    <div className="floating-particles fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(9)].map((_, i) => (
            <div 
                key={i}
                className="particle"
                style={{
                    left: `${(i + 1) * 9}%`,
                    animationDelay: `${i * 1.5}s`,
                }}
            />
        ))}
    </div>
);

// 2. OceanWaves (Aesthetic Background)
export const OceanWaves = () => (
    <div className="ocean-animation fixed inset-0 z-0 opacity-10">
        <div className="wave-bg-abstract" style={{ top: '20%', animationDelay: '0s' }} />
        <div className="wave-bg-abstract" style={{ top: '40%', animationDelay: '-2s' }} />
        <div className="wave-bg-abstract" style={{ top: '60%', animationDelay: '-4s' }} />
    </div>
);

// 3. FeatureCard
export const FeatureCard = ({ icon, title, description, delay = 0, isNew = false }) => (
    <div 
        className={`feature-card ${isNew ? 'new-feature' : ''}`}
        style={{ animationDelay: `${delay}s` }} 
    >
        <span className="feature-icon block mb-2">{icon}</span>
        <h3 className="text-lg font-bold text-cyan-300 mb-1">
            {title} 
            {isNew && <span className="new-badge ml-2">
                NEW
            </span>}
        </h3>
        <p className="text-sm text-blue-200 opacity-80">{description}</p>
    </div>
);

// Form Input Helper (Uses form-group and input styles from App.css)
const FormInput = ({ label, id, name, type, placeholder, value, onChange }) => (
    <div className="form-group mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

// 4. UserPanel
export const UserPanel = ({ formData, setIsLoggedIn }) => {
    const userName = formData.name?.split(' ')[0] || formData.email?.split('@')[0] || 'Researcher';

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="login-container user-panel">
            <div>
                <h2 className="login-title text-2xl font-semibold mb-2 text-center">Welcome, {userName}! 👋</h2>
                <p className="text-center text-sm mb-6 text-slate-500">
                    Signed in as: <strong className="font-semibold text-blue-700">{formData.email}</strong>
                </p>
                
                <div className="text-left mb-6 space-y-2 text-sm">
                    <p className="font-bold text-slate-600 border-b border-slate-100 pb-1">Quick Access:</p>
                    <div className="flex items-center text-blue-700"><Zap size={16} className="mr-2 text-amber-500" /> Real-time Buoy Data</div>
                    <ul className="list-disc list-inside text-slate-600 ml-4 mt-2">
                        <li>View My Datasets</li>
                        <li>Run New Analysis</li>
                        <li>Settings</li>
                    </ul>
                </div>
            </div>

            <button 
                onClick={handleLogout} 
                className="login-btn bg-red-600 hover:bg-red-700 mt-4" // Overriding default login-btn color
                style={{ background: '#dc2626', boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)' }}
            >
                <LogOut size={20} className="mr-2" /> Sign Out
            </button>
        </div>
    );
};

// 5. RegisterForm
export const RegisterForm = ({ formData, handleInputChange, handleSubmit, isLoading, switchToLogin }) => (
    <div className="login-container">
        <button 
            onClick={switchToLogin}
            className="flex items-center text-blue-600 hover:text-blue-500 mb-4 transition duration-150 text-sm"
        >
            <ChevronLeft size={16} className="mr-1" /> Back to Sign In
        </button>
        <h2 className="login-title text-2xl font-semibold mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit}>
            <FormInput label="Full Name" id="name" name="name" type="text" placeholder="Jane Doe" value={formData.name} onChange={handleInputChange} />
            <FormInput label="Email Address" id="email" name="email" type="email" placeholder="researcher@marine.org" value={formData.email} onChange={handleInputChange} />
            <FormInput label="Password" id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
            
            <button 
                type="submit"
                className="login-btn"
                disabled={isLoading}
            >
                {isLoading ? <><Loader2 size={20} className="animate-spin mr-2" /> Creating Account...</> : 'Register & Sign In'}
            </button>
        </form>
        
        <p className="text-center text-slate-500 text-sm mt-4">
            Already have an account? <a href="#" onClick={switchToLogin} className="text-blue-600 font-bold hover:underline">Sign In</a>
        </p>
    </div>
);

// 6. LoginForm
export const LoginForm = ({ formData, handleInputChange, handleSubmit, isLoading, switchToRegister }) => (
    <div className="login-container">
        <h2 className="login-title text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
            <FormInput label="Email Address" id="email" name="email" type="email" placeholder="researcher@marine.org" value={formData.email} onChange={handleInputChange} />
            <FormInput label="Password" id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
            
            <button 
                type="submit"
                className="login-btn"
                disabled={isLoading}
            >
                {isLoading ? <><Loader2 size={20} className="animate-spin mr-2" /> Signing In...</> : 'Sign In to Platform'}
            </button>
        </form>
        
        <p className="text-center text-slate-500 text-sm mt-4">
            New researcher? <a href="#" onClick={switchToRegister} className="text-blue-600 font-bold hover:underline">Create account</a>
        </p>
    </div>
);


// 7. AboutSection 
export const AboutSection = () => (
    <section id="about-section" className="about-section p-8 md:p-12 text-white bg-blue-900/70 backdrop-blur-sm shadow-2xl mt-20 mb-10 w-full max-w-7xl mx-auto rounded-3xl border border-blue-700/50 relative z-20">
        <h2 className="text-4xl font-extrabold mb-6 text-cyan-300 text-center">
            About the Marine Biodiversity Intelligence Platform
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-lg">
            <p className="leading-relaxed border-l-4 border-cyan-500 pl-4">
                This platform, developed for SIH, aims to revolutionize marine ecosystem management by integrating diverse data streams—from traditional oceanography and taxonomy to cutting-edge eDNA molecular biology—using AI-driven analytics.
            </p>
            <p className="leading-relaxed border-l-4 border-cyan-500 pl-4">
                Our goal is to provide researchers and policy makers with **real-time insights** and **predictive models** for effective conservation efforts and sustainable utilization of marine resources.
            </p>
        </div>
    </section>
);
