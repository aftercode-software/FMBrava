export function getWeekdayIntervals16h(
  start: string,
  end: string,
  diasSemana: string[]
) {
  const intervals: { start: Date; end: Date }[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diasMap: { [key: string]: number } = {
    lunes: 0,
    martes: 1,
    miércoles: 2,
    miercoles: 2,
    jueves: 3,
    viernes: 4,
    sábado: 5,
    sabado: 5,
    domingo: 6,
  };
  const diasNumbers = diasSemana
    .map((dia) => diasMap[dia.toLowerCase()])
    .filter((n) => n !== undefined);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (diasNumbers.includes(day)) {
      const intervalStart = new Date(d);
      intervalStart.setHours(16, 0, 0, 0);
      const intervalEnd = new Date(intervalStart);
      intervalEnd.setSeconds(59, 999);
      if (intervalStart >= startDate && intervalStart <= endDate) {
        intervals.push({
          start: new Date(intervalStart),
          end: new Date(intervalEnd),
        });
      }
    }
  }
  return intervals;
}

export function getSpecificDayInterval16h(date: string) {
  const d = new Date(date);
  const intervalStart = new Date(d);
  intervalStart.setHours(16, 0, 0, 0);
  const intervalEnd = new Date(intervalStart);
  intervalEnd.setSeconds(59, 999);
  return { start: intervalStart, end: intervalEnd };
}

export function getStartEndDay(diasSemana: string[]) {
  const diasMap: Record<string, number> = {
    lunes: 0,
    martes: 1,
    miércoles: 2,
    miercoles: 2,
    jueves: 3,
    viernes: 4,
    sábado: 5,
    sabado: 5,
    domingo: 6,
  };
  const diasReverseMap: Record<number, string> = {
    0: "lunes",
    1: "martes",
    2: "miércoles",
    3: "jueves",
    4: "viernes",
    5: "sábado",
    6: "domingo",
  };
  const diasNumbers = diasSemana
    .map((dia) => diasMap[dia.toLowerCase()])
    .filter((n): n is number => n !== undefined)
    .sort((a, b) => a - b);

  if (diasNumbers.length === 0) {
    return { start: undefined, end: undefined };
  }

  if (diasNumbers.length === 1) {
    return diasReverseMap[diasNumbers[0]];
  }

  return {
    start: diasReverseMap[diasNumbers[0]],
    end: diasReverseMap[diasNumbers[diasNumbers.length - 1]],
  };
}

export function getStartEndHours(
  horarioInicio: string,
  horarioFin: string
): { start: string; end: string } {
  const start = new Date(horarioInicio);
  const end = new Date(horarioFin);
  return {
    start: start.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    }),
    end: end.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    }),
  };
}

export function nowInAR() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Argentina/Buenos_Aires",
    })
  );
}

export function minsOfDay(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}
export function minsOfDayFromISO(
  iso: string,
  tz = "America/Argentina/Buenos_Aires"
) {
  const base = new Date(iso);
  const inTz = new Date(base.toLocaleString("en-US", { timeZone: tz }));
  return minsOfDay(inTz);
}
