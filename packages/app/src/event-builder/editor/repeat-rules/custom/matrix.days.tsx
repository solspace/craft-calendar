import { Control } from "@cal/components/controls/control";
import clsx from "clsx";
import type { FC } from "react";
import { DayMatrixWrapper, MatrixButton, MatrixPlaceholder } from "./custom.styles";

type Props = {
  label: string;
  values: number[];
  onChange: (values: number[]) => void;
};

export const DayMatrix: FC<Props> = ({ label, values, onChange }) => {
  return (
    <Control label={label}>
      <DayMatrixWrapper>
        {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
          <MatrixButton
            key={day}
            type="button"
            className={clsx(values.includes(day) && "active")}
            onClick={() => {
              let updated = values.filter((value) => value !== day);
              if (!values.includes(day)) {
                updated = [...updated, day];
              }

              if (updated.length === 0) {
                return;
              }

              updated.sort((a, b) => a - b);
              onChange(updated);
            }}
          >
            {day}
          </MatrixButton>
        ))}

        {Array.from({ length: 4 }, (_, index) => index + 1).map((extraDay) => (
          <MatrixPlaceholder key={extraDay} />
        ))}
      </DayMatrixWrapper>
    </Control>
  );
};
