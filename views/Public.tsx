import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ArrowRight, Building, Check, Mail, Lock, User, Briefcase, Loader2, Sparkles, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui';
import { Role } from '../types';
import { useAppContext } from '../context/AppContext';

// --- Landing Page (Demo Hub) ---
export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const startDemo = (role: string) => {
      navigate(`/auth?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col p-6 relative overflow-hidden">
      
      {/* Abstract Background */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

      <div className="relative z-10 mt-8 mb-8">
        <div className="flex items-center gap-2 mb-6">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10">
                <Shield className="text-blue-400" size={16} />
            </div>
            <span className="font-bold tracking-widest text-[10px] uppercase text-slate-400">Consorcio Activo</span>
        </div>
        
        <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-4">
          Demo Inversores
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Seleccioná un perfil para experimentar la plataforma desde diferentes puntos de vista.
        </p>
      </div>

      <div className="relative z-10 space-y-3 flex-1">
        
        <div onClick={() => startDemo('CONSORCISTA')} className="group bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-xl h-full flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <User size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">Camino Vecino</h3>
                    <p className="text-xs text-slate-400">Reporta, valida y controla.</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white" />
            </div>
        </div>

        <div onClick={() => startDemo('ENCARGADO')} className="group bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-xl h-full flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Briefcase size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">Camino Encargado</h3>
                    <p className="text-xs text-slate-400">Recibe tareas y sube pruebas.</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white" />
            </div>
        </div>

        <div onClick={() => startDemo('ADMIN')} className="group bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-xl h-full flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Shield size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">Camino Admin</h3>
                    <p className="text-xs text-slate-400">Panel de control y reportes.</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white" />
            </div>
        </div>

        <div onClick={() => startDemo('SOLVER')} className="group bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-xl h-full flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Sparkles size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">Camino Solver</h3>
                    <p className="text-xs text-slate-400">Marketplace de tareas.</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white" />
            </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-white/10">
        <p className="text-center text-[10px] text-slate-600">
            MVP Build v0.4.2 • Internal Use Only
        </p>
      </div>
    </div>
  );
};

// --- Login (Clean) ---
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  // DEMO LOGIC: Pre-fill based on role
  let defaultEmail = 'vecino@consorcio.com';
  if (roleParam === 'ENCARGADO') defaultEmail = 'roberto@consorcio.com';
  if (roleParam === 'ADMIN') defaultEmail = 'admin@consorcio.com';
  if (roleParam === 'SOLVER') defaultEmail = 'solver@consorcio.com';

  const [email, setEmail] = useState(defaultEmail);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col">
       <button onClick={() => navigate(-1)} className="mt-8 mb-8 self-start p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowRight className="rotate-180" size={24} />
       </button>
       
       <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Bienvenido</h1>
                <p className="text-slate-500">Ingresá tu email para continuar.</p>
            </div>
            
            <div className="space-y-6">
                <div className="group">
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Email Corporativo / Personal</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input 
                            type="email" 
                            className="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <Button onClick={() => navigate(`/auth/verify?role=${roleParam || ''}`)} fullWidth size="lg">
                    Continuar
                </Button>
            </div>
       </div>
    </div>
  );
};

// --- Verify (Animation) ---
export const AuthVerify: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/onboarding?role=${roleParam || ''}`);
        }, 1500); 
        return () => clearTimeout(timer);
    }, [navigate, roleParam]);

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
                 <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                 <Shield className="text-blue-600" size={24} />
             </div>
             <h2 className="text-xl font-bold text-slate-900 mb-2">Verificando Credenciales</h2>
             <p className="text-slate-500 text-sm max-w-xs">Validando acceso demo...</p>
        </div>
    )
}

