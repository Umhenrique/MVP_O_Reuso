import React from 'react';
import { Network, Database, FileText, UserCheck, Sparkles, BookOpen } from 'lucide-react';

export default function Header({ userRole, setUserRole, stats, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & System Identification */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  Codinome O
                </span>
                <span className="text-xs text-slate-400">v0.1 MVP</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
                Sistema de Reúso de Requisitos Baseado em Ontologias
              </h1>
            </div>
          </div>

          {/* Quick Metrics & User Role Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Quick Metrics */}
            <div className="hidden lg:flex items-center space-x-3 text-xs bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <div className="flex items-center space-x-1.5 text-slate-300" title="Projetos Registrados">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">{stats.projectsCount}</span>
                <span className="text-slate-500">Projetos</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center space-x-1.5 text-slate-300" title="Requisitos na Ontologia">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{stats.reqsCount}</span>
                <span className="text-slate-500">Requisitos</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center space-x-1.5 text-slate-300" title="Conceitos Ontológicos">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{stats.conceptsCount}</span>
                <span className="text-slate-500">Conceitos</span>
              </div>
            </div>

            {/* Role Switcher (Engenheiro de Software vs Usuário Autorizado) */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setUserRole('engineer')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  userRole === 'engineer'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title="Ator: Engenheiro de Software (Busca, Avaliação e Reúso)"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Engenheiro de Software</span>
              </button>
              
              <button
                onClick={() => setUserRole('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  userRole === 'admin'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title="Ator: Usuário Autorizado (Cadastro de Projetos e Requisitos)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Usuário Autorizado</span>
              </button>
            </div>

          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mt-4 pt-2 border-t border-slate-800/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Buscar & Reutilizar Requisitos (UC03 - UC06)</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'graph'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Grafo da Ontologia</span>
          </button>

          {userRole === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('addProject')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'addProject'
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Cadastrar Projeto (UC01)</span>
              </button>

              <button
                onClick={() => setActiveTab('addReq')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'addReq'
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Cadastrar Requisito (UC02)</span>
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
