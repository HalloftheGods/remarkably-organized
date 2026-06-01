with open('src/routes/planner/+page.svelte', 'r') as f:
    content = f.read()

def extract_block(title_text):
    start = content.find(f'<h3 style="margin: 0;">{title_text}</h3>')
    if start == -1:
        start = content.find(f'<h3>{title_text}</h3>')
        
    if start == -1: return None, -1, -1
    
    details_start = content.rfind('<details', 0, start)
    details_end = content.find('</details>', start) + len('</details>')
    
    block = content[details_start:details_end]
    return block, details_start, details_end

# Extract Cover Page
cover_block, c_start, c_end = extract_block('Cover Page')
content = content[:c_start] + content[c_end:]

# Find Design block to insert after it
_, d_start, d_end = extract_block('Design')

# Insert Cover Page block right after Design block
content = content[:d_end] + f"\n{cover_block}" + content[d_end:]

with open('src/routes/planner/+page.svelte', 'w') as f:
    f.write(content)

