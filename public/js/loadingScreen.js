document.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash');
    
    if (!sessionStorage.getItem("splashShown")) {
        splash.style.display = 'flex';
        splash.style.opacity = '1';
        
        sessionStorage.setItem("splashShown", "true");
        
        setTimeout(function() {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500);
        }, 1000);
    }
});