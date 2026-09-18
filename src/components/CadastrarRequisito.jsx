import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, AlertCircle, Sparkles, Tag, ExternalLink } from 'lucide-react';
import { saveRequirement, getStoredData } from '../services/ontologyEngine';

export default function CadastrarRequisito({ onRequirementSaved }) {
  const { taxonomies, projects } = getStoredData();

  const [formData, setFormData] = useState({
    id: `REQ-NEW-${Math.floor(100 + Math.random() * 900)}`,
    title: '',
    type: 'Funcional',
    category: 'Segurança & Acesso',
    description: '',
    acceptanceCriteria: '',
    originProject: projects[0]?.name || 'Projeto Padrão',
    originPath: 'https://github.com/empresa/projeto/docs/requisitos.md#REQ-NEW',
    selectedTags: [
      'Autenticação MFA & OAuth2 / OIDC',
      'LGPD / Regulamentação de Privacidade'
    ]
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleTagToggle = (concept) => {
    setFormData(prev => {
      const tags = prev.selectedTags || [];
      const updated = tags.includes(concept)
        ? tags.filter(t => t !== concept)
        : [...tags, concept];
      return { ...prev, selectedTags: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação mínima (UC02 - Fluxo Alternativo A1)
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = 'O identificador do requisito é obrigatório.';
    if (!formData.title.trim()) newErrors.title = 'O título é obrigatório.';
    if (!formData.description.trim()) newErrors.description = 'A descrição do requisito é obrigatória.';
    if (!formData.originPath.trim()) newErrors.originPath = 'A localização/link de origem é obrigatória.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const acList = formData.acceptanceCriteria
      ? formData.acceptanceCriteria.split('\n').filter(line => line.trim().length > 0)
      : [];

    const newReq = {
      id: formData.id.trim(),
      title: formData.title.trim(),
      type: formData.type,
      category: formData.category,
      description: formData.description.trim(),
      acceptanceCriteria: acList,
      originProject: formData.originProject,
      originPath: formData.originPath.trim(),
      ontologyTags: formData.selectedTags,
      status: 'Cadastrado',
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveRequirement(newReq);
    setSuccessMsg(`Requisito "${newReq.id} - ${newReq.title}" cadastrado com sucesso!`);

    // Reset form
    setFormData({
      id: `REQ-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      type: 'Funcional',
      category: 'Segurança & Acesso',
      description: '',
      acceptanceCriteria: '',
      originProject: projects[0]?.name || 'Projeto Padrão',
      originPath: 'https://github.com/empresa/projeto/docs/requisitos.md#REQ-NEW',
      selectedTags: []
    });

    if (onRequirementSaved) onRequirementSaved();
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const allTaxonomyConcepts = taxonomies.flatMap(t => t.concepts);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Cadastrar Novo Requisito Reutilizável (UC02 / RF02)</h2>
            <p className="text-xs text-slate-400">
              Cadastre requisitos com identificador, descrição, origem original e vinculação ontológica (RF03).
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Req ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Identificador Único (RF02) *
              </label>
              <input
                type="text"
                placeholder="Ex: REQ-AUTH-005"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
              />
              {errors.id && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.id}</span>
                </p>
              )}
            </div>

            {/* Requirement Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tipo de Requisito
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Funcional">Funcional</option>
                <option value="Não-Funcional">Não-Funcional (RNF)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Categoria
              </label>
              <input
                type="text"
                placeholder="Ex: Segurança & Acesso"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Título Sucinto do Requisito *
            </label>
            <input
              type="text"
              placeholder="Ex: Autenticação Multifator (MFA) obrigatória para contas privilegiadas"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description (RF08) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Descrição Completa da Especificação (RF08) *
            </label>
            <textarea
              rows={4}
              placeholder="O sistema deve obrigatoriamente exigir..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Acceptance Criteria */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Critérios de Aceitação / Teste (1 por linha)
            </label>
            <textarea
              rows={3}
              placeholder="Geração de QR code para pareamento;&#nValidação de token de 6 dígitos com tempo limite de 30s;"
              value={formData.acceptanceCriteria}
              onChange={(e) => handleInputChange('acceptanceCriteria', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Origin & Traceability (RF09, RU05) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Projeto de Origem
              </label>
              <select
                value={formData.originProject}
                onChange={(e) => handleInputChange('originProject', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Caminho / URL de Origem do Requisito (RF09) *
              </label>
              <input
                type="text"
                placeholder="https://github.com/org/repo/docs/reqs.md#REQ-01"
                value={formData.originPath}
                onChange={(e) => handleInputChange('originPath', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
              />
              {errors.originPath && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.originPath}</span>
                </p>
              )}
            </div>
          </div>

          {/* Ontological Tag Association (RF03) */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <label className="block text-xs font-bold text-amber-300 flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Associação com Conceitos Ontológicos (RF03)</span>
            </label>
            <p className="text-[11px] text-slate-400">
              Selecione as tags conceituais que descrevem a natureza do requisito para possibilitar a busca semântica:
            </p>

            <div className="flex flex-wrap gap-1.5 p-3 bg-slate-900/60 rounded-xl border border-slate-800 max-h-48 overflow-y-auto custom-scrollbar">
              {allTaxonomyConcepts.map(concept => {
                const selected = formData.selectedTags.includes(concept);
                return (
                  <button
                    type="button"
                    key={concept}
                    onClick={() => handleTagToggle(concept)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition flex items-center space-x-1 ${
                      selected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{concept}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Requisito na Ontologia (UC02)</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
