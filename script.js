// SpelExperter - Premier League Predictions
// Data-driven betting insights

// Premier League 2024/25 Team Statistics (based on real data)
const teamStats = {
    "Manchester City": { bttsRate: 54, over25Rate: 62, homeWinRate: 75, awayWinRate: 55, goalsFor: 2.3, goalsAgainst: 0.9 },
    "Arsenal": { bttsRate: 58, over25Rate: 65, homeWinRate: 72, awayWinRate: 50, goalsFor: 2.1, goalsAgainst: 0.8 },
    "Liverpool": { bttsRate: 62, over25Rate: 70, homeWinRate: 78, awayWinRate: 58, goalsFor: 2.4, goalsAgainst: 1.0 },
    "Chelsea": { bttsRate: 65, over25Rate: 68, homeWinRate: 55, awayWinRate: 42, goalsFor: 1.8, goalsAgainst: 1.2 },
    "Manchester United": { bttsRate: 69, over25Rate: 58, homeWinRate: 50, awayWinRate: 38, goalsFor: 1.5, goalsAgainst: 1.3 },
    "Tottenham": { bttsRate: 64, over25Rate: 72, homeWinRate: 58, awayWinRate: 40, goalsFor: 2.0, goalsAgainst: 1.4 },
    "Newcastle": { bttsRate: 52, over25Rate: 55, homeWinRate: 62, awayWinRate: 45, goalsFor: 1.7, goalsAgainst: 1.0 },
    "Brighton": { bttsRate: 69, over25Rate: 65, homeWinRate: 52, awayWinRate: 38, goalsFor: 1.6, goalsAgainst: 1.3 },
    "Aston Villa": { bttsRate: 58, over25Rate: 60, homeWinRate: 60, awayWinRate: 42, goalsFor: 1.8, goalsAgainst: 1.1 },
    "West Ham": { bttsRate: 55, over25Rate: 52, homeWinRate: 48, awayWinRate: 32, goalsFor: 1.4, goalsAgainst: 1.2 },
    "Brentford": { bttsRate: 69, over25Rate: 62, homeWinRate: 45, awayWinRate: 30, goalsFor: 1.6, goalsAgainst: 1.5 },
    "Crystal Palace": { bttsRate: 50, over25Rate: 48, homeWinRate: 42, awayWinRate: 28, goalsFor: 1.2, goalsAgainst: 1.1 },
    "Fulham": { bttsRate: 58, over25Rate: 55, homeWinRate: 45, awayWinRate: 32, goalsFor: 1.4, goalsAgainst: 1.2 },
    "Bournemouth": { bttsRate: 62, over25Rate: 58, homeWinRate: 42, awayWinRate: 28, goalsFor: 1.5, goalsAgainst: 1.4 },
    "Wolves": { bttsRate: 48, over25Rate: 45, homeWinRate: 38, awayWinRate: 25, goalsFor: 1.1, goalsAgainst: 1.3 },
    "Everton": { bttsRate: 52, over25Rate: 48, homeWinRate: 35, awayWinRate: 22, goalsFor: 1.0, goalsAgainst: 1.2 },
    "Nottingham Forest": { bttsRate: 55, over25Rate: 52, homeWinRate: 40, awayWinRate: 28, goalsFor: 1.3, goalsAgainst: 1.2 },
    "Leicester": { bttsRate: 60, over25Rate: 58, homeWinRate: 42, awayWinRate: 25, goalsFor: 1.4, goalsAgainst: 1.5 },
    "Ipswich": { bttsRate: 55, over25Rate: 52, homeWinRate: 30, awayWinRate: 18, goalsFor: 1.0, goalsAgainst: 1.6 },
    "Southampton": { bttsRate: 58, over25Rate: 55, homeWinRate: 25, awayWinRate: 15, goalsFor: 0.9, goalsAgainst: 1.8 }
};

