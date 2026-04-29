import { useState } from 'react';
import { z, ZodType } from 'zod';

type FormObject = object;

type FieldErrors<TValues extends FormObject> = Partial<Record<keyof TValues, string>>;

function mapZodErrors<TValues extends FormObject>(error: z.ZodError<TValues>) {
  const fieldErrors: FieldErrors<TValues> = {};

  error.issues.forEach((issue) => {
    const fieldName = issue.path[0] as keyof TValues | undefined;
    if (fieldName && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

export function useZodForm<TValues extends FormObject>(
  schema: ZodType<TValues>,
  initialValues: TValues,
) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<TValues>>({});
  const [submitting, setSubmitting] = useState(false);

  function setFieldValue<K extends keyof TValues>(field: K, value: TValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validate() {
    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return {
        success: true as const,
        data: result.data,
      };
    }

    setErrors(mapZodErrors(result.error));
    return {
      success: false as const,
      error: result.error,
    };
  }

  async function submit(handler: (data: TValues) => Promise<void>) {
    const result = validate();
    if (!result.success) {
      return false;
    }

    setSubmitting(true);
    try {
      await handler(result.data);
      return true;
    } finally {
      setSubmitting(false);
    }
  }

  return {
    values,
    errors,
    submitting,
    setFieldValue,
    validate,
    submit,
  };
}
