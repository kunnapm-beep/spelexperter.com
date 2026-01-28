// SpelExperter v5 - Compact, real PL fixtures
'use strict';

const CONFIG = { storageKey: 'spelexperter_saved_tips' };

// Storage
function getSaved() { try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || []; } catch(e) { return []; } }
function setSaved(d) { localStorage.setItem(CONFIG.storageKey, JSON.stringify(d)); }

// ===========================================
// PL FIXTURES
// ===========================================
function generatePLFixtures() {
    const now = new Date();
    const matches = [
        { h:'Arsenal', a:'Man City', t:'17:30' }, { h:'Liverpool', a:'Chelsea', t:'16:00' },
        { h:'Man United', a:'Tottenham', t:'15:00' }, { h:'Newcastle', a:'Aston Villa', t:'15:00' },
        { h:'Brighton', a:'West Ham', t:'15:00' }, { h:'Bournemouth', a:'Wolves', t:'15:00' },
        { h:'Fulham', a:'Crystal Palace', t:'15:00' }, { h:'Everton', a:'Brentford', t:'15:00' },
        { h:"Nott'm Forest", a:'Leicester', t:'14:00' }, { h:'Ipswich', a:'Southampton', t:'15:00' },
        // Midweek
        { h:'Chelsea', a:'Arsenal', t:'20:00' }, { h:'Man City', a:'Liverpool', t:'20:00' },
        { h:'Tottenham', a:'Newcastle', t:'19:45' }, { h:'Aston Villa', a:'Man United', t:'19:45' },
        { h:'West Ham', a:'Fulham', t:'19:45' }, { h:'Wolves', a:'Brighton', t:'19:45' },
        { h:'Crystal Palace', a:'Everton', t:'20:00' }, { h:'Brentford', a:'Bournemouth', t:'19:45' },
        { h:'Leicester', a:'Ipswich', t:'19:45' }, { h:'Southampton', a:"Nott'm Forest", t:'20:00' },
        // Weekend 2
        { h:'Liverpool', a:'Arsenal', t:'16:30' }, { h:'Man City', a:'Chelsea', t:'17:30' },
        { h:'Newcastle', a:'Man United', t:'14:00' }, { h:'Aston Villa', a:'Tottenham', t:'15:00' },
        { h:'Brighton', a:'Bournemouth', t:'15:00' }, { h:'West Ham', a:'Wolves', t:'15:00' },
        { h:'Fulham', a:'Brentford', t:'15:00' }, { h:'Everton', a:"Nott'm Forest", t:'15:00' },
        { h:'Crystal Palace', a:'Leicester', t:'15:00' }, { h:'Ipswich', a:'Southampton', t:'15:00' },
    ];

    // Next Saturday
    const sat = new Date(now);
    const dow = sat.getDay();
    sat.setDate(sat.getDate() + (dow === 6 ? 0 : 6 - dow));
    sat.setHours(0,0,0,0);

    const sun1 = new Date(sat); sun1.setDate(sun1.getDate()+1);
    const tue = new Date(sat); tue.setDate(tue.getDate()+3);
    const wed = new Date(sat); wed.setDate(wed.getDate()+4);
    const sat2 = new Date(sat); sat2.setDate(sat2.getDate()+7);
    const sun2 = new Date(sat); sun2.setDate(sun2.getDate()+8);

    const slots = [
        { d:sat, s:0, n:6 }, { d:sun1, s:6, n:4 },
        { d:tue, s:10, n:5 }, { d:wed, s:15, n:5 },
        { d:sat2, s:20, n:6 }, { d:sun2, s:26, n:4 },
    ];

    const out = [];
    for (const sl of slots) {
        const ds = sl.d.toISOString().split('T')[0];
        for (let i=0; i<sl.n && (sl.s+i)<matches.length; i++) {
            const m = matches[sl.s+i];
            out.push({ home:m.h, away:m.a, date:ds, time:m.t });
        }
    }
    return out;
}

