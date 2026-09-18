import React, { useState } from 'react';
import { Database, Plus, CheckCircle2, AlertCircle, Sparkles, FolderGit2 } from 'lucide-react';
import { saveProject, getStoredData } from '../services/ontologyEngine';

export default function CadastrarProjeto({ onProjectSaved }) {
  const { taxonomies } = getStoredData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: taxonomies.find(t => t.id === 'dominio')?.concepts[0] || '',
    architecture: taxonomies.find(t => t.id === 'arquitetura')?.concepts[0] || '',
    techStack: ['Node.js / Express', 'PostgreSQL'],
    compliance: ['LGPD / Regulamentação de Privacidade'],
    features: ['Gestão de Usuários e Permissões (RBAC)'],
    qualityAttr: ['Alta Disponibilidade (SLA 99.99%)'],
    originPath: 'https://github.com/empresa/novo-projeto/docs/requisitos.md'
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleMultiConceptToggle = (field, concept) => {
    setFormData(prev => {
      const list = prev[field] || [];
      const updated = list.includes(concept)
        ? list.filter(c => c !== concept)
        : [...list, concept];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos (UC01 - Fluxo Alternativo A1)
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome do projeto é obrigatório.';
    if (!formData.description.trim()) newErrors.description = 'A descrição do projeto é obrigatória.';
    if (!formData.originPath.trim()) newErrors.originPath = 'A localização/caminho original é obrigatória.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProject = {
      id: `PRJ-${Date.now().toString().slice(-4)}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      domain: formData.domain,
      architecture: formData.architecture,
      techStack: formData.techStack,
      compliance: formData.compliance,
      features: formData.features,
      qualityAttr: formData.qualityAttr,
      originPath: formData.originPath.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveProject(newProject);
    setSuccessMsg(`Projeto "${newProject.name}" cadastrado com sucesso na base ontológica!`);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      domain: taxonomies.find(t => t.id === 'dominio')?.concepts[0] || '',
      architecture: taxonomies.find(t => t.id === 'arquitetura')?.concepts[0] || '',
      techStack: [],
      compliance: [],
      features: [],
      qualityAttr: [],
      originPath: ''
    });

    if (onProjectSaved) onProjectSaved();
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Cadastrar Novo Projeto na Ontologia (UC01 / RF01)</h2>
            <p className="text-xs text-slate-400">
              Associe projetos existentes a conceitos ontológicos para expandir a base de conhecimento de reuso.
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
          
          {/* General Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Project Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Projeto *
              </label>
              <input
                type="text"
                placeholder="Ex: PayFlux Gateway v2"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Origin Path / Repository URL (RF09, RU05) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Caminho / Link da Origem (RF09) *
              </label>
              <input
                type="text"
                placeholder="https://github.com/org/repo/docs/requirements.md"
                value={formData.originPath}
                onChange={(e) => handleInputChange('originPath', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
              />
              {errors.originPath && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.originPath}</span>
                </p>
              )}
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Descrição do Contexto do Projeto *
            </label>
            <textarea
              rows={3}
              placeholder="Descreva o propósito do projeto, os objetivos de negócio e os principais requisitos atendidos..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Ontological Associations (RF03) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Associações Ontológicas do Projeto (RF03)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Domain Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Domínio Principal de Negócio
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                >
                  {taxonomies.find(t => t.id === 'dominio')?.concepts.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Architecture Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Padrão Arquitetural
                </label>
                <select
                  value={formData.architecture}
                  onChange={(e) => handleInputChange('architecture', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                >
                  {taxonomies.find(t => t.id === 'arquitetura')?.concepts.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Multi-select for Technologies */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tecnologias Utilizadas
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                {taxonomies.find(t => t.id === 'tecnologia')?.concepts.map(c => {
                  const selected = formData.techStack.includes(c);
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => handleMultiConceptToggle('techStack', c)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                        selected 
                          ? 'bg-cyan-600 text-white shadow-sm' 
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Multi-select for Compliance */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Conformidade & Segurança
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                {taxonomies.find(t => t.id === 'conformidade')?.concepts.map(c => {
                  const selected = formData.compliance.includes(c);
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => handleMultiConceptToggle('compliance', c)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                        selected 
                          ? 'bg-cyan-600 text-white shadow-sm' 
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Projeto na Ontologia (UC01)</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
