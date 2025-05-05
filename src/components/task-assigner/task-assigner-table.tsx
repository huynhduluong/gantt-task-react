import React from "react";
import styles from "./task-assigner-table.module.css";
import { Task } from "../../types/public-types";


export const TaskAssignerTableDefault: React.FC<{
  isCountTaskByAssigner: boolean;
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  isCountTaskByAssigner,
}) => {

    return (
      <div
        className={styles.taskAssignerWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map((t, index) => {
          return (
            <div
              className={styles.taskAssignerTableRow}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              <div
                className={`${styles.taskAssignerCell} ${t.assignerId !== tasks[index + 1]?.assignerId ? styles.taskAssignerBorder : ""}`}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                  marginLeft: "10px",
                }}
                title={t.assignerName}
              >
                <div className={styles.taskAssignerNameWrapper}>
                  <div>{t.assignerName} {isCountTaskByAssigner ? "(" + tasks.filter(a => a.assignerId === t.assignerId).length + ")" : ""}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