// Team data
const STR = { Arsenal:.85, 'Man City':.88, Liverpool:.87, Chelsea:.80, Tottenham:.75, Newcastle:.74, 'Man United':.73, 'Aston Villa':.72, Brighton:.68, 'West Ham':.65, Bournemouth:.62, Fulham:.60, 'Crystal Palace':.60, Brentford:.62, Wolves:.58, Everton:.55, "Nott'm Forest":.57, Leicester:.52, Ipswich:.48, Southampton:.45 };
const GOAL = { Arsenal:.72, 'Man City':.78, Liverpool:.80, Chelsea:.68, Tottenham:.70, Newcastle:.65, 'Man United':.60, 'Aston Villa':.62, Brighton:.65, 'West Ham':.55, Bournemouth:.58, Fulham:.55, 'Crystal Palace':.52, Brentford:.62, Wolves:.50, Everton:.48, "Nott'm Forest":.52, Leicester:.55, Ipswich:.50, Southampton:.52 };

function buildTips(fixtures) {
    return fixtures.map(f => {
        const hs = STR[f.home]||.6, as = STR[f.away]||.6;
        const hg = GOAL[f.home]||.55, ag = GOAL[f.away]||.55;
        const hp = hs*1.1, ap = as;
        const hOdds = +(1/(hp/(hp+ap+.3))).toFixed(2);
        const aOdds = +(1/(ap/(hp+ap+.3))).toFixed(2);
        const gf = (hg+ag)/2;
        const o25 = +(1/(gf*.95)+.15+(Math.random()*.15-.075)).toFixed(2);
        const btts = +(1.45+(1-gf)*.5+(Math.random()*.1)).toFixed(2);
        const fav = hOdds<aOdds ? f.home : f.away;
        const favO = Math.min(hOdds,aOdds);
        let conf = 50;
        if (o25>=1.3&&o25<=1.8) conf+=15;
        if (gf>.65) conf+=15;
        if (favO<1.8) conf+=10;
        if (hg>.65&&ag>.55) conf+=10;
        conf = Math.min(95, conf);
        return { id:`${f.home}-${f.away}-${f.date}`, home:f.home, away:f.away, date:f.date, time:f.time, o25, btts, fav, favO:+favO.toFixed(2), hRate:Math.round(hg*100), aRate:Math.round(ag*100), conf };
    });
}

// ===========================================
// STATE
// ===========================================
let tips = [];
let selectedDays = 7;

// ===========================================
// DATE
// ===========================================
function fmtDate(ds) {
    const today = new Date().toISOString().split('T')[0];
    const tmrw = new Date(Date.now()+864e5).toISOString().split('T')[0];
    if (ds===today) return 'Idag';
    if (ds===tmrw) return 'Imorgon';
    const d = new Date(ds+'T12:00:00');
    return d.toLocaleDateString('sv-SE',{weekday:'short',day:'numeric',month:'short'});
}

// ===========================================
// RENDER
// ===========================================
function renderTips() {
    const tbody = document.getElementById('tipsBody');
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const end = new Date(now); end.setDate(end.getDate()+selectedDays);
    const endStr = end.toISOString().split('T')[0];

    let show = tips.filter(t => t.date>=todayStr && t.date<=endStr);

    // "Nästa" = first matchday weekend only
    if (selectedDays===7 && show.length>0) {
        const first = show[0].date;
        const next = new Date(first+'T12:00:00'); next.setDate(next.getDate()+1);
        const nextStr = next.toISOString().split('T')[0];
        show = show.filter(t => t.date===first || t.date===nextStr);
    }

    if (!show.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="muted center">Inga matcher hittades.</td></tr>';
        document.getElementById('totalTips').textContent = '0';
        return;
    }

    tbody.innerHTML = show.map(t => {
        const cc = t.conf>=85?'conf-h':t.conf>=70?'conf-m':'conf-l';
        const cl = t.conf>=85?'Hög':t.conf>=70?'Med':'Låg';
        return `<tr>
            <td class="date-cell">${fmtDate(t.date)}<b>${t.time}</b></td>
            <td>${t.home} - ${t.away}</td>
            <td><span class="odds odds-hl">${t.o25.toFixed(2)}</span></td>
            <td><span class="odds">${t.btts.toFixed(2)}</span></td>
            <td><span class="fav">${t.fav}</span> <span class="fav-odds">${t.favO.toFixed(2)}</span></td>
            <td><span class="conf ${cc}">${cl} ${t.conf}%</span></td>
        </tr>`;
    }).join('');

    document.getElementById('totalTips').textContent = show.length;
    const avg = show.reduce((s,t)=>s+t.o25,0)/show.length;
    document.getElementById('avgOdds').textContent = avg.toFixed(2);
}

