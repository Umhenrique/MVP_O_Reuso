import React, { useState } from 'react';
import { Network, Database, FileText, Sparkles, Tag, Layers, Info } from 'lucide-react';
import { getStoredData } from '../services/ontologyEngine';

export default function OntologyGraphView() {
  const { taxonomies, projects, requirements } = getStoredData();

  const [selectedNode, setSelectedNode] = useState(null);
  const [activeFilterCategory, setActiveFilterCategory] = useState('All');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Info */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <span>Navegador de Ontologia e Grafo de Conhecimento</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualização relacional dos conceitos da ontologia, projetos cadastrados e requisitos conectados.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilterCategory('All')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              activeFilterCategory === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos os Nós
          </button>
          <button
            onClick={() => setActiveFilterCategory('projects')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              activeFilterCategory === 'projects'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Projetos ({projects.length})
          </button>
          <button
            onClick={() => setActiveFilterCategory('reqs')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              activeFilterCategory === 'reqs'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Requisitos ({requirements.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graph / Concept Clusters Grid (Left Column) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Taxonomies & Concept Classes */}
          {(activeFilterCategory === 'All' || activeFilterCategory === 'concepts') && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Classes & Taxonomias Ontológicas</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {taxonomies.map(tax => (
                  <div key={tax.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-indigo-300 block">{tax.name}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tax.concepts.map(concept => {
                        const connectedReqsCount = requirements.filter(r => r.ontologyTags?.includes(concept)).length;
                        return (
                          <button
                            key={concept}
                            onClick={() => setSelectedNode({ type: 'concept', name: concept, taxonomy: tax.name, reqsCount: connectedReqsCount })}
                            className="px-2 py-1 bg-slate-800 hover:bg-indigo-600/40 text-slate-300 hover:text-indigo-200 border border-slate-700/80 rounded-md text-[11px] font-medium transition flex items-center space-x-1"
                          >
                            <Tag className="w-2.5 h-2.5 text-indigo-400" />
                            <span>{concept}</span>
                            {connectedReqsCount > 0 && (
                              <span className="px-1 text-[9px] bg-indigo-500/30 rounded text-indigo-200">
                                {connectedReqsCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Projects */}
          {(activeFilterCategory === 'All' || activeFilterCategory === 'projects') && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Instâncias de Projetos na Base de Conhecimento</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedNode({ type: 'project', data: p })}
                    className="p-3.5 glass-card rounded-xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 rounded">
                        {p.domain.split('/')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{p.description}</p>
                    <div className="text-[10px] font-mono text-slate-500 truncate pt-1 border-t border-slate-800">
                      {p.originPath}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Requirements */}
          {(activeFilterCategory === 'All' || activeFilterCategory === 'reqs') && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Instâncias de Requisitos Conectados</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {requirements.map(r => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedNode({ type: 'requirement', data: r })}
                    className="p-3.5 glass-card rounded-xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 rounded">
                        {r.id}
                      </span>
                      <span className="text-[11px] text-slate-400">{r.type}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{r.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Node Inspector & Context Detail */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Info className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Inspeção de Nó Selecionado</h3>
            </div>

            {!selectedNode ? (
              <div className="text-center py-8 text-slate-500 space-y-2">
                <Layers className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">Clique em qualquer conceito, projeto ou requisito ao lado para inspecionar seus relacionamentos ontológicos.</p>
              </div>
            ) : selectedNode.type === 'concept' ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-500/30">
                  <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider block">Conceito Ontológico</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedNode.name}</h4>
                  <span className="text-[11px] text-slate-400">Pertence à taxonomia: {selectedNode.taxonomy}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-300 block mb-2">Requisitos Conectados a este Conceito:</span>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar">
                    {requirements
                      .filter(r => r.ontologyTags?.includes(selectedNode.name))
                      .map(r => (
                        <div key={r.id} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                          <span className="font-mono font-bold text-indigo-300">{r.id}</span>
                          <p className="text-slate-200 line-clamp-1">{r.title}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : selectedNode.type === 'project' ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/30">
                  <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider block">Projeto Registrado</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedNode.data.name}</h4>
                  <p className="text-[11px] text-slate-300 mt-1">{selectedNode.data.description}</p>
                </div>

                <div className="space-y-1 text-slate-400 text-[11px]">
                  <div><strong>Domínio:</strong> {selectedNode.data.domain}</div>
                  <div><strong>Arquitetura:</strong> {selectedNode.data.architecture}</div>
                  <div><strong>Origem:</strong> <span className="font-mono text-[10px]">{selectedNode.data.originPath}</span></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Requisito ({selectedNode.data.id})</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedNode.data.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1">{selectedNode.data.description}</p>
                </div>

                <div className="space-y-1 text-slate-400 text-[11px]">
                  <div><strong>Projeto de Origem:</strong> {selectedNode.data.originProject}</div>
                  <div><strong>Link da Origem:</strong> <span className="font-mono text-[10px] text-cyan-400">{selectedNode.data.originPath}</span></div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
