import React from 'react';
import { X, ExternalLink, Shield, CheckCircle, Info, Tag, Network, Sparkles, FolderGit2 } from 'lucide-react';

export default function RequisitoDetailModal({ req, onClose, onEvaluate, evaluationStatus }) {
  if (!req) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-md">
              {req.id}
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
              req.type === 'Funcional' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              {req.type}
            </span>
            {req.matchPercentage && (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                {req.matchPercentage}% Relevância Ontológica
              </span>
            )}
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Title & Category */}
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{req.title}</h2>
            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <span>Categoria: <strong className="text-slate-200">{req.category}</strong></span>
              <span>•</span>
              <span>Cadastrado em: {req.createdAt}</span>
            </div>
          </div>

          {/* Detailed Description (RF08, RU04) */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Descrição do Requisito (RF08)</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {req.description}
            </p>
          </div>

          {/* Acceptance Criteria */}
          {req.acceptanceCriteria && req.acceptanceCriteria.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Critérios de Aceitação / Teste</span>
              </h3>
              <ul className="space-y-2">
                {req.acceptanceCriteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Origin Details & Traceability (RF09, RU05, RU07) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 p-4 rounded-xl border border-indigo-500/20">
            <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              <span>Rastreabilidade e Origem do Requisito (RF09, RU05)</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Projeto de Origem:</span>
                <span className="font-semibold text-indigo-200">{req.originProject}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-slate-800">
                <span className="text-slate-400">Caminho / Documento Original:</span>
                <a
                  href={req.originPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px] truncate max-w-md"
                  title="Acessar documento/repositório original"
                >
                  <span className="truncate">{req.originPath}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Ontology Justification & Relations (RF10) */}
          {req.justification && (
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Network className="w-4 h-4 text-amber-400" />
                <span>Justificativa da Relação Ontológica (RF10)</span>
              </h3>
              <p className="text-xs text-slate-300 italic mb-3">
                "{req.justification}"
              </p>
              
              {req.ontologyTags && req.ontologyTags.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Conceitos Ontológicos Associados:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {req.ontologyTags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className={`px-2 py-0.5 text-[11px] rounded-md font-medium flex items-center space-x-1 ${
                          req.directMatches?.includes(tag)
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        <Tag className="w-2.5 h-2.5" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer with Evaluation Controls (UC06 / RU06) */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span>Status Atual:</span>
            <span className={`font-semibold ${
              evaluationStatus === 'accepted' ? 'text-emerald-400' :
              evaluationStatus === 'rejected' ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {evaluationStatus === 'accepted' ? '✓ Aceito para Reúso' :
               evaluationStatus === 'rejected' ? '✕ Rejeitado' : '⏳ Sob Análise'}
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => { onEvaluate(req.id, 'rejected'); onClose(); }}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-lg text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition"
            >
              Rejeitar
            </button>
            <button
              onClick={() => { onEvaluate(req.id, 'accepted'); onClose(); }}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition"
            >
              Aceitar para Reúso
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