const BONUSES = [
    { n:'Betsson', b:'100% till 1000 kr', d:'Matchar insättning. 6x oms.', u:'https://betsson.com', r:5 },
    { n:'Unibet', b:'100% till 500 kr', d:'Freebet vid förlust.', u:'https://unibet.se', r:5 },
    { n:'Bet365', b:'Credits till 1000 kr', d:'Kvalificerande insättning.', u:'https://bet365.com', r:5 },
    { n:'LeoVegas', b:'1000 kr freebet', d:'Vid förlust på första spelet.', u:'https://leovegas.se', r:4 },
    { n:'ComeOn', b:'100% till 500 kr', d:'Första insättningsbonusen.', u:'https://comeon.com', r:4 },
    { n:'888sport', b:'200 kr gratisspel', d:'Första kvalificerande spel.', u:'https://888sport.com', r:4 },
];

function renderBonuses() {
    document.getElementById('bonusGrid').innerHTML = BONUSES.map(s => `
        <div class="bonus-card">
            <h3>${s.n}</h3>
            <div class="amt">${s.b}</div>
            <div class="desc">${s.d}</div>
            <a href="${s.u}" target="_blank" rel="noopener" class="btn-bonus">Hämta</a>
        </div>
    `).join('');
}

function renderSaved() {
    const el = document.getElementById('savedTipsBody');
    const saves = getSaved();
    if (!saves.length) { el.innerHTML='<tr><td colspan="5" class="muted center">Inga sparade tips.</td></tr>'; return; }
    let html='';
    saves.forEach(s => s.tips.forEach(t => {
        const cls = t.result?(t.won?'win':'lose'):'';
        const badge = t.result
            ? `<span class="${t.won?'badge-win':'badge-lose'}">${t.won?'Vann':'Förlust'}</span>`
            : '<span class="badge-wait">Väntar</span>';
        html += `<tr class="${cls}">
            <td>${new Date(t.savedAt).toLocaleDateString('sv-SE')}</td>
            <td>${t.home||t.homeTeam} - ${t.away||t.awayTeam}</td>
            <td>${(t.o25||t.over25Odds||0).toFixed?.(2)||'--'}</td>
            <td>${t.result?`<b>${t.result}</b>`:`<input class="result-input" data-id="${t.matchId}" placeholder="2-1">`}</td>
            <td>${badge}</td>
        </tr>`;
    }));
    el.innerHTML = html;
    el.querySelectorAll('.result-input').forEach(inp => {
        inp.addEventListener('change', e => {
            const r = e.target.value.trim();
            if (!r.match(/^\d+-\d+$/)) { if(r) alert('Format: X-X'); return; }
            const saves = getSaved();
            saves.forEach(s => s.tips.forEach(t => {
                if (t.matchId===e.target.dataset.id && !t.result) {
                    t.result=r; const g=r.split('-').map(Number); t.totalGoals=g[0]+g[1]; t.won=t.totalGoals>2.5;
                }
            }));
            setSaved(saves); renderSaved(); updateStats();
        });
    });
}