// --- Onboarding Flow (Modern Cards) ---
export const Onboarding: React.FC<{ setRole: (r: Role) => void }> = ({ setRole }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('LIBERTADOR-2400');

  // Auto-skip role selection if in demo mode
  useEffect(() => {
      if (step === 2 && roleParam) {
          // If we have a role param, auto select it after building code
           const roleEnum = roleParam as Role;
           setRole(roleEnum);
           // Different navigation based on role
           if (roleEnum === Role.CONSORCISTA) navigate(`/onboarding/profile?role=${roleParam}`);
           else if (roleEnum === Role.ENCARGADO) navigate(`/onboarding/profile?role=${roleParam}`);
           else if (roleEnum === Role.ADMIN) navigate(`/admin`); // Skip profile for admin demo for speed
           else if (roleEnum === Role.SOLVER) navigate(`/solvers`); // Skip profile for solver demo
      }
  }, [step, roleParam, navigate, setRole]);


  // Step 1: Building Code
  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 pt-20">
        <div className="max-w-sm mx-auto">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm mb-6">
                <Building size={24} className="text-slate-900" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vincular Propiedad</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
                Código del edificio (Demo Pre-cargada):
            </p>
            
            <div className="mb-6">
                <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full text-center text-3xl font-mono tracking-[0.05em] uppercase border-b-2 border-slate-200 bg-transparent py-4 focus:border-slate-900 outline-none transition-colors placeholder:text-slate-200 text-slate-900"
                />
            </div>
            
            <Button onClick={() => setStep(2)} disabled={code.length < 3} fullWidth size="lg">
                Ingresar al Edificio
            </Button>
        </div>
      </div>
    );
  }

  // Step 2: Role Selection (Fallback if no param)
  const RoleCard = ({ role, icon: Icon, title, desc, color }: any) => (
      <button 
        onClick={() => { setRole(role); navigate(role === Role.CONSORCISTA ? '/onboarding/profile' : role === Role.SOLVER ? '/solvers' : role === Role.ENCARGADO ? '/encargado' : '/admin'); }}
        className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all group text-left relative overflow-hidden"
      >
          <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Icon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
          <ChevronRight className="ml-auto text-slate-300 group-hover:text-slate-900" size={18} />
      </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Seleccioná tu perfil</h2>
      <div className="space-y-3">
        <RoleCard role={Role.CONSORCISTA} icon={User} title="Vecino" desc="Propietario o Inquilino" color="bg-blue-500" />
        <RoleCard role={Role.ENCARGADO} icon={Briefcase} title="Encargado" desc="Personal del edificio" color="bg-orange-500" />
        <RoleCard role={Role.ADMIN} icon={Shield} title="Administración" desc="Gestión y control" color="bg-purple-500" />
        <RoleCard role={Role.SOLVER} icon={Sparkles} title="Solver" desc="Profesional externo" color="bg-emerald-500" />
      </div>
    </div>
  );
};

// --- Onboarding Profile ---
export const OnboardingProfile: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');
    const { updateUserProfile } = useAppContext();
    
    // DEMO MODE: Smart Pre-filled profile
    let defaultName = 'Juan Pérez';
    let defaultUnit = '4B';
    let defaultRole = Role.CONSORCISTA;

    if (roleParam === 'ENCARGADO') {
        defaultName = 'Roberto Gómez';
        defaultUnit = 'Portería';
        defaultRole = Role.ENCARGADO;
    }

    const [name, setName] = useState(defaultName);
    const [unit, setUnit] = useState(defaultUnit);

    const handleSubmit = () => {
        updateUserProfile(name, unit, defaultRole);
        navigate(`/onboarding/success?role=${roleParam}`);
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 pt-8">
            <div className="flex items-center gap-2 mb-8">
                <div className="h-1 w-8 bg-slate-900 rounded-full"></div>
                <div className="h-1 w-2 bg-slate-200 rounded-full"></div>
                <div className="h-1 w-2 bg-slate-200 rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Identidad Digital</h2>
            <p className="text-slate-500 mb-8">Confirmá tus datos para el acta digital.</p>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Nombre Completo</label>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-slate-900/10 outline-none" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Unidad/Rol</label>
                        <input 
                             value={unit}
                             onChange={e => setUnit(e.target.value)}
                             type="text" 
                             className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-center font-bold" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">DNI</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-center font-bold" defaultValue="XX.XXX.XXX" />
                    </div>
                </div>
            </div>

            <Button onClick={handleSubmit} fullWidth size="lg" className="mt-8" disabled={!name || !unit}>
                Confirmar Identidad
            </Button>
        </div>
    )
}

// --- Onboarding Success ---
export const OnboardingSuccess: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');

    const handleEnter = () => {
        if (roleParam === 'ENCARGADO') navigate('/encargado');
        else if (roleParam === 'ADMIN') navigate('/admin');
        else navigate('/app');
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute top-1/4 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px]"></div>

            <div className="relative z-10 bg-white/10 p-8 rounded-full mb-8 backdrop-blur-md border border-white/10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                <Check className="text-white" size={48} />
            </div>
            
            <h1 className="relative z-10 text-3xl font-bold mb-4">Todo listo.</h1>
            <p className="relative z-10 text-slate-400 mb-12 max-w-xs leading-relaxed">
                Ya tenés acceso habilitado en <span className="text-white font-bold">Av. Libertador 2400</span>.
            </p>
            
            <div className="relative z-10 w-full max-w-xs">
                <Button onClick={handleEnter} className="bg-white text-slate-900 hover:bg-slate-200 font-bold w-full">
                    Ingresar a la Plataforma
                </Button>
            </div>
        </div>
    )
}