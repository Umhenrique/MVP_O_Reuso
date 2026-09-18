// Motor de Ontologia e Algoritmo de Correspondência Semântica (Codinome O)
import { INITIAL_PROJECTS, INITIAL_REQUIREMENTS, ONTOLOGY_TAXONOMIES } from './mockData';

const STORAGE_KEYS = {
  PROJECTS: 'codinome_o_projects_v2',
  REQUIREMENTS: 'codinome_o_requirements_v2',
  TAXONOMIES: 'codinome_o_taxonomies_v2'
};

/**
 * Inicializa e recupera os dados persistidos no LocalStorage ou retorna os pré-cadastrados.
 */
export function getStoredData() {
  const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  const storedReqs = localStorage.getItem(STORAGE_KEYS.REQUIREMENTS);
  const storedTaxonomies = localStorage.getItem(STORAGE_KEYS.TAXONOMIES);

  return {
    projects: storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS,
    requirements: storedReqs ? JSON.parse(storedReqs) : INITIAL_REQUIREMENTS,
    taxonomies: storedTaxonomies ? JSON.parse(storedTaxonomies) : ONTOLOGY_TAXONOMIES
  };
}

/**
 * Salva a lista de projetos atualizada no LocalStorage.
 */
export function saveProject(newProject) {
  const { projects } = getStoredData();
  const updated = [newProject, ...projects];
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  return updated;
}

/**
 * Salva um novo requisito cadastrado no LocalStorage (UC02 / RF02, RF03, RF13).
 */
export function saveRequirement(newReq) {
  const { requirements } = getStoredData();
  const updated = [newReq, ...requirements];
  localStorage.setItem(STORAGE_KEYS.REQUIREMENTS, JSON.stringify(updated));
  return updated;
}

/**
 * Motor de Consulta Ontológica e Recomendação de Requisitos (UC03 / RF05, RF06, RF07, RF10, RF15).
 * 
 * @param {Array<string>} selectedConcepts - Lista de conceitos/características selecionadas para o novo projeto.
 * @param {Object} filterOptions - Critérios adicionais de filtragem (tipo, categoria, score mínimo, etc.)
 */
export function matchRequirements(selectedConcepts = [], filterOptions = {}) {
  const { requirements, projects } = getStoredData();

  if (!selectedConcepts || selectedConcepts.length === 0) {
    return [];
  }

  const selectedSet = new Set(selectedConcepts);

  const scoredResults = requirements.map(req => {
    const reqTags = req.ontologyTags || [];
    
    // Identificar interseção direta entre conceitos da ontologia selecionados e tags do requisito
    const directMatches = reqTags.filter(tag => selectedSet.has(tag));
    
    // Obter dados do projeto de origem
    const originProj = projects.find(p => p.name === req.originProject);
    
    let indirectMatches = [];
    if (originProj) {
      const projConcepts = [
        originProj.domain,
        originProj.architecture,
        ...(originProj.techStack || []),
        ...(originProj.compliance || []),
        ...(originProj.features || []),
        ...(originProj.qualityAttr || [])
      ].filter(Boolean);

      indirectMatches = projConcepts.filter(c => selectedSet.has(c) && !directMatches.includes(c));
    }

    // Cálculo do Score Ontológico Semântico
    // Peso de correspondência direta = 2, indireta via projeto de origem = 1
    const totalScorePoints = (directMatches.length * 2) + indirectMatches.length;
    const maxPossiblePoints = Math.max(selectedConcepts.length * 2, 2);
    
    // Porcentagem calculada relativa às características selecionadas
    let matchPercentage = Math.round((totalScorePoints / maxPossiblePoints) * 100);
    
    // Normalização e cap para experiência realista
    if (directMatches.length > 0 && matchPercentage < 35) {
      matchPercentage = 35 + (directMatches.length * 15);
    }
    matchPercentage = Math.min(matchPercentage, 98);

    // Geração automática da Justificativa Ontológica (RF10)
    const justification = generateOntologyJustification(directMatches, indirectMatches, req.originProject);

    return {
      ...req,
      matchPercentage,
      directMatches,
      indirectMatches,
      justification
    };
  });

  // Filtragem (RF14)
  let filtered = scoredResults.filter(item => item.matchPercentage > 0);

  if (filterOptions.type && filterOptions.type !== 'Todos') {
    filtered = filtered.filter(item => item.type === filterOptions.type);
  }

  if (filterOptions.minScore) {
    filtered = filtered.filter(item => item.matchPercentage >= Number(filterOptions.minScore));
  }

  if (filterOptions.searchQuery) {
    const query = filterOptions.searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  }

  // Ordenação por Relevância/Similaridade Descendente (RF15)
  filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return filtered;
}

/**
 * Gera texto explicativo justificando o motivo do requisito ter sido sugerido pela ontologia (RF10).
 */
function generateOntologyJustification(directMatches, indirectMatches, originProjectName) {
  const parts = [];

  if (directMatches.length > 0) {
    parts.push(`Correspondência direta com os conceitos ontológicos: "${directMatches.join('", "')}".`);
  }

  if (indirectMatches.length > 0) {
    parts.push(`Relação de contexto herdada do projeto de origem (${originProjectName}) através dos atributos: "${indirectMatches.join('", "')}".`);
  }

  if (parts.length === 0) {
    return 'Requisito associado por proximidade taxonômica geral no domínio da aplicação.';
  }

  return parts.join(' ');
}
