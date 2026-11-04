(() => {
  const pipeline = [
    { label: "Comunicacion inicial", count: 735, cumulative: "100.00%", next: "18.50%", color: "#75c2f5" },
    { label: "Inicia secuencia", count: 136, cumulative: "18.50%", next: "55.15%", color: "#21c3df" },
    { label: "Respuesta", count: 75, cumulative: "10.20%", next: "93.33%", color: "#818cf8" },
    { label: "Lead caliente", count: 70, cumulative: "9.52%", next: "72.86%", color: "#a78bfa" },
    { label: "Pago", count: 51, cumulative: "6.94%", next: "100.00%", color: "#4f83fa" },
    { label: "Ganado", count: 51, cumulative: "6.94%", next: "S/ 79,880", color: "#22cde1" },
  ];
  const channelRows = [
    { channel: "WhatsApp", note: "Campaña masiva sin sufijo", won: 14, value: 17893 },
    { channel: "CrossHero", note: "Incluye 2 D3", won: 10, value: 17060 },
    { channel: "Mailing", won: 13, value: 20310 },
  ];
  const touchRows = [
    { channel: "WhatsApp", impact: "Inicial / secuencia", won: 19, wonValue: 29960 },
    { channel: "WhatsApp", impact: "D3 · segundo impacto", won: 6, wonValue: 9210 },
    { channel: "WhatsApp", impact: "uD · ultimo dia", won: 1, wonValue: 1440 },
    { channel: "Mailing", impact: "D3 · segundo impacto", won: 2, wonValue: 2660 },
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
