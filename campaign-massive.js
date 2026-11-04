(() => {
  const pipeline = [
    { label: "Comunicacion inicial", count: 735, cumulative: "100.00%", next: "18.50%" },
    { label: "Inicia secuencia", count: 136, cumulative: "18.50%", next: "55.15%" },
    { label: "Respuesta", count: 75, cumulative: "10.20%", next: "93.33%" },
    { label: "Lead caliente", count: 70, cumulative: "9.52%", next: "72.86%" },
    { label: "Pago", count: 51, cumulative: "6.94%", next: "96.08%" },
    { label: "Ganado", count: 51, cumulative: "6.94%", next: "S/ 78,320" },
  ];
  const channelRows = [
    { channel: "WhatsApp", note: "Campaña masiva sin sufijo", contacts: 14, value: 17893, open: 0, openValue: 0, won: 14, wonValue: 17893 },
    { channel: "CrossHero", note: "Incluye 2 registros D3", contacts: 20, value: 17060, open: 10, openValue: 0, won: 10, wonValue: 17060 },
    { channel: "Mailing", contacts: 31, value: 20310, open: 18, openValue: 0, won: 13, wonValue: 20310 },
  ];
  const touchRows = [
    { channel: "WhatsApp", impact: "Inicial / secuencia", contacts: 651, value: 28400, open: 633, openValue: 0, won: 18, wonValue: 28400 },
    { channel: "WhatsApp", impact: "D3 · segundo impacto", contacts: 18, value: 9210, open: 13, openValue: 1560, won: 5, wonValue: 7650 },
    { channel: "WhatsApp", impact: "uD · ultimo dia", contacts: 10, value: 1440, open: 9, openValue: 0, won: 1, wonValue: 1440 },
    { channel: "Mailing", impact: "D3 · segundo impacto", contacts: 2, value: 2660, open: 0, openValue: 0, won: 2, wonValue: 2660 },
  ];
  const formatNumber = (value) => new Intl.NumberFormat("es-PE").format(value);
  const formatMoney = (value) => `S/ ${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(value)}`;
  const max = Math.max(...pipeline.map((row) => row.count));
  document.getElementById("massCampaignFunnel").innerHTML = pipeline.map((row) => `
    <div class="campaignFunnelRow">
      <strong>${row.label}</strong>
      <div class="campaignTrack" title="${formatNumber(row.count)} contactos"><i style="width:${row.count / max * 100}%"></i></div>
      <span class="campaignCount">${formatNumber(row.count)}</span>
      <span class="campaignRate">${row.cumulative} acumulado</span>
      <span class="campaignRate">${row.next}${row.label === "Ganado" ? " valor ganado" : " al siguiente paso"}</span>
    </div>`).join("");
  const channelTotals = channelRows.reduce((total, row) => ({
    contacts: total.contacts + row.contacts,
    value: total.value + row.value,
    open: total.open + row.open,
    openValue: total.openValue + row.openValue,
    won: total.won + row.won,
    wonValue: total.wonValue + row.wonValue,
  }), { contacts: 0, value: 0, open: 0, openValue: 0, won: 0, wonValue: 0 });
  document.getElementById("massCampaignChannels").innerHTML = channelRows.map((row) => `
    <tr><td><strong>${row.channel}</strong>${row.note ? `<small>${row.note}</small>` : ""}</td><td>${formatNumber(row.contacts)}</td><td>${formatMoney(row.value)}</td><td>${(row.value / channelTotals.value * 100).toFixed(1)}%</td><td>${formatNumber(row.open)}<small>${formatMoney(row.openValue)}</small></td><td>${formatNumber(row.won)}<small>${formatMoney(row.wonValue)}</small></td></tr>`).join("");
  document.getElementById("massCampaignChannelsTotal").innerHTML = `<tr><td><strong>Total del corte</strong></td><td>${formatNumber(channelTotals.contacts)}</td><td>${formatMoney(channelTotals.value)}</td><td>100%</td><td>${formatNumber(channelTotals.open)}<small>${formatMoney(channelTotals.openValue)}</small></td><td>${formatNumber(channelTotals.won)}<small>${formatMoney(channelTotals.wonValue)}</small></td></tr>`;
  document.getElementById("massCampaignTouches").innerHTML = touchRows.map((row) => `
    <tr><td><strong>${row.channel}</strong></td><td><span class="impactTag">${row.impact}</span></td><td>${formatNumber(row.contacts)}</td><td>${formatMoney(row.value)}</td><td>${formatNumber(row.open)}<small>${formatMoney(row.openValue)}</small></td><td>${formatNumber(row.won)}<small>${formatMoney(row.wonValue)}</small></td></tr>`).join("");
})();
