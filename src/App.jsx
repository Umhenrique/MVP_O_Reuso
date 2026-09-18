import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BuscarRequisitos from './components/BuscarRequisitos';
import CadastrarProjeto from './components/CadastrarProjeto';
import CadastrarRequisito from './components/CadastrarRequisito';
import OntologyGraphView from './components/OntologyGraphView';
import { getStoredData } from './services/ontologyEngine';

export default function App() {
  const [userRole, setUserRole] = useState('engineer'); // 'engineer' | 'admin'
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'graph' | 'addProject' | 'addReq'

  const [stats, setStats] = useState({
    projectsCount: 0,
    reqsCount: 0,
    conceptsCount: 0
  });

  const updateStats = () => {
    const { projects, requirements, taxonomies } = getStoredData();
    const totalConcepts = taxonomies.reduce((sum, t) => sum + t.concepts.length, 0);
    setStats({
      projectsCount: projects.length,
      reqsCount: requirements.length,
      conceptsCount: totalConcepts
    });
  };

  useEffect(() => {
    updateStats();
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        userRole={userRole}
        setUserRole={setUserRole}
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'search' && (
          <BuscarRequisitos />
        )}

        {activeTab === 'graph' && (
          <OntologyGraphView />
        )}

        {activeTab === 'addProject' && userRole === 'admin' && (
          <CadastrarProjeto onProjectSaved={updateStats} />
        )}

        {activeTab === 'addReq' && userRole === 'admin' && (
          <CadastrarRequisito onRequirementSaved={updateStats} />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            <span className="font-semibold text-slate-400">Codinome O</span> • Sistema de Reúso de Requisitos Baseado em Ontologias
          </div>
          <div>
            Desenvolvido por Matheus Medeiros, Pedro Guilherme e Luiz Souza
          </div>
        </div>
      </footer>

    </div>
  );
}
