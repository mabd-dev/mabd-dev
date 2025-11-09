const releaseHistoryLocation = '/projects/habitsss/resources/release-history.json'

const createReleaseCardDiv = (release) => {
    const releaseHeader = createReleaseHeaderDiv(release)
    const releaseNotes = createReleaseNotesDiv(release)

    const releaseCard = document.createElement('div')
    releaseCard.className = 'release-card'
    releaseCard.appendChild(releaseHeader)
    releaseCard.appendChild(releaseNotes)

    return releaseCard
}

const createReleaseHeaderDiv = (release) => {
    const releaseVersion = document.createElement('div')
    releaseVersion.className = 'release-version'
    releaseVersion.innerHTML = release['versionNumber']

    const releaseDate = document.createElement('div')
    releaseDate.className = 'release-date'
    releaseDate.innerHTML = 'Released: ' + release['releaseDate']

    const releaseHeader = document.createElement('div')
    releaseHeader.className = 'release-header'
    releaseHeader.appendChild(releaseVersion)
    releaseHeader.appendChild(releaseDate)

    return releaseHeader
}

const createReleaseNotesDiv = (release) => {
    const releaseNotes = document.createElement('div')
    releaseNotes.className = 'release-notes'

    for (let i = 0; i < release['notes'].length; i++) {
        const note = release['notes'][i]

        const headerDiv = document.createElement('h3')
        headerDiv.innerHTML = note['header']
        releaseNotes.appendChild(headerDiv)

        const ul = createReleaseNoteUl(note)
        releaseNotes.appendChild(ul)

    }
    return releaseNotes
}

const createReleaseNoteUl = (note) => {
    const ul = document.createElement('ul')
    for (let i = 0; i < note['changes'].length; i++) {
        const change = note['changes'][i]
        const changeDiv = document.createElement('li')
        changeDiv.innerHTML = change

        ul.appendChild(changeDiv)
    }
    return ul
}

const createDetailedDownloadButton = (apkSize, version) => {
    const div = document.createElement('div')
    div.className = 'detailed-download-btn-container'
    div.style = 'margin-top: 15px;'
    div.innerHTML = `
        <div class="detailed-download-btn downloadBtn">
            <div class="detailed-download-btn-content flex items-center justify">
                <i class="fas fa-download"></i>
                <div>
                ${ version == '' || version == undefined ? '' : `<div class="text-sm">Download Latest Version ${version}</div>` }
                    <div class="text-lg">APK (${apkSize})</div>
                </div>
            </div>
        </div>
    `
    return div
}
