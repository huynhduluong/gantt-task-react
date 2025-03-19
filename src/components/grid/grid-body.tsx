import React, { ReactChild } from "react";
import { Task } from "../../types/public-types";
import { addToDate } from "../../helpers/date-helper";
import styles from "./grid.module.css";

export type GridBodyProps = {
  tasks: Task[];
  dates: Date[];
  svgWidth: number;
  rowHeight: number;
  columnWidth: number;
  todayColumnWidth: number;
  todayColor: string;
  weekendColor: string;
  rtl: boolean;
  hideTicks: boolean;
  hideRowLines: boolean;
  hideWeekends: boolean;
  hideAssignerTicks: boolean;
};
export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  todayColumnWidth,
  todayColor,
  rtl,
  hideRowLines,
  hideTicks,
  hideWeekends,
  weekendColor,
  hideAssignerTicks,
}) => {
  let y = 0;
  const gridRows: ReactChild[] = [];
  const weekends: ReactChild[] = [];
  const assignerTicks: ReactChild[] = [];
  const rowLines: ReactChild[] = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ];
  for (let j = 0; j < tasks.length; j++) {
    const task = tasks[j];
    gridRows.push(
      <rect
        key={"Row" + task.id}
        x="0"
        y={y}
        width={svgWidth}
        height={rowHeight}
        className={styles.gridRow}
      />
    );
    rowLines.push(
      <line
        key={"RowLine" + task.id}
        x="0"
        y1={y + rowHeight}
        x2={svgWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    );
    if (task?.assignerId !== tasks[j + 1]?.assignerId)
      assignerTicks.push(
        <line
          key={"AssignerTick" + task.id}
          x="0"
          y1={y + rowHeight}
          x2={svgWidth}
          y2={y + rowHeight}
          className={styles.gridRowLine}
        />
      )
    y += rowHeight;
  }

  const now = new Date();
  let tickX = 0;
  const ticks: ReactChild[] = [];
  let today: ReactChild = <rect />;
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    ticks.push(
      <line
        key={date.getTime()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    );
    if (
      (i + 1 !== dates.length &&
        date.getTime() < now.getTime() &&
        dates[i + 1].getTime() >= now.getTime()) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        date.getTime() < now.getTime() &&
        addToDate(
          date,
          date.getTime() - dates[i - 1].getTime(),
          "millisecond"
        ).getTime() >= now.getTime())
    ) {
      today = (
        <rect
          x={todayColumnWidth ? (columnWidth - todayColumnWidth) / 2 + tickX : tickX}
          y={0}
          width={todayColumnWidth ? todayColumnWidth : columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    // rtl for today
    if (
      rtl &&
      i + 1 !== dates.length &&
      date.getTime() >= now.getTime() &&
      dates[i + 1].getTime() < now.getTime()
    ) {
      today = (
        <rect
          x={tickX + columnWidth}
          y={0}
          width={todayColumnWidth ? todayColumnWidth : columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    if (date.getDay() === 5 || date.getDay() === 6) {
      weekends.push(
        <rect
          key={"weekend" + date.getTime()}
          x={tickX + columnWidth}
          y={0}
          width={columnWidth}
          height={y}
          fill={weekendColor}
        />
      );
    }
    tickX += columnWidth;
  }
  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      {!hideRowLines && <g className="rowLines">{rowLines}</g>}
      {!hideTicks && <g className="ticks">{ticks}</g>}
      {!hideWeekends && <g className="weekend">{weekends}</g>}
      {!hideAssignerTicks && <g className="assignerTicks">{assignerTicks}</g>}
      <g className="today">{today}</g>
    </g>
  );
};
