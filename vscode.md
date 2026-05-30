{
    "editor.cursorBlinking": "solid",
    "editor.cursorSmoothCaretAnimation": "off",
    "editor.smoothScrolling": true,
    "workbench.list.smoothScrolling": true,
    "terminal.integrated.smoothScrolling": true,
    "editor.mouseWheelZoom": true,
    "explorer.confirmDelete": false,
    "explorer.confirmPasteNative": false,
    "workbench.colorTheme": "Relax Coding Dark",
    "workbench.iconTheme": "material-icon-theme",
    "material-icon-theme.hidesExplorerArrows": true,
    "explorer.confirmDragAndDrop": false,
    "editor.overtypeCursorStyle": "line",
    "terminal.integrated.cursorStyle": "line",
    "editor.stickyScroll.enabled": false,
    "geminicodeassist.project": "vivid-compass-t2hmx",
    "claudeCode.preferredLocation": "panel",
    "security.workspace.trust.untrustedFiles": "open",
    "editor.minimap.size": "fit",
    "editor.fontFamily": "Fira Code Retina",
    "editor.fontLigatures": true,
    "editor.lineHeight": 20,
    "editor.minimap.renderCharacters": false,
    "workbench.secondarySideBar.defaultVisibility": "hidden",
    "workbench.colorCustomizations": {
        "[Relax Coding Dark]": {
            "editor.background": "#1e1e1e",
            "editorGutter.background": "#1e1e1e",
            "minimap.background": "#1e1e1e",
            "editor.foreground": "#7fc6c6",
            "sideBar.background": "#1e1e1e",
            "editor.lineHighlightBackground": "#2c2c2c",
            "editorLineNumber.foreground": "#5a5a5a",
            "editorLineNumber.activeForeground": "#7fc6c6",
            "tab.activeBackground": "#2c2c2c",
            "tab.inactiveBackground": "#1e1e1e",
            "tab.activeBorderTop": "#55d3f6",
            "tab.activeForeground": "#55d3f6",
            "tab.inactiveForeground": "#5a5a5a"
        }
    },
    "editor.tokenColorCustomizations": {
        "[Relax Coding Dark]": {
            "comments": "#6a735b",
            "functions": "#fbad60",
            "keywords": "#cc7bf4",
            "strings": "#9be351",
            "variables": "#ec7717",
            "numbers": "#a3b08d",
            "textMateRules": [
                {
                    "scope": [
                        "punctuation",
                        "keyword.operator",
                        "meta.brace",
                        "punctuation.definition.parameters",
                        "punctuation.definition.block",
                        "punctuation.definition.tag",
                        "meta.tag.punctuation.angle-bracket"
                    ],
                    "settings": {
                        "foreground": "#666666"
                    }
                },
                {
                    "name": "JSX/React Components",
                    "scope": [
                        "entity.name.tag",
                        "support.class.component",
                        "entity.name.type.class",
                        "meta.tag.js",
                        "meta.tag.tsx",
                        "meta.tag.xml"
                    ],
                    "settings": {
                        "foreground": "#ec7717"
                    }
                },
                {
                    "name": "TS Primitive Types",
                    "scope": [
                        "support.type.primitive",
                        "keyword.type"
                    ],
                    "settings": {
                        "foreground": "#fa7bfc"  // color for string, number, null, boolean
                    }
                },
                {
                    "name": "TS Type Names",
                    "scope": [
                        "entity.name.type",
                        "entity.name.type.alias"
                    ],
                    "settings": {
                        "foreground": "#43fcf3"  // color for Company, User, etc.
                    }
                }
            ]
        }
    },
    
}