import re

with open('src/routes/planner/+page.svelte', 'r') as f:
    content = f.read()

# 1. Update Checkboxes in Summaries (without forceUpdateTrigger)
pattern1 = re.compile(
    r'<summary><h3>(.*?)</h3></summary>\s*<div class="checkbox">\s*<input\s*type="checkbox"\s*bind:checked=\{settings\.([a-zA-Z]+)\.disable\}\s*id="[^"]*" />\s*<label for="[^"]*">Disable .*?</label>\s*</div>'
)

def replacer1(m):
    title = m.group(1)
    setting = m.group(2)
    return f'''<summary>
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<input
								type="checkbox"
								checked={{!settings.{setting}.disable}}
								onchange={{(e) => {{
									settings.{setting}.disable = !e.currentTarget.checked;
								}}}}
								onclick={{(e) => e.stopPropagation()}}
								style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
							<h3 style="margin: 0;">{title}</h3>
						</div>
					</summary>'''

content = pattern1.sub(replacer1, content)

# Dashboard is special
pattern2 = re.compile(
    r'<summary><h3>Dashboard Page</h3></summary>\s*<fieldset>\s*<label for="dashboardPage-disable" style="display: flex; align-items: center">\s*<input\s*id="dashboardPage-disable"\s*type="checkbox"\s*class="checkbox"\s*style="width: 2rem;"\s*bind:checked=\{settings\.dashboardPage\.disable\} />\s*Disable Dashboard Page\s*</label>\s*</fieldset>'
)

def replacer2(m):
    return f'''<summary>
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<input
								type="checkbox"
								checked={{!settings.dashboardPage.disable}}
								onchange={{(e) => {{
									settings.dashboardPage.disable = !e.currentTarget.checked;
								}}}}
								onclick={{(e) => e.stopPropagation()}}
								style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
							<h3 style="margin: 0;">Dashboard Page</h3>
						</div>
					</summary>'''

content = pattern2.sub(replacer2, content)

# 2. Extract and Move Blocks
def extract_block(title_text):
    start = content.find(f'<h3 style="margin: 0;">{title_text}</h3>')
    if start == -1:
        start = content.find(f'<h3>{title_text}</h3>')
        
    if start == -1: return None, ""
    
    # find the preceding <details open>
    details_start = content.rfind('<details open>', 0, start)
    # find the matching </details>
    details_end = content.find('</details>', start) + len('</details>')
    
    block = content[details_start:details_end]
    return block, details_start, details_end

design_block, d_start, d_end = extract_block('Design')
content = content[:d_start] + content[d_end:]
topbar_block, t_start, t_end = extract_block('Topbar Navigation')
content = content[:t_start] + content[t_end:]
sidebar_block, s_start, s_end = extract_block('Sidebar Navigation')
content = content[:s_start] + content[s_end:]

# Insert blocks right after {#if showAdvancedSettings}
insert_idx = content.find('{#if showAdvancedSettings}') + len('{#if showAdvancedSettings}\n')
content = content[:insert_idx] + f"{design_block}\n{topbar_block}\n{sidebar_block}\n" + content[insert_idx:]

# 3. Accordion Styles Fix
content = content.replace('''				padding: 1rem 0;
				margin-top: 1rem;
				margin-bottom: 0;
				color: var(--text);''', '''				padding: 0.75rem 0;
				margin-top: 0;
				margin-bottom: 0;
				border-bottom: 1px solid var(--outline);
				color: var(--text);''')

content = content.replace('''			&[open] > summary::after {
				content: '\\2212';
			}
		}
		.checkbox {''', '''			&[open] > summary::after {
				content: '\\2212';
			}
			& > fieldset,
			& > div:not(.row),
			& > .row {
				margin-top: 1rem;
				margin-bottom: 1rem;
			}
		}
		.checkbox {''')

content = content.replace('''	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0;
		fieldset {''', '''	form {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin: 0;
		fieldset {''')

with open('src/routes/planner/+page.svelte', 'w') as f:
    f.write(content)

