import {
  RegisterInput,
  IUseFormState,
  FormHandler,
} from '../types/useForm.types';

/**
 *@description useForm hook
 *@description This hook is used to manage the form state
 * @returns {{register, handleSubmit}} register and handleSubmit functions
 */
const useForm = () => {
  const formState: IUseFormState = {
    fields: [],
    formDatas: {},
    formHandler: null,
  };

  /**
   * @description Register a submit event where useForm will be called
   * @description This function will recover all value according to registered fields
   * @param event The submit event
   */
  document.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const { fields } = formState;

    fields.map((f) => {
      const formInput = document.getElementById(f);
      if (formInput) {
        formState.formDatas[f] =
          (<HTMLInputElement>document.getElementById(f))?.value || '';
      }
    });

    formState.formHandler && formState.formHandler(formState.formDatas);
  });

  /**
   * @description Register a fonction called submitting form
   * @param formHandler The function called when submitting form
   */
  const handleSubmit = (formHandler: FormHandler) => {
    formState.formHandler = formHandler;
  };

  /**
   * @description Register a field to the form
   * @description You will use returned object to set the id and name attributes
   * @param field string used in id and name attributes to recover value
   * @returns {id, name} object with id and name values
   */
  const register: RegisterInput = (field: string) => {
    const fieldIndex = formState.fields.findIndex((f) => f === field);

    if (fieldIndex === -1) formState.fields.push(field);

    return {
      id: field,
      name: field,
    };
  };

  return { handleSubmit, register };
};

export default useForm;
