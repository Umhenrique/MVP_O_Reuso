import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, CheckCircle2, XCircle, Clock, 
  ExternalLink, ArrowRight, Download, RefreshCw, ChevronDown, ChevronUp,
  SlidersHorizontal, Network, FileCheck, Layers
} from 'lucide-react';
import { matchRequirements, getStoredData } from '../services/ontologyEngine';
import RequisitoDetailModal from './RequisitoDetailModal';

export default function BuscarRequisitos() {
  const { taxonomies, projects } = useMemo(() => getStoredData(), []);

  // Estado da Seleção de Características Ontológicas (RU01, RF04)
  const [selectedConcepts, setSelectedConcepts] = useState([
    'Fintech / Serviços Financeiros',
    'PCI-DSS (Segurança em Cartões)',
    'Node.js / Express',
    'Autenticação MFA & OAuth2 / OIDC'
  ]);

  // Estado de Expansão dos Grupos Ontológicos
  const [expandedTaxonomies, setExpandedTaxonomies] = useState({
    dominio: true,
    arquitetura: true,
    tecnologia: true,
    conformidade: true,
    funcionalidade: false,
    nao_funcional: false
  });

  // Estado da Consulta e Resultados (RU02, RU03, RF05, RF06, RF07)
  const [hasSearched, setHasSearched] = useState(true);
  const [filterType, setFilterType] = useState('Todos');
  const [minScoreFilter, setMinScoreFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Estado de Avaliação e Reúso (UC06 / RU06)
  const [evaluations, setEvaluations] = useState({
    'REQ-AUTH-001': 'accepted',
    'REQ-PAY-003': 'accepted'
  });

  // Requisito selecionado para exibição do Modal (UC05 / RU04, RU05, RU07)
  const [selectedReqForModal, setSelectedReqForModal] = useState(null);

  // Executar a consulta à ontologia
  const recommendations = useMemo(() => {
    if (!hasSearched) return [];
    return matchRequirements(selectedConcepts, {
      type: filterType,
      minScore: minScoreFilter,
      searchQuery
    });
  }, [selectedConcepts, hasSearched, filterType, minScoreFilter, searchQuery]);

  // Toggle de seleção de conceito ontológico
  const toggleConcept = (concept) => {
    setSelectedConcepts(prev => 
      prev.includes(concept)
        ? prev.filter(c => c !== concept)
        : [...prev, concept]
    );
  };

  // Toggle expansão de categoria
  const toggleCategoryExpand = (catId) => {
    setExpandedTaxonomies(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Avaliação do requisito (UC06)
  const handleEvaluate = (reqId, status) => {
    setEvaluations(prev => ({
      ...prev,
      [reqId]: status
    }));
  };

  // Selecionar todos / Limpar todos
  const clearSelectedConcepts = () => setSelectedConcepts([]);

  // Preset rápido de projeto para facilidade de demonstração
  const applyProjectPreset = (projId) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;
    const concepts = [
      proj.domain,
      proj.architecture,
      ...(proj.techStack || []),
      ...(proj.compliance || []),
      ...(proj.features || []),
      ...(proj.qualityAttr || [])
    ].filter(Boolean);
    setSelectedConcepts(Array.from(new Set(concepts)));
    setHasSearched(true);
  };

  // Exportar especificação consolidada de requisitos para Markdown (UC06)
  const exportSpecification = () => {
    const acceptedReqs = recommendations.filter(r => evaluations[r.id] === 'accepted');
    if (acceptedReqs.length === 0) {
      alert('Selecione e aceite ao menos 1 requisito para exportar a especificação.');
      return;
    }

    let mdContent = `# Especificação de Requisitos do Novo Projeto\n`;
    mdContent += `*Gerado via Codinome O - Sistema de Reúso de Requisitos Baseado em Ontologias*\n`;
    mdContent += `Data de Geração: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    mdContent += `## Características Contextuais Utilizadas na Consulta Ontológica\n`;
    selectedConcepts.forEach(c => mdContent += `- ${c}\n`);
    mdContent += `\n---\n\n## Requisitos Selecionados e Reutilizados (${acceptedReqs.length})\n\n`;

    acceptedReqs.forEach((r, idx) => {
      mdContent += `### ${idx + 1}. [${r.id}] ${r.title}\n`;
      mdContent += `- **Tipo**: ${r.type} | **Categoria**: ${r.category}\n`;
      mdContent += `- **Projeto de Origem**: ${r.originProject}\n`;
      mdContent += `- **Link da Origem**: ${r.originPath}\n`;
      mdContent += `- **Relevância Ontológica**: ${r.matchPercentage}%\n\n`;
      mdContent += `**Descrição:**\n${r.description}\n\n`;
      if (r.acceptanceCriteria && r.acceptanceCriteria.length > 0) {
        mdContent += `**Critérios de Aceitação:**\n`;
        r.acceptanceCriteria.forEach(ac => mdContent += `- ${ac}\n`);
      }
      mdContent += `\n---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Especificacao_Requisitos_Reuso_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const acceptedCount = Object.values(evaluations).filter(v => v === 'accepted').length;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Quick Demo Presets Banner */}
      <div className="glass-card p-4 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span><strong>Predefinição Rápida de Contexto:</strong> Carregue características de projetos modelo para simular o motor ontológico.</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {projects.slice(0, 3).map(p => (
            <button
              key={p.id}
              onClick={() => applyProjectPreset(p.id)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 transition font-medium"
            >
              {p.name} ({p.domain.split('/')[0]})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Selection of Project Characteristics (RU01, RF04) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">1. Caracterização do Projeto (RU01 / RF04)</h2>
              </div>
              <button
                onClick={clearSelectedConcepts}
                className="text-xs text-slate-400 hover:text-indigo-300 transition"
              >
                Limpar ({selectedConcepts.length})
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Selecione os conceitos, domínio, arquitetura e tecnologias do seu novo projeto para que a ontologia identifique requisitos compatíveis.
            </p>

            {/* Taxonomy Categories List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar">
              {taxonomies.map(tax => {
                const isExpanded = expandedTaxonomies[tax.id];
                const selectedInTax = tax.concepts.filter(c => selectedConcepts.includes(c));

                return (
                  <div key={tax.id} className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden">
                    
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategoryExpand(tax.id)}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-800/50 transition text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-200">{tax.name}</span>
                        {selectedInTax.length > 0 && (
                          <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-600 text-white rounded-full">
                            {selectedInTax.length}
                          </span>
                        )}
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {/* Concepts Checkboxes */}
                    {isExpanded && (
                      <div className="p-3 pt-1 border-t border-slate-800/60 grid grid-cols-1 gap-1.5">
                        {tax.concepts.map(concept => {
                          const isSelected = selectedConcepts.includes(concept);
                          return (
                            <label
                              key={concept}
                              className={`flex items-center space-x-2.5 p-2 rounded-lg text-xs cursor-pointer transition ${
                                isSelected 
                                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 font-medium' 
                                  : 'text-slate-300 hover:bg-slate-800/40 border border-transparent'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleConcept(concept)}
                                className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                              />
                              <span className="select-none leading-snug">{concept}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Submit Consultation Button (RU02 / RF05) */}
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => setHasSearched(true)}
                disabled={selectedConcepts.length === 0}
                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg transition ${
                  selectedConcepts.length > 0
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-indigo-600/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Consultar Ontologia de Requisitos (RU02)</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Search Results & Reuse Recommendations (RU03, UC04, UC06) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Header Controls & Filters (UC04 / RF14) */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span>2. Sugestões de Requisitos Reutilizáveis (RU03 / RF07)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  {recommendations.length} requisito(s) identificado(s) pela ontologia
                </p>
              </div>

              {/* Action: Export Selected Specifications */}
              <button
                onClick={exportSpecification}
                disabled={acceptedCount === 0}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  acceptedCount > 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
                title="Exportar especificação em Markdown para os requisitos aceitos"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Reúso ({acceptedCount})</span>
              </button>
            </div>

            {/* Filter Controls (RF14) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
              
              {/* Text Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar por texto/ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Filter by Requirement Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Todos">Todos os Tipos</option>
                <option value="Funcional">Funcional</option>
                <option value="Não-Funcional">Não-Funcional (RNF)</option>
              </select>

              {/* Filter by Minimum Score */}
              <select
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(e.target.value)}
                className="bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value={0}>Todas Relevâncias</option>
                <option value={40}>Relevância ≥ 40%</option>
                <option value={60}>Relevância ≥ 60%</option>
                <option value={80}>Alta Relevância ≥ 80%</option>
              </select>

            </div>

          </div>

          {/* Results List */}
          {selectedConcepts.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
              <Network className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-300">Nenhuma característica selecionada</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Selecione conceitos no painel à esquerda para consultar a ontologia e receber sugestões de requisitos reutilizáveis (A1 - Fluxo de Exceção).
              </p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
              <XCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-slate-300">Nenhum requisito compatível encontrado</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Não foram encontradas sugestões compatíveis com a combinação de características filtradas (A2 - Nenhum Requisito Encontrado).
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {recommendations.map(req => {
                const evalStatus = evaluations[req.id] || 'pending';

                return (
                  <div
                    key={req.id}
                    className={`glass-card p-4 rounded-xl border transition-all ${
                      evalStatus === 'accepted' 
                        ? 'border-emerald-500/50 bg-emerald-950/10' 
                        : evalStatus === 'rejected'
                        ? 'border-rose-500/30 opacity-60 bg-slate-900/40'
                        : 'border-slate-800 hover:border-indigo-500/40'
                    }`}
                  >
                    
                    {/* Top Row: Requisito Code, Badges, Match Score */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                          {req.id}
                        </span>
                        <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md ${
                          req.type === 'Funcional'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {req.type}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {req.category}
                        </span>
                      </div>

                      {/* Ontological Match Score Badge (RF15) */}
                      <div className="flex items-center space-x-1.5">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              req.matchPercentage >= 75 ? 'bg-emerald-400' :
                              req.matchPercentage >= 50 ? 'bg-indigo-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${req.matchPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-indigo-300 font-mono">
                          {req.matchPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedReqForModal(req)}
                      className="text-sm font-bold text-white hover:text-indigo-300 cursor-pointer transition mb-1.5"
                    >
                      {req.title}
                    </h3>

                    {/* Description Snippet */}
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {req.description}
                    </p>

                    {/* Origin & Justification Snippet (RF09, RF10) */}
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1 mb-3">
                      <div className="flex items-center justify-between">
                        <span>Origem: <strong className="text-slate-200">{req.originProject}</strong></span>
                        <a
                          href={req.originPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-cyan-400 hover:underline"
                        >
                          <span>Ver Origem (RF09)</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <p className="text-[11px] text-amber-200/90 italic truncate">
                        💡 {req.justification}
                      </p>
                    </div>

                    {/* Bottom Action Row (UC05 & UC06) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                      
                      {/* View Details Modal Trigger (UC05) */}
                      <button
                        onClick={() => setSelectedReqForModal(req)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center space-x-1"
                      >
                        <span>Visualizar Detalhes & Rastreabilidade (UC05)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Evaluation Controls (UC06 / RU06) */}
                      <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => handleEvaluate(req.id, 'rejected')}
                          className={`px-2.5 py-1 text-xs rounded-md font-medium transition flex items-center space-x-1 ${
                            evalStatus === 'rejected'
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-rose-300 hover:bg-slate-750'
                          }`}
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Rejeitar</span>
                        </button>

                        <button
                          onClick={() => handleEvaluate(req.id, 'accepted')}
                          className={`px-3 py-1 text-xs rounded-md font-semibold transition flex items-center space-x-1 shadow-sm ${
                            evalStatus === 'accepted'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:text-emerald-300 hover:bg-slate-750'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Aceitar Reúso</span>
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Modal de Detalhamento e Origem (UC05) */}
      {selectedReqForModal && (
        <RequisitoDetailModal
          req={selectedReqForModal}
          onClose={() => setSelectedReqForModal(null)}
          onEvaluate={handleEvaluate}
          evaluationStatus={evaluations[selectedReqForModal.id] || 'pending'}
        />
      )}

    </div>
  );
}
