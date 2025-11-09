const handleDownloadBtn = () => {
    document.querySelectorAll('.downloadBtn').forEach(button => {
        button.addEventListener('click', function() {
            // Replace with your actual APK download link
            const latestApkName = 'Habitsss-0.5.1.apk';
            const apkUrl = '/projects/habitsss/resources/download/' + latestApkName;
            
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = apkUrl;
            link.download = latestApkName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Track download event
            console.log('Download initiated for Habitsss APK');
        });
})
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
