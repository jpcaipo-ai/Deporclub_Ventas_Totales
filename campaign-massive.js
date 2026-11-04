(() => {
  const pipeline = [
    { label: "Comunicacion inicial", count: 738, cumulative: "100.00%", next: "18.83%", color: "#75c2f5" },
    { label: "Inicia secuencia", count: 139, cumulative: "18.83%", next: "57.55%", color: "#21c3df" },
    { label: "Respuesta", count: 80, cumulative: "10.84%", next: "93.75%", color: "#818cf8" },
    { label: "Lead caliente", count: 75, cumulative: "10.16%", next: "76.00%", color: "#a78bfa" },
    { label: "Pago", count: 57, cumulative: "7.72%", next: "100.00%", color: "#4f83fa" },
    { label: "Ganado", count: 57, cumulative: "7.72%", next: "S/ 88,768", color: "#22cde1" },
  ];
  const channelRows = [
    { channel: "WhatsApp", note: "24 inicial + 6 D3 + 1 uD", won: 31, value: 47578 },
    { channel: "CrossHero", note: "9 base + 3 D3", won: 12, value: 19780 },
    { channel: "Mailing", note: "12 base + 1 D3", won: 13, value: 19850 },
  ];
  const touchRows = [
    { channel: "WhatsApp", impact: "Inicial / secuencia", won: 24, wonValue: 36928 },
    { channel: "WhatsApp", impact: "D3 · segundo impacto", won: 6, wonValue: 9210 },
    { channel: "WhatsApp", impact: "uD · ultimo dia", won: 1, wonValue: 1440 },
    { channel: "CrossHero", impact: "D3 · segundo impacto", won: 3, wonValue: 4940 },
    { channel: "Mailing", impact: "D3 · segundo impacto", won: 1, wonValue: 1100 },
  ];
  const formatNumber = (value) => new Intl.NumberFormat("es-PE").format(value);
  const formatMoney = (value) => `S/ ${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(value)}`;
  const max = Math.max(...pipeline.map((row) => row.count));
  document.getElementById("massCampaignFunnel").innerHTML = pipeline.map((row) => `
    <div class="campaignFunnelRow">
      <strong>${row.label}</strong>
      <div class="campaignTrack" title="${formatNumber(row.count)} contactos"><i style="width:${row.count / max * 100}%;background:${row.color}"></i></div>
      <span class="campaignCount">${formatNumber(row.count)}</span>
      <span class="campaignRate">${row.cumulative} acumulado</span>
      <span class="campaignRate">${row.next}${row.label === "Ganado" ? " valor ganado" : " al siguiente paso"}</span>
    </div>`).join("");
  const channelTotals = channelRows.reduce((total, row) => ({
    won: total.won + row.won,
    value: total.value + row.value,
  }), { won: 0, value: 0 });
  document.getElementById("massCampaignChannels").innerHTML = channelRows.map((row) => `
    <tr><td><strong>${row.channel}</strong>${row.note ? `<small>${row.note}</small>` : ""}</td><td>${formatNumber(row.won)}</td><td>${formatMoney(row.value)}</td><td>${(row.value / channelTotals.value * 100).toFixed(1)}%</td></tr>`).join("");
  document.getElementById("massCampaignChannelsTotal").innerHTML = `<tr><td><strong>Total del corte</strong></td><td>${formatNumber(channelTotals.won)}</td><td>${formatMoney(channelTotals.value)}</td><td>100%</td></tr>`;
  document.getElementById("massCampaignTouches").innerHTML = touchRows.map((row) => `
    <tr><td><strong>${row.channel}</strong></td><td><span class="impactTag">${row.impact}</span></td><td>${formatNumber(row.won)}</td><td>${formatMoney(row.wonValue)}</td></tr>`).join("");
})();