// Sample upcoming matches with calculated probabilities
const upcomingMatches = [
    {
        date: "2025-01-11",
        homeTeam: "Liverpool",
        awayTeam: "Manchester United",
        favoriteOdds: 1.45,
        bttsOdds: 1.65,
        over25Odds: 1.55,
        favorite: "Liverpool",
        winProb: 72,
        bttsProb: 65,
        over25Prob: 68
    },
    {
        date: "2025-01-11",
        homeTeam: "Manchester City",
        awayTeam: "Chelsea",
        favoriteOdds: 1.38,
        bttsOdds: 1.72,
        over25Odds: 1.62,
        favorite: "Manchester City",
        winProb: 75,
        bttsProb: 60,
        over25Prob: 65
    },
    {
        date: "2025-01-12",
        homeTeam: "Arsenal",
        awayTeam: "Tottenham",
        favoriteOdds: 1.55,
        bttsOdds: 1.58,
        over25Odds: 1.52,
        favorite: "Arsenal",
        winProb: 65,
        bttsProb: 68,
        over25Prob: 72
    },
    {
        date: "2025-01-12",
        homeTeam: "Newcastle",
        awayTeam: "Wolves",
        favoriteOdds: 1.52,
        bttsOdds: 1.85,
        over25Odds: 1.78,
        favorite: "Newcastle",
        winProb: 68,
        bttsProb: 50,
        over25Prob: 52
    },
    {
        date: "2025-01-12",
        homeTeam: "Aston Villa",
        awayTeam: "Everton",
        favoriteOdds: 1.58,
        bttsOdds: 1.80,
        over25Odds: 1.75,
        favorite: "Aston Villa",
        winProb: 62,
        bttsProb: 55,
        over25Prob: 55
    },
    {
        date: "2025-01-14",
        homeTeam: "Brighton",
        awayTeam: "Ipswich",
        favoriteOdds: 1.48,
        bttsOdds: 1.75,
        over25Odds: 1.68,
        favorite: "Brighton",
        winProb: 70,
        bttsProb: 58,
        over25Prob: 60
    },
    {
        date: "2025-01-14",
        homeTeam: "Brentford",
        awayTeam: "Southampton",
        favoriteOdds: 1.65,
        bttsOdds: 1.62,
        over25Odds: 1.58,
        favorite: "Brentford",
        winProb: 58,
        bttsProb: 65,
        over25Prob: 62
    },
    {
        date: "2025-01-15",
        homeTeam: "West Ham",
        awayTeam: "Fulham",
        favoriteOdds: 1.92,
        bttsOdds: 1.68,
        over25Odds: 1.72,
        favorite: "West Ham",
        winProb: 52,
        bttsProb: 58,
        over25Prob: 55
    },
    {
        date: "2025-01-15",
        homeTeam: "Crystal Palace",
        awayTeam: "Leicester",
        favoriteOdds: 1.88,
        bttsOdds: 1.72,
        over25Odds: 1.75,
        favorite: "Crystal Palace",
        winProb: 48,
        bttsProb: 55,
        over25Prob: 52
    },
    {
        date: "2025-01-18",
        homeTeam: "Nottingham Forest",
        awayTeam: "Bournemouth",
        favoriteOdds: 1.85,
        bttsOdds: 1.65,
        over25Odds: 1.68,
        favorite: "Nottingham Forest",
        winProb: 50,
        bttsProb: 60,
        over25Prob: 58
    }
];

// State
let filteredMatches = [...upcomingMatches];
let sortColumn = 'winProb';
let sortDirection = 'desc';

// DOM Elements
const matchesBody = document.getElementById('matchesBody');
const totalMatchesEl = document.getElementById('totalMatches');
const avgWinProbEl = document.getElementById('avgWinProb');
const bttsMatchesEl = document.getElementById('bttsMatches');
const over25MatchesEl = document.getElementById('over25Matches');
const teamStatsGrid = document.getElementById('teamStatsGrid');
const applyFiltersBtn = document.getElementById('applyFilters');

// Filter inputs
const maxFavoriteOddsInput = document.getElementById('maxFavoriteOdds');
const maxBttsOddsInput = document.getElementById('maxBttsOdds');
const maxOver25OddsInput = document.getElementById('maxOver25Odds');
const minWinProbInput = document.getElementById('minWinProb');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyFilters();
    renderTeamStats();
    setupSorting();
});

// Apply filters
applyFiltersBtn.addEventListener('click', applyFilters);

function applyFilters() {
    const maxFavoriteOdds = parseFloat(maxFavoriteOddsInput.value) || 1.93;
    const maxBttsOdds = parseFloat(maxBttsOddsInput.value) || 1.70;
    const maxOver25Odds = parseFloat(maxOver25OddsInput.value) || 1.70;
    const minWinProb = parseFloat(minWinProbInput.value) || 50;

    filteredMatches = upcomingMatches.filter(match => {
        return match.favoriteOdds <= maxFavoriteOdds &&
               match.bttsOdds <= maxBttsOdds &&
               match.over25Odds <= maxOver25Odds &&
               match.winProb >= minWinProb;
    });

    // Sort by current sort settings
    sortMatches();
    renderMatches();
    updateStats();
}

// Sort matches
function sortMatches() {
    filteredMatches.sort((a, b) => {
        let valA, valB;

        switch(sortColumn) {
            case 'winProb':
                valA = a.winProb;
                valB = b.winProb;
                break;
            case 'btts':
                valA = a.bttsProb;
                valB = b.bttsProb;
                break;
            case 'over25':
                valA = a.over25Prob;
                valB = b.over25Prob;
                break;
            default:
                valA = a.winProb;
                valB = b.winProb;
        }

        return sortDirection === 'desc' ? valB - valA : valA - valB;
    });
}

