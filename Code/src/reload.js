// Remove color blindness filters and restore normal vision
function removeColorFilters() {
    // Remove any existing color blindness filters
    var existingStyle = document.querySelector('style[data-colorblind]');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Remove the SVG filters
    var blockColorblindContent = document.getElementById("blockColorblindContent");
    if (blockColorblindContent) {
        blockColorblindContent.remove();
    }
    
    // Reset any CSS filters on html element
    document.documentElement.style.filter = 'none';
    document.documentElement.style.webkitFilter = 'none';
    document.documentElement.style.mozFilter = 'none';
    document.documentElement.style.oFilter = 'none';
    document.documentElement.style.msFilter = 'none';
}

// Execute the function
removeColorFilters();