'use client'

import { useState } from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Activity, BarChart2, Settings, Bell, BookOpen, Users, Bluetooth, AlertTriangle, Award, Mic, UserPlus } from 'lucide-react'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [showPrototypeInfo, setShowPrototypeInfo] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: 'Pepito Pérez',
    age: 80,
    phone: '123-456-7890',
    email: 'pepito@example.com',
    bloodPressure: { systolic: 120, diastolic: 80 },
    glucose: 90,
  })
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)

  const mainMenuItems = [
    { icon: <Activity className="w-10 h-10" />, title: "Registrar Indicadores", screen: "register", color: "primary" },
    { icon: <BarChart2 className="w-10 h-10" />, title: "Historial de Salud", screen: "history", color: "secondary" },
    { icon: <Bell className="w-10 h-10" />, title: "Recordatorios", screen: "reminders", color: "accent" },
    { icon: <BookOpen className="w-10 h-10" />, title: "Consejos de Salud", screen: "education", color: "primary" },
    { icon: <Users className="w-10 h-10" />, title: "Red de Apoyo", screen: "support", color: "secondary" },
    { icon: <Bluetooth className="w-10 h-10" />, title: "Dispositivos", screen: "devices", color: "accent" },
    { icon: <AlertTriangle className="w-10 h-10" />, title: "Alertas", screen: "alerts", color: "primary" },
    { icon: <Award className="w-10 h-10" />, title: "Logros", screen: "achievements", color: "secondary" },
    { icon: <Mic className="w-10 h-10" />, title: "Registro por Voz", screen: "voiceInput", color: "accent" },
    { icon: <UserPlus className="w-10 h-10" />, title: "Cambiar Perfil", screen: "changeProfile", color: "primary" },
    { icon: <Settings className="w-10 h-10" />, title: "Configuración", screen: "settings", color: "secondary" },
  ]

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-background)] p-8">
            <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-6 text-center">Vida Sana</h1>
            <p className="text-2xl text-[var(--color-text)] mb-10 text-center">Tu compañero digital de salud</p>
            <Button onClick={() => {
              setShowPrototypeInfo(true)
              setCurrentScreen('prototypeInfo')
            }} className="text-2xl py-8 px-12">Entrar</Button>
          </div>
        )
      case 'prototypeInfo':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-background)] p-8">
            <div className="bg-[var(--color-card)] p-8 rounded-xl shadow-lg max-w-2xl">
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 text-center">Información del Prototipo</h2>
              <p className="text-xl text-[var(--color-text)] mb-4">
                Este es un prototipo de lo que podría ser la aplicación "Vida Sana".
              </p>
              <p className="text-xl text-[var(--color-text)] mb-4">
                Creado por: Miguel David Saavedra
              </p>
              <p className="text-xl text-[var(--color-text)] mb-4">
                Cédula: 1070023598
              </p>
              <p className="text-xl text-[var(--color-text)] mb-4">
                Para el Curso: "PROYECTO DE GRADO"
              </p>
              <p className="text-xl text-[var(--color-text)] mb-8">
                Tutor: CESAR ALBERTO GALINDO DAZA
              </p>
              <Button onClick={() => setCurrentScreen('main')} className="text-2xl">Continuar</Button>
            </div>
          </div>
        )
      case 'main':
        return (
          <div className={`flex flex-col h-screen bg-[var(--color-background)] ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
            <Header 
              title="Vida Sana" 
              onProfileClick={() => setCurrentScreen('profile')}
            />
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                {mainMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    color={item.color as 'primary' | 'secondary' | 'accent'}
                    onClick={() => setCurrentScreen(item.screen)}
                    icon={item.icon}
                    className="h-40 text-2xl"
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </main>
          </div>
        )
      case 'register':
        return <RegisterScreen onBack={() => setCurrentScreen('main')} />
      case 'history':
        return <HistoryScreen onBack={() => setCurrentScreen('main')} />
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('main')} setHighContrast={setHighContrast} setLargeText={setLargeText} />
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('main')} userProfile={userProfile} setUserProfile={setUserProfile} />
      case 'reminders':
        return <RemindersScreen onBack={() => setCurrentScreen('main')} />
      case 'education':
        return <EducationScreen onBack={() => setCurrentScreen('main')} />
      case 'support':
        return <SupportScreen onBack={() => setCurrentScreen('main')} />
      case 'devices':
        return <DevicesScreen onBack={() => setCurrentScreen('main')} />
      case 'alerts':
        return <AlertsScreen onBack={() => setCurrentScreen('main')} />
      case 'achievements':
        return <AchievementsScreen onBack={() => setCurrentScreen('main')} />
      case 'voiceInput':
        return <VoiceInputScreen onBack={() => setCurrentScreen('main')} />
      case 'changeProfile':
        return <ChangeProfileScreen onBack={() => setCurrentScreen('main')} />
      default:
        return null
    }
  }

  return renderScreen()
}

function RegisterScreen({ onBack }: { onBack: () => void }) {
  const [inputMethod, setInputMethod] = useState<'manual' | 'device'>('manual')

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Registrar Indicadores" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            color={inputMethod === 'manual' ? 'primary' : 'secondary'}
            onClick={() => setInputMethod('manual')}
            className="w-1/2"
          >
            Manual
          </Button>
          <Button
            color={inputMethod === 'device' ? 'primary' : 'secondary'}
            onClick={() => setInputMethod('device')}
            className="w-1/2"
          >
            Conexión a Aparatos
          </Button>
        </div>
        {inputMethod === 'manual' ? (
          <form className="space-y-6">
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <label className="block text-2xl mb-2 font-bold">Presión Arterial (mmHg)</label>
              <div className="flex space-x-4">
                <input type="number" placeholder="Sistólica" className="w-1/2 p-4 text-xl border rounded-xl" />
                <input type="number" placeholder="Diastólica" className="w-1/2 p-4 text-xl border rounded-xl" />
              </div>
              <p className="text-lg text-[var(--color-text-light)] mt-2">Valor normal: 120/80</p>
            </div>
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <label className="block text-2xl mb-2 font-bold">Nivel de Glucosa (mg/dL)</label>
              <input type="number" placeholder="mg/dL" className="w-full p-4 text-xl border rounded-xl" />
              <p className="text-lg text-[var(--color-text-light)] mt-2">Valor normal: 70-140 mg/dL</p>
            </div>
            <Button onClick={() => alert('Datos registrados correctamente')} className="text-2xl">Registrar</Button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-2xl mb-6">Conecte su dispositivo médico y presione el botón para sincronizar los datos.</p>
            <Button onClick={() => alert('Sincronización simulada. Datos registrados correctamente.')} className="text-2xl">
              Sincronizar Datos
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

function HistoryScreen({ onBack }: { onBack: () => void }) {
  const mockData = [
    { date: '2023-05-01', pressure: '120/80', glucose: 100 },
    { date: '2023-05-02', pressure: '118/78', glucose: 105 },
    { date: '2023-05-03', pressure: '122/82', glucose: 98 },
    { date: '2023-05-04', pressure: '121/79', glucose: 102 },
    { date: '2023-05-05', pressure: '119/81', glucose: 97 },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Historial de Salud" showBackButton onBack={onBack} />
      <main className="flex-1 p-6">
        <div className="bg-[var(--color-card)] rounded-xl shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--color-primary)] text-[var(--color-white)]">
                <th className="p-4 text-left text-xl">Fecha</th>
                <th className="p-4 text-left text-xl">Presión</th>
                <th className="p-4 text-left text-xl">Glucosa</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((record, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-card)]'}>
                  <td className="p-4 text-lg">{record.date}</td>
                  <td className="p-4 text-lg">{record.pressure}</td>
                  <td className="p-4 text-lg">{record.glucose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

function SettingsScreen({ onBack, setHighContrast, setLargeText }: { onBack: () => void, setHighContrast: (value: boolean) => void, setLargeText: (value: boolean) => void }) {
  const [localHighContrast, setLocalHighContrast] = useState(false)
  const [localLargeText, setLocalLargeText] = useState(false)

  const saveSettings = () => {
    setHighContrast(localHighContrast)
    setLargeText(localLargeText)
    alert('Configuración guardada')
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Configuración" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Accesibilidad</h2>
          <div className="flex items-center justify-between">
            <span className="text-2xl">Modo de alto contraste</span>
            <input
              type="checkbox"
              checked={localHighContrast}
              onChange={(e) => setLocalHighContrast(e.target.checked)}
              className="w-8 h-8"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl">Texto ampliado</span>
            <input
              type="checkbox"
              checked={localLargeText}
              onChange={(e) => setLocalLargeText(e.target.checked)}
              className="w-8 h-8"
            />
          </div>
        </div>
        <Button onClick={saveSettings} className="text-2xl">Guardar Cambios</Button>
      </main>
    </div>
  )
}

function ProfileScreen({ onBack, userProfile, setUserProfile }: { onBack: () => void, userProfile: any, setUserProfile: (profile: any) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  const handleSave = () => {
    setUserProfile(editedProfile)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Perfil de Usuario" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
          {isEditing ? (
            <form className="space-y-4">
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full p-4 text-xl border rounded-xl"
              />
              <input
                type="number"
                value={editedProfile.age}
                onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                className="w-full p-4 text-xl border rounded-xl"
              />
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="w-full p-4 text-xl border rounded-xl"
              />
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="w-full p-4 text-xl border rounded-xl"
              />
              <Button onClick={handleSave} className="text-2xl">Guardar Cambios</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[var(--color-primary)]">{userProfile.name}</h2>
              <p className="text-xl">Edad: {userProfile.age} años</p>
              <p className="text-xl">Teléfono: {userProfile.phone}</p>
              <p className="text-xl">Email: {userProfile.email}</p>
              <Button onClick={() => setIsEditing(true)} className="text-2xl">Editar Perfil</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function RemindersScreen({ onBack }: { onBack: () => void }) {
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Medir presión arterial', time: '09:00' },
    { id: 2, title: 'Medir nivel de glucosa', time: '14:00' },
  ])

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Recordatorios" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">{reminder.title}</h3>
            <p className="text-xl">Hora: {reminder.time}</p>
          </div>
        ))}
        <Button onClick={() => alert('Funcionalidad para agregar recordatorio')} className="text-2xl">Agregar Recordatorio</Button>
      </main>
    </div>
  )
}

function EducationScreen({ onBack }: { onBack: () => void }) {
  const tips = [
    { id: 1, title: 'Manténgase hidratado', content: 'Beba al menos 8 vasos de agua al día.' },
    { id: 2, title: 'Haga ejercicio regularmente', content: 'Intente caminar 30 minutos diarios.' },
    { id: 3, title: 'Coma frutas y verduras', content: 'Incluya 5 porciones de frutas y verduras en su dieta diaria.' },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Consejos de Salud" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">{tip.title}</h3>
            <p className="text-xl">{tip.content}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

function SupportScreen({ onBack }: { onBack: () => void }) {
  const [emergencyContact, setEmergencyContact] = useState({ name: 'María Pérez', phone: '987-654-3210' })

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Red de Apoyo" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold">Contacto de Emergencia</h3>
          <p className="text-xl">Nombre: {emergencyContact.name}</p>
          <p className="text-xl">Teléfono: {emergencyContact.phone}</p>
        </div>
        <Button onClick={() => alert('Funcionalidad para editar contacto de emergencia')} className="text-2xl">Editar Contacto</Button>
      </main>
    </div>
  )
}

function DevicesScreen({ onBack }: { onBack: () => void }) {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Tensiómetro BPM-200', connected: true },
    { id: 2, name: 'Glucómetro GL-100', connected: false },
  ])

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Dispositivos Médicos" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg flex justify-between items-center">
            <span className="text-xl">{device.name}</span>
            <span className={`text-lg ${device.connected ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
              {device.connected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        ))}
        <Button onClick={() => alert('Funcionalidad para agregar nuevo dispositivo')} className="text-2xl">Agregar Dispositivo</Button>
      </main>
    </div>
  )
}