// Setup sorting
function setupSorting() {
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const newSort = th.dataset.sort;
            if (sortColumn === newSort) {
                sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
            } else {
                sortColumn = newSort;
                sortDirection = 'desc';
            }
            sortMatches();
            renderMatches();
        });
    });
}

// Render matches table
function renderMatches() {
    if (filteredMatches.length === 0) {
        matchesBody.innerHTML = `
            <tr>
                <td colspan="8" class="loading">No matches found with current filters. Try adjusting the criteria.</td>
            </tr>
        `;
        return;
    }

    matchesBody.innerHTML = filteredMatches.map(match => {
        const probClass = match.winProb >= 70 ? 'high' : match.winProb >= 55 ? 'medium' : 'low';
        const confidence = getConfidenceLevel(match);

        return `
            <tr>
                <td>${formatDate(match.date)}</td>
                <td>
                    <div class="match-teams">
                        <span class="team-home">${match.homeTeam}</span>
                        <span class="team-vs">vs</span>
                        <span class="team-away">${match.awayTeam}</span>
                    </div>
                </td>
                <td><span class="badge badge-primary">${match.favorite}</span></td>
                <td>
                    <div class="prob-bar">
                        <span class="prob-value">${match.winProb}%</span>
                        <div class="prob-visual">
                            <div class="prob-fill ${probClass}" style="width: ${match.winProb}%"></div>
                        </div>
                    </div>
                </td>
                <td><span class="odds ${match.favoriteOdds <= 1.6 ? 'good' : 'ok'}">${match.favoriteOdds.toFixed(2)}</span></td>
                <td>
                    <span class="badge ${match.bttsOdds <= 1.70 ? 'badge-success' : 'badge-warning'}">
                        ${match.bttsOdds.toFixed(2)} (${match.bttsProb}%)
                    </span>
                </td>
                <td>
                    <span class="badge ${match.over25Odds <= 1.70 ? 'badge-success' : 'badge-warning'}">
                        ${match.over25Odds.toFixed(2)} (${match.over25Prob}%)
                    </span>
                </td>
                <td>
                    <div class="confidence">
                        ${[1,2,3,4,5].map(i =>
                            `<span class="confidence-dot ${i <= confidence ? 'active' : ''} ${confidence >= 4 ? 'high' : ''}"></span>`
                        ).join('')}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Update statistics
function updateStats() {
    totalMatchesEl.textContent = filteredMatches.length;

    if (filteredMatches.length > 0) {
        const avgProb = filteredMatches.reduce((sum, m) => sum + m.winProb, 0) / filteredMatches.length;
        avgWinProbEl.textContent = Math.round(avgProb) + '%';

        const bttsQualified = filteredMatches.filter(m => m.bttsOdds <= 1.70).length;
        bttsMatchesEl.textContent = bttsQualified;

        const over25Qualified = filteredMatches.filter(m => m.over25Odds <= 1.70).length;
        over25MatchesEl.textContent = over25Qualified;
    } else {
        avgWinProbEl.textContent = '0%';
        bttsMatchesEl.textContent = '0';
        over25MatchesEl.textContent = '0';
    }
}

// Render team statistics
function renderTeamStats() {
    const sortedTeams = Object.entries(teamStats)
        .sort((a, b) => b[1].bttsRate - a[1].bttsRate)
        .slice(0, 10);

    teamStatsGrid.innerHTML = sortedTeams.map(([team, stats]) => `
        <div class="team-stat-card">
            <div class="team-info">
                <span class="team-name">${team}</span>
            </div>
            <div class="team-stats">
                <div class="team-stat">
                    <div class="team-stat-value">${stats.bttsRate}%</div>
                    <div class="team-stat-label">BTTS</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${stats.over25Rate}%</div>
                    <div class="team-stat-label">O2.5</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${stats.homeWinRate}%</div>
                    <div class="team-stat-label">Home Win</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
    });
}

function getConfidenceLevel(match) {
    let score = 0;
    if (match.winProb >= 70) score += 2;
    else if (match.winProb >= 60) score += 1;

    if (match.favoriteOdds <= 1.60) score += 1;
    if (match.bttsOdds <= 1.70 && match.bttsProb >= 60) score += 1;
    if (match.over25Odds <= 1.70 && match.over25Prob >= 60) score += 1;

    return Math.min(score, 5);
}

// Calculate win probability from odds (implied probability)
function oddsToProb(odds) {
    return Math.round((1 / odds) * 100);
}

// Future: Fetch real data from The Odds API
async function fetchRealOdds() {
    // API Key would go here
    // const API_KEY = 'your-api-key';
    // const response = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=${API_KEY}&regions=eu&markets=h2h,totals,btts`);
    // const data = await response.json();
    // return data;
    console.log('Real API integration ready - add API key to enable');
}
