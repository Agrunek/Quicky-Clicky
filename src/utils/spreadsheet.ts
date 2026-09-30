import type { StoreEntry } from '@/store/IndexedDB';

import ExcelJS from 'exceljs';

import { calculateStats } from '@/utils/collection';

export const downloadXlsx = async (data: StoreEntry[]) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'Quicky-Clicky';
  workbook.created = new Date();

  const gameIds = new Set(data.map((entry) => entry.gameid));

  gameIds.forEach((gameId) => {
    const entries = data.filter((entry) => entry.gameid === gameId);
    const worksheet = workbook.addWorksheet(gameId);

    worksheet.columns = [
      { header: 'ID', hidden: true, key: 'id' },
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'False starts', key: 'falseStart', width: 10 },
      { header: 'Mean time', key: 'meanTime', width: 10 },
      { header: 'Min time', key: 'minTime', width: 10 },
      { header: 'Max time', key: 'maxTime', width: 10 },
      { header: 'SD time', key: 'sdTime', width: 10 },
    ];

    if (entries[0].parent !== 'SimpleReaction') {
      worksheet.columns = [
        ...worksheet.columns,
        {},
        { header: 'Total time', key: 'totalTime', width: 10 },
        { header: 'Total errors', key: 'totalErrors', width: 10 },
        { header: 'Matches', key: 'matches', width: 15 },
        { header: 'M-Total time', key: 'matchTotalTime', width: 15 },
        { header: 'M-Total errors', key: 'matchTotalErrors', width: 15 },
        { header: 'No-matches', key: 'noMatches', width: 15 },
        { header: 'NM-Total time', key: 'noMatchTotalTime', width: 15 },
        { header: 'NM-Total errors', key: 'noMatchTotalErrors', width: 15 },
      ];
    }

    worksheet.getRow(1).eachCell((cell) => {
      cell.border = { bottom: { style: 'thick' } };
      cell.font = { bold: true };
    });

    entries.forEach((entry) => {
      const {
        falseStartCount,
        matchesCount,
        maxTime,
        meanTime,
        minTime,
        noMatchesCount,
        sdTime,
        totalErrors,
        totalMatchErrors,
        totalMatchTime,
        totalNoMatchErrors,
        totalNoMatchTime,
        totalTime,
      } = calculateStats(entry.attempt);

      worksheet.addRow({
        falseStart: falseStartCount,
        id: entry.uuid,
        matches: matchesCount,
        matchTotalErrors: totalMatchErrors,
        matchTotalTime: totalMatchTime,
        maxTime: maxTime,
        meanTime: meanTime,
        minTime: minTime,
        noMatches: noMatchesCount,
        noMatchTotalErrors: totalNoMatchErrors,
        noMatchTotalTime: totalNoMatchTime,
        sdTime: sdTime,
        timestamp: new Date(entry.timestamp).toLocaleString(),
        totalErrors: totalErrors,
        totalTime: totalTime,
      });
    });

    worksheet.eachRow((row) => row.eachCell((cell) => (cell.border = { ...cell.border, right: { style: 'thin' } })));
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'attempts.xlsx';

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
