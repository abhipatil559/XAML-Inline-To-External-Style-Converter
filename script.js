// ---------------------------
document.getElementById('inputXaml').textContent = '';


document.getElementById('convertButton').addEventListener('click', function() {
    let inputXaml = document.getElementById('inputXaml').value.trim();

    // Check if there's a closing tag; if not, append a placeholder closing tag
    if (!inputXaml.endsWith('/>') && !inputXaml.includes('</')) {
        inputXaml += `</${inputXaml.match(/<(\w+)/)[1]}>`;
    }

    // Use a regular expression to extract the tag name and attributes
    const regex = /<(\w+)([^>]*?)(?:\s*\/>|>(.*?)<\/\1)/;
    const match = inputXaml.match(regex);

    
    
    if (match) {
        const tagName = match[1]; // e.g., TextBlock
        const attributesString = match[2].trim(); // e.g., Margin="5 5 5 5" FontSize="10" Background="Black"
        
        // Define a list of allowed style-related properties
       
        const allowedProperties = [
            'Background','Orientation','BorderBrush', 'BorderThickness', 'Color', 'Cursor', 
            'FontFamily', 'FontSize', 'FontStyle', 'FontWeight', 'Foreground', 
            'Height', 'HorizontalAlignment', 'Margin', 'MaxHeight', 'MaxWidth', 
            'MinHeight', 'MinWidth', 'Opacity', 'Padding', 'TextAlignment', 
            'TextDecorations', 'TextWrapping', 'VerticalAlignment', 'Width',
            'LineHeight', 'LineStackingStrategy', 'TextBlock.TextWrapping', 
            'TextBlock.FontSize', 'TextBlock.Foreground', 'TextBlock.FontWeight',
            // Add any other properties relevant to the controls you are targeting
        ];

        // Convert attributes string to an object using a regex to capture key-value pairs
        const attributes = {};
        const attributeRegex = /(\w+)="([^"]*)"/g;
        let attributeMatch;

        while ((attributeMatch = attributeRegex.exec(attributesString)) !== null) {
            const key = attributeMatch[1];
            const value = attributeMatch[2];

            // Only include attributes that are in the allowed properties list
            if (allowedProperties.includes(key)) {
                attributes[key] = value;
            }
        }

        // Generate the Style
        let styleOutput = `<Style x:Key="${tagName}Style" TargetType="${tagName}">\n`;
        for (const [property, value] of Object.entries(attributes)) {
            styleOutput += `    <Setter Property="${property}" Value="${value}"/>\n`;
        }
        styleOutput += `</Style>`;
        
        document.getElementById('outputStyle').textContent = styleOutput;
    } else {
        document.getElementById('outputStyle').textContent = 'Invalid XAML input.';
    }
});

