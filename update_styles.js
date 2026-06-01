const fs = require('fs');
let code = fs.readFileSync('/home/xopher/www/x/remarkably-organized/src/routes/planner/+page.svelte', 'utf8');

const oldStyle = `                h3 {
                        position: sticky;
                        top: 4rem;
                        background-color: var(--bg);
                        color: var(--text);
                        padding: 1rem 0;
                        margin-top: 1rem;
                        margin-bottom: -1rem;
                }`;

const newStyle = `                details {
                        & > summary {
                                position: sticky;
                                top: 4rem;
                                background-color: var(--bg);
                                z-index: 2;
                                list-style: none;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                cursor: pointer;
                                padding: 1rem 0;
                                margin-top: 1rem;
                                margin-bottom: -1rem;
                                color: var(--text);
                                
                                &::-webkit-details-marker {
                                        display: none;
                                }

                                &::after {
                                        content: '+';
                                        font-size: 1.5rem;
                                        font-weight: 300;
                                        margin-left: 0.5rem;
                                }
                        }
                        
                        &[open] > summary::after {
                                content: '−';
                        }
                }
                h3 {
                        position: static;
                        top: auto;
                        background-color: transparent;
                        color: var(--text);
                        padding: 0;
                        margin: 0;
                }`;

if (code.includes(oldStyle)) {
  code = code.replace(oldStyle, newStyle);
  fs.writeFileSync('/home/xopher/www/x/remarkably-organized/src/routes/planner/+page.svelte', code);
  console.log("Successfully updated styles");
} else {
  console.error("Could not find the target h3 style block");
}
