import re

with open('src/routes/planner/+page.svelte', 'r') as f:
    content = f.read()

# Pattern for most of the checkboxes (without DOTALL, matching specific spaces)
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
									forceUpdateTrigger++;
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
									forceUpdateTrigger++;
								}}}}
								onclick={{(e) => e.stopPropagation()}}
								style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
							<h3 style="margin: 0;">Dashboard Page</h3>
						</div>
					</summary>'''

content = pattern2.sub(replacer2, content)

with open('src/routes/planner/+page.svelte', 'w') as f:
    f.write(content)
