import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CommandCenter from './pages/CommandCenter'
import Leads from './pages/crm/Leads'
import Clients from './pages/crm/Clients'
import Opportunities from './pages/Opportunities'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Debrief from './pages/Debrief'
import WhatsApp from './pages/WhatsApp'
import Prospecting from './pages/Prospecting'
import FusionCFO from './pages/FusionCFO'
import Health from './pages/Health'
import Content from './pages/Content'
import Settings from './pages/Settings'
import VoiceAssistant from './pages/VoiceAssistant'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="command-center" element={<CommandCenter />} />
          <Route path="crm/leads" element={<Leads />} />
          <Route path="crm/clients" element={<Clients />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="debrief" element={<Debrief />} />
          <Route path="whatsapp" element={<WhatsApp />} />
          <Route path="prospecting" element={<Prospecting />} />
          <Route path="cfo" element={<FusionCFO />} />
          <Route path="health" element={<Health />} />
          <Route path="content" element={<Content />} />
          <Route path="settings" element={<Settings />} />
          <Route path="jarvis" element={<VoiceAssistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
