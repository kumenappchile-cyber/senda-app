export type FieldBase = {
  id: string;
  label: string;
  help?: string;
};

export type TextField = FieldBase & {
  type: "text";
  multiline?: boolean;
  placeholder?: string;
};

export type NumberField = FieldBase & {
  type: "number";
  placeholder?: string;
};

export type CheckboxField = FieldBase & {
  type: "checkbox";
};

export type SelectField = FieldBase & {
  type: "select";
  options: { value: string; label: string }[];
};

export type TableField = FieldBase & {
  type: "table";
  columns: { key: string; label: string; type: "text" | "number" }[];
  rows: { id: string; label: string }[];
};

export type ValuesSelectField = FieldBase & {
  type: "values_select";
  max: number;
  options: string[];
};

export type Field =
  | TextField
  | NumberField
  | CheckboxField
  | SelectField
  | TableField
  | ValuesSelectField;

export type Screen = {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
};

export type Exercise = {
  id: string;
  moduleId: string;
  blockId: string;
  title: string;
  subtitle?: string;
  screens: Screen[];
};

export type Block = {
  id: string;
  moduleId: string;
  title: string;
  subtitle?: string;
  exerciseIds: string[];
};

export type Module = {
  id: string;
  title: string;
  subtitle?: string;
  blockIds: string[];
};

export type Program = {
  modules: Module[];
  blocks: Block[];
  exercises: Exercise[];
};
