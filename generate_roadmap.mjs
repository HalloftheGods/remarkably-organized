import fs from 'fs';
import path from 'path';

const dir = '/home/xopher/www/x/remarkably-organized/src/lib/components/templates';
const outPath =
	'/home/xopher/www/x/remarkably-organized/docs/architecture_template_optimization_roadmap.md';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.template.svelte'));

const stats = files.map((file) => {
	const content = fs.readFileSync(path.join(dir, file), 'utf-8');
	const lines = content.split('\n');
	const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
	const scriptContent = scriptMatch ? scriptMatch[1] : '';
	const scriptLines = scriptContent ? scriptContent.split('\n').length : 0;

	// Logic markers
	const derivedCount = (content.match(/\$derived/g) || []).length;
	const effectCount = (content.match(/\$effect/g) || []).length;
	const eachCount = (content.match(/\{#each/g) || []).length;
	const ifCount = (content.match(/\{#if/g) || []).length;
	const componentCount = (content.match(/<\s*[A-Z][a-zA-Z0-9_]*/g) || []).length;

	// Complexity score heuristics
	const score = Math.round(
		scriptLines +
			derivedCount * 5 +
			effectCount * 10 +
			eachCount * 2 +
			ifCount * 2 +
			lines.length * 0.1,
	);

	return {
		file,
		score,
		totalLines: lines.length,
		scriptLines,
		derivedCount,
		effectCount,
		eachCount,
		ifCount,
		componentCount,
	};
});

stats.sort((a, b) => b.score - a.score);

const heavy = stats.filter((s) => s.score >= 50);
const medium = stats.filter((s) => s.score >= 35 && s.score < 50);
const simple = stats.filter((s) => s.score < 35);

function renderTable(list) {
	let md =
		'| Template | Score | Lines | Script | $derived | #each | #if | Components |\n';
	md += '|---|---|---|---|---|---|---|---|\n';
	list.forEach((s) => {
		md += `| ${s.file} | **${s.score}** | ${s.totalLines} | ${s.scriptLines} | ${s.derivedCount} | ${s.eachCount} | ${s.ifCount} | ${s.componentCount} |\n`;
	});
	return md;
}

let markdown = `# Architecture: Template Optimization Roadmap

This document outlines the optimization strategy for streamlining page templates in the Remarkably Organized platform, minimizing rendering footprint for PDF exports (especially for e-ink devices like the reMarkable 2).

## Goal
The objective is to align all templates with the standards established in [architecture_template_standards.md](./architecture_template_standards.md), specifically:
- **Reducing Logic:** Moving heavy calculations or state derivation outside the template or simplifying them.
- **Simplifying Markup:** Abstracting complex repeated HTML into shared standard CSS utilities (\`.field\`, \`.line\`, \`.checkbox\`) or semantic atom components (e.g. \`<Field>\`).
- **Scoping Styles:** Removing inline styles and moving them to nested \`lang="scss"\` blocks.
- **Refactoring:** Converting large inline \`{#each}\` or complex conditionals into cleaner syntax.

Below is an automated ranking of templates by "Heaviness", calculated via a heuristic analyzing script lines, state derivation, conditionals, loops, and overall line count. 

---

## 🛑 Phase 1: Heavy Templates (Score 50+)
These templates contain the most logic, derivations, loops, or complex markup. Optimizing these first will yield the greatest performance and memory improvements during PDF generation.

- **To-Do:** 
  - Abstract repetitive elements into \`<Field>\` components.
  - Simplify \`$derived\` state and extract complex functions to helpers.
  - Remove unnecessary inline styles and use Tailwind \`@apply\`.

${renderTable(heavy)}

## 🟡 Phase 2: Medium Templates (Score 35 - 49)
These templates have a moderate amount of logic. They might contain a few loops or derivations that can be cleaned up, or structural markup that hasn't fully migrated to the latest Atomic Design patterns.

- **To-Do:**
  - Audit for adherence to \`.planner.page\` and \`<Field>\` atom standards.
  - Clean up orientation checks if they duplicate standard logic.

${renderTable(medium)}

## 🟢 Phase 3: Simple Templates (Score < 35)
These templates are mostly structure and likely already perform well. They only need a quick pass to ensure full adherence to our style guidelines.

- **To-Do:**
  - Verify that no inline styles exist.
  - Ensure correct semantic markup (\`<header>\`, \`<footer>\`, etc.).

${renderTable(simple)}

---
*Note: The "Heaviness Score" is an automated heuristic used for prioritization. Actual optimization effort may vary upon manual inspection.*
`;

fs.writeFileSync(outPath, markdown);
console.log('Successfully generated roadmap at ' + outPath);
