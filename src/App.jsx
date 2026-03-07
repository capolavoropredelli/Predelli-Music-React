//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route, Outlet, useParams } from 'react-router-dom'
import { MusicProvider } from './contexts/musicContext'
import Navbar from './components/navbar'
import Player from './components/player'
import Home from './pages/home'
import Login from './pages/login'
import Playlist from './pages/playlist'
import Queue from './pages/queue'
import Download from './pages/download'
import Settings from './pages/settings'
import './style/style.css'

function Library() {
  return (
    <h1>Library</h1>
  )
}

function App() {

  return (
    <MusicProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/library" element={<Library />} />
          <Route path="/download" element={<Download />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/playlist/:name" element={<Playlist />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </MusicProvider>
  )
}

function Layout() {
  return (
    <>
      <Player />
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
