
// Prayer Times Visualization using Chart.js

// Helper function to parse time from CSV format
function getHourAndMinute(text) {
    let d = text.split(" ")
    let signature = d[1]
    let time = d[0].split(":")
    let hour = parseInt(time[0])
    let minute = parseInt(time[1])

    if (signature == "pm" && hour != 12) {
        hour += 12
    } else if (signature == "am" && hour == 12) {
        hour = 0
    }

    return { hour: hour, minute: minute }
}

// Parse CSV data
async function parseCSV(text) {
    let lines = text.split('\n')
    lines.shift() // Remove header

    let result = { fajr: [], sunrise: [], dhuhr: [], asr: [], maghrib: [], ishaa: [] }

    lines
        .filter(line => line.trim())
        .forEach((line) => {
            let cols = line.split(',')

            result.fajr.push(getHourAndMinute(cols[2]))
            result.sunrise.push(getHourAndMinute(cols[3]))
            result.dhuhr.push(getHourAndMinute(cols[4]))
            result.asr.push(getHourAndMinute(cols[5]))
            result.maghrib.push(getHourAndMinute(cols[6]))
            result.ishaa.push(getHourAndMinute(cols[7]))
        })

    return result
}

// Load prayer times from CSV files
async function loadPrayerTimes() {
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    let empty = { fajr: [], sunrise: [], dhuhr: [], asr: [], maghrib: [], ishaa: [] }

    const promises = months.map(async (month) => {
        let monthStr = month < 10 ? `0${month}` : `${month}`
        try {
            let response = await fetch(`2025/${monthStr}.csv`)

            if (!response.ok) {
                return empty
            }

            let text = await response.text()
            return parseCSV(text)
        } catch (error) {
            console.error(`Error loading month ${monthStr}:`, error)
            return empty
        }
    })

    const monthsData = await Promise.all(promises)
    return monthsData.reduce((acc, month) => {
        acc.fajr.push(...month.fajr)
        acc.sunrise.push(...month.sunrise)
        acc.dhuhr.push(...month.dhuhr)
        acc.asr.push(...month.asr)
        acc.maghrib.push(...month.maghrib)
        acc.ishaa.push(...month.ishaa)
        return acc
    }, empty)
}

// Convert time object to decimal hours for plotting
function timeToDecimal(time) {
    return time.hour + time.minute / 60
}

// Generate month labels for x-axis
function generateMonthLabels(totalDays) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 2025 is not a leap year

    let labels = []
    let dayCounter = 0

    for (let i = 0; i < totalDays; i++) {
        labels.push('')
    }

    // Add month labels at the start of each month
    dayCounter = 0
    for (let month = 0; month < 12; month++) {
        if (dayCounter < totalDays) {
            labels[dayCounter] = monthNames[month]
        }
        dayCounter += daysInMonth[month]
    }

    return labels
}

// Format time for tooltip display
function formatTime(decimalHour) {
    const hour = Math.floor(decimalHour)
    const minute = Math.round((decimalHour - hour) * 60)
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const period = hour >= 12 ? 'PM' : 'AM'
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

// Calculate current day of year (0-indexed, where Jan 1 = 0)
function getCurrentDayOfYear() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay) - 1 // -1 to make it 0-indexed
}

// Create the chart
async function createPrayerTimesChart() {
    const prayers = await loadPrayerTimes()

    // Convert prayer times to decimal hours
    const datasets = [
        {
            label: 'Fajr',
            data: prayers.fajr.map(timeToDecimal),
            borderColor: '#1e3a8a',
            backgroundColor: '#1e3a8a',
            tension: 0.4,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            borderWidth: 2
        },
        {
            label: 'Dhuhr',
            data: prayers.dhuhr.map(timeToDecimal),
            borderColor: '#eab308',
            backgroundColor: '#eab308',
            tension: 0.4,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            borderWidth: 2
        },
        {
            label: 'Asr',
            data: prayers.asr.map(timeToDecimal),
            borderColor: '#f97316',
            backgroundColor: '#f97316',
            tension: 0.4,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            borderWidth: 2
        },
        {
            label: 'Maghrib',
            data: prayers.maghrib.map(timeToDecimal),
            borderColor: '#dc2626',
            backgroundColor: '#dc2626',
            tension: 0.4,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            borderWidth: 2
        },
        {
            label: 'Ishaa',
            data: prayers.ishaa.map(timeToDecimal),
            borderColor: '#7c3aed',
            backgroundColor: '#7c3aed',
            tension: 0.4,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            borderWidth: 2
        }
    ]

    const totalDays = prayers.fajr.length
    const labels = generateMonthLabels(totalDays)
    const currentDay = getCurrentDayOfYear()

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        todayLine: {
                            type: 'line',
                            xMin: currentDay,
                            xMax: currentDay,
                            borderColor: '#22c55e',
                            borderWidth: 3,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'Today',
                                position: 'start',
                                backgroundColor: '#22c55e',
                                color: '#ffffff',
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                    family: "'Helvetica Neue', 'Arial', sans-serif"
                                },
                                padding: 6,
                                borderRadius: 4
                            }
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Prayer Times Throughout the Year 2025',
                    color: '#ffffff',
                    font: {
                        size: 24,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Arial', sans-serif"
                    },
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14,
                            family: "'Helvetica Neue', 'Arial', sans-serif"
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#666',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatTime(context.parsed.y)
                        },
                        title: function(context) {
                            const dayIndex = context[0].dataIndex
                            return 'Day ' + (dayIndex + 1)
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#ffffff',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Arial', sans-serif"
                        }
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        },
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: true,
                        borderColor: '#ffffff'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time (Hour)',
                        color: '#ffffff',
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Arial', sans-serif"
                        }
                    },
                    min: 0,
                    max: 24,
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        },
                        stepSize: 1,
                        callback: function(value) {
                            if (value === 0) return '12 AM'
                            if (value === 12) return '12 PM'
                            if (value < 12) return value + ' AM'
                            return (value - 12) + ' PM'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: true,
                        borderColor: '#ffffff'
                    }
                }
            }
        }
    }

    // Get canvas element and create the chart
    const canvas = document.getElementById('canvas1')
    if (!canvas) {
        console.error('Canvas element not found')
        return
    }

    const context = canvas.getContext('2d')
    new Chart(context, config)
}

// Initialize the chart when the page loads
createPrayerTimesChart()

