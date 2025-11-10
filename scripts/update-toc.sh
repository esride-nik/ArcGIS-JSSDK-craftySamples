#!/bin/bash

# Get the root directory of the git repository
ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

# Create a temporary file for the new content
TMP_FILE=$(mktemp)

# Start of the HTML file
cat > "$TMP_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArcGIS JavaScript SDK Crafty Samples</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        h1 {
            color: #0079c1;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin: 1rem 0;
        }
        a {
            color: #3b8fc4;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        a:hover {
            background-color: #f0f0f0;
            color: #005e95;
        }
    </style>
</head>
<body>
    <main>
        <h1>ArcGIS JavaScript SDK Crafty Samples</h1>
        <ul>
EOF

# List directories and create links (excluding node_modules, .git, and scripts)
for dir in */; do
    if [[ "$dir" != "node_modules/" && "$dir" != ".git/" && "$dir" != "scripts/" ]]; then
        # Remove trailing slash
        dirname=${dir%/}
        # Create a human-readable title
        title=$(echo "$dirname" | sed -E 's/([A-Z])/ \1/g' | sed -E 's/^./\U&/g' | sed -E 's/_/ /g')
        echo "            <li><a href=\"$dir\" target="_blank">$title</a></li>" >> "$TMP_FILE"
    fi
done

# End of the HTML file
cat >> "$TMP_FILE" << 'EOF'
        </ul>
    </main>
</body>
</html>
EOF

# Update the index.html file
mv "$TMP_FILE" "index.html"
git add index.html