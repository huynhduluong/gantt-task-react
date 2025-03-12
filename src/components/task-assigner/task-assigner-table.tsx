import React from "react";
import styles from "./task-assigner-table.module.css";
import { Task } from "../../types/public-types";


export const TaskAssignerTableDefault: React.FC<{
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
  fontSize
}) => {

    return (
      <div
        className={styles.taskAssignerWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map(t => {
          return (
            <div
              className={styles.taskAssignerTableRow}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              <div
                className={styles.taskAssignerCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={t.assignerName}
              >
                <div className={styles.taskAssignerNameWrapper}>
                  <div>{t.assignerName}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