function AlertsScreen({ onBack }: { onBack: () => void }) {
  const [alerts, setAlerts] = useState({
    highBloodPressure: true,
    lowBloodPressure: true,
    highGlucose: true,
    lowGlucose: true,
  })

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Configurar Alertas" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg space-y-4">
          {Object.entries(alerts).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xl">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={() => setAlerts({ ...alerts, [key]: !value })}
                className="w-6 h-6"
              />
            </div>
          ))}
        </div>
        <Button onClick={() => alert('Configuración de alertas guardada')} className="text-2xl">Guardar Configuración</Button>
      </main>
    </div>
  )
}

function AchievementsScreen({ onBack }: { onBack: () => void }) {
  const achievements = [
    { id: 1, title: '¡Registro Diario!', description: 'Registraste tus datos todos los días esta semana.', icon: '🏆' },
    { id: 2, title: 'Primer Registro de Glucosa', description: 'Completaste tu primer registro de nivel de glucosa.', icon: '🎖️' },
    { id: 3, title: 'Experto en Presión', description: 'Has registrado tu presión arterial 30 días seguidos.', icon: '🥇' },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Logros" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <span className="text-4xl">{achievement.icon}</span>
            <div>
              <h3 className="text-2xl font-bold">{achievement.title}</h3>
              <p className="text-lg text-[var(--color-text-light)]">{achievement.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

function VoiceInputScreen({ onBack }: { onBack: () => void }) {
  const [recording, setRecording] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const startRecording = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setResult('Presión arterial: 120/80, Nivel de glucosa: 95 mg/dL')
    }, 3000)
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Registro por Voz" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        <p className="text-xl text-center">Diga su presión arterial (ejemplo: 120 sobre 80) y nivel de glucosa.</p>
        <Button
          onClick={startRecording}
          color={recording ? 'secondary' : 'primary'}
          className="text-2xl"
        >
          {recording ? 'Grabando...' : 'Hablar para Registrar'}
        </Button>
        {result && (
          <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Resultado:</h3>
            <p className="text-xl">{result}</p>
          </div>
        )}
      </main>
    </div>
  )
}

function ChangeProfileScreen({ onBack }: { onBack: () => void }) {
  const profiles = [
    { id: 1, name: 'Pepito Pérez', avatar: '👴' },
    { id: 2, name: 'María Gómez', avatar: '👵' },
    { id: 3, name: 'Juan Rodríguez', avatar: '🧓' },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      <Header title="Cambiar Perfil" showBackButton onBack={onBack} />
      <main className="flex-1 p-6 space-y-6">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            onClick={() => alert(`Cambiando al perfil de ${profile.name}`)}
            color="primary"
            className="text-2xl flex items-center justify-start"
          >
            <span className="text-4xl mr-4">{profile.avatar}</span>
            <span>{profile.name}</span>
          </Button>
        ))}
      </main>
    </div>
  )
}

