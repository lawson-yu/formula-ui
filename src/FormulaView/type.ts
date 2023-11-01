export type FormulaData = {
  type: 'operator' | 'number' | 'device' | 'source' | 'special_source';
  value?: string | number | null;
  fieldId?: string | number | null;
  sourceId?: string | number | null;
  sourceCodeList?: string[];
  secondInfo?: string;
  otherInfo?: string;
  specialCalculationDTOList?: FormulaData[] | null;
};