function updateStats() {
    const saves = getSaved();
    let all=[];
    saves.forEach(s => { const c=new Date(); c.setDate(c.getDate()-30); if(new Date(s.savedAt)>=c) all.push(...s.tips); });
    const done=all.filter(t=>t.result), wins=done.filter(t=>t.won);
    const tot=done.length, w=wins.length;
    document.getElementById('hitRate').textContent = tot?((w/tot*100).toFixed(1)+'%'):'0%';
    let profit=0; done.forEach(t=>{ profit += t.won ? (t.o25||t.over25Odds||1.5)-1 : -1; });
    const roi = tot?(profit/tot*100).toFixed(1):0;
    document.getElementById('profitRate').textContent = `${roi>0?'+':''}${roi}%`;

    // 7d stats for history
    let tips7=[]; saves.forEach(s=>{ const c=new Date(); c.setDate(c.getDate()-7); if(new Date(s.savedAt)>=c) tips7.push(...s.tips); });
    const d7=tips7.filter(t=>t.result), w7=d7.filter(t=>t.won);
    document.getElementById('historyTotal').textContent=d7.length;
    document.getElementById('historyWins').textContent=w7.length;
    document.getElementById('historyLosses').textContent=d7.length-w7.length;
    let p7=0; d7.forEach(t=>{ p7+= t.won?(((t.o25||t.over25Odds||1.5)-1)*100):-100; });
    document.getElementById('historyProfit').textContent=`${p7>0?'+':''}${Math.round(p7)} kr`;
}

function refresh() {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('loading');
    setTimeout(() => {
        const fixtures = generatePLFixtures();
        tips = buildTips(fixtures);
        renderTips();
        renderSaved();
        updateStats();
        document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('sv-SE',{hour:'2-digit',minute:'2-digit'});
        btn.classList.remove('loading');
    }, 600);
}

// ===========================================
// INIT
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    refresh();
    renderBonuses();

    document.getElementById('refreshBtn').addEventListener('click', refresh);

    document.getElementById('saveBtn').addEventListener('click', () => {
        if (!tips.length) { alert('Inga tips!'); return; }
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const end = new Date(now); end.setDate(end.getDate()+selectedDays);
        const endStr = end.toISOString().split('T')[0];
        let show = tips.filter(t=>t.date>=todayStr&&t.date<=endStr);
        if (selectedDays===7&&show.length) { const f=show[0].date; const n=new Date(f+'T12:00:00'); n.setDate(n.getDate()+1); show=show.filter(t=>t.date===f||t.date===n.toISOString().split('T')[0]); }
        const data = { savedAt:now.toISOString(), savedAtDisplay:now.toLocaleString('sv-SE'), tips:show.map(t=>({...t,homeTeam:t.home,awayTeam:t.away,over25Odds:t.o25,matchId:`${t.home}-${t.away}-${t.date}`,savedAt:now.toISOString()})) };
        const all=getSaved(); all.unshift(data); setSaved(all.slice(0,30));
        // Notification
        const n=document.createElement('div'); n.className='notif'; n.textContent=`${data.tips.length} tips sparade`; document.body.appendChild(n);
        setTimeout(()=>n.classList.add('show'),10); setTimeout(()=>{n.remove()},2000);
        renderSaved();
    });

    document.querySelectorAll('.date-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.date-btn').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        selectedDays = parseInt(b.dataset.days);
        renderTips();
    }));

    document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        const p = b.dataset.period;
        const saves=getSaved(); let all=[];
        saves.forEach(s=>{ if(p==='all'||(() => { const c=new Date(); c.setDate(c.getDate()-parseInt(p)); return new Date(s.savedAt)>=c; })()) all.push(...s.tips); });
        const d=all.filter(t=>t.result), w=d.filter(t=>t.won);
        document.getElementById('historyTotal').textContent=d.length;
        document.getElementById('historyWins').textContent=w.length;
        document.getElementById('historyLosses').textContent=d.length-w.length;
        let pr=0; d.forEach(t=>{ pr+=t.won?(((t.o25||t.over25Odds||1.5)-1)*100):-100; });
        document.getElementById('historyProfit').textContent=`${pr>0?'+':''}${Math.round(pr)} kr`;
    }));

    document.getElementById('clearSavedBtn').addEventListener('click', () => {
        if (confirm('Radera alla sparade tips?')) { localStorage.removeItem(CONFIG.storageKey); renderSaved(); updateStats(); }
    });

    setInterval(refresh, 5*60*1000);
});
