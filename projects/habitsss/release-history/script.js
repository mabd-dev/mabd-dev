
const generateReleaseNotes = () => {
    const releasesDiv = document.getElementById('releases')
    if (releasesDiv == null) {
        console.warn("could not find 'releases' element")
        return
    }

    const footerCallToActionDiv = document.getElementById('footerCallToAction')
    const latestReleaseDownloadBtnDiv = document.getElementById('latestReleaseDownloadBtnDiv')

    fetch(releaseHistoryLocation)
        .then(response => response.json())
        .then(data => {
            const history = data['releases']
            for (let i = 0; i < history.length; i++) {
                const releaseCard = createReleaseCardDiv(history[i])
                releasesDiv.appendChild(releaseCard)

            }

            const latestHistory = history[0]
            const downloadButtonWithVersion = createDetailedDownloadButton(latestHistory['apkSize'], latestHistory['versionNumber'])
            footerCallToActionDiv.appendChild(downloadButtonWithVersion)

            const downloadButtonWithVersion2 = createDetailedDownloadButton(latestHistory['apkSize'], latestHistory['versionNumber'])
            latestReleaseDownloadBtnDiv.appendChild(downloadButtonWithVersion2)

            handleDownloadBtn()
        })
}

generateReleaseNotes()