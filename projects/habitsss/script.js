
const generateLatestReleaseNotes = () => {
    const releasesDiv = document.getElementById('latest-release')
    if (releasesDiv == null) {
        console.warn("could not find 'latest-release' element")
        return
    }

    // const detailed 
    const footerCallToActionDiv =  document.getElementById('footerCallToAction')


    fetch(releaseHistoryLocation)
        .then(response => response.json())
        .then(data => {
            const history = data['releases'][0]
            const releaseCard = createReleaseCardDiv(history)

            const downloadButton = createDetailedDownloadButton(history['apkSize'])
            releaseCard.appendChild(downloadButton)

            const downloadButtonWithVersion = createDetailedDownloadButton(history['apkSize'], history['versionNumber'])
            footerCallToActionDiv.appendChild(downloadButtonWithVersion)

            releasesDiv.appendChild(releaseCard)

            // this has to happen after buttons are added to DOM
            handleDownloadBtn()
        })
}

generateLatestReleaseNotes()





const faqs = [
    {
        q: "Why is Habitsss no longer on the Google Play Store?",
        a: "Due to issues verifying my physical address with Google, my developer account was removed — even though my identity was verified. I'm working to publish the app on other stores like F-Droid. Meanwhile, updates are available here on this site."
    },
    {
        q: "Where can I get the latest version of the app?",
        a: "You can download the latest APK directly from the official website: https://habitsss.app"
    },
    {
        q: "Will I still get app updates?",
        a: "Yes! The app has a built-in update checker. You'll be notified when a new version is available on the website."
    },
    {
        q: "Is the app free?",
        a: "Yes. Current app version (v0.4.1) has some features behind paywall, but they will be available for free in the next update."
    },
    {
        q: "Is my data private and secure?",
        a: "Yes, your data is private and secure. By default, it's stored only on your device. You can optionally enable cloud sync to securely back up your data on our servers."
    },
    {
        q: "Can I sync my data across devices?",
        a: "Yes, you can sync your data across devices by enabling cloud sync. This will keep your data up-to-date on all your Android devices."
    },
    {
        q: "What devices is the app compatible with?",
        a: "Currently, the app is available for Android phones and tablets. We're actively working on adding support for Android watches in the future. While we can't confirm support for web and iOS devices at this time, we appreciate your interest and will keep you updated on any developments."
    },
];

const faqContainer = document.getElementById('faqList');
faqs.forEach(faq => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `<h3>${faq.q}</h3><p>${faq.a}</p>`;
    faqContainer.appendChild(div);
});

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
    }
    }))
};
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(jsonLd);
document.head.appendChild(script);