export type FormHandler = (formData?: any) => void;

export type RegisterInput = (field: string) => { id: string; name: string };

export interface IUseFormState {
  fields: string[];
  formDatas: {
    [key: string]: string;
  };
  formHandler: FormHandler | null;
}
