import { z } from 'zod';
import { TFunction } from 'i18next'; 

export const getLoginSchema = (t: TFunction) => {
  return z.object({
    emailOrPhone: z
      .string()
      .min(1, { message: t('login.errors.emailOrPhone_required') }), 
    passWord: z
      .string()
      .min(8, { message: t('login.errors.password_required') }) 
      .regex(/[A-Z]/, { message: t('login.errors.password_uppercase') }) 
      .regex(/[a-z]/, { message: t('login.errors.password_lowercase') }) 
      .regex(/[0-9]/, { message: t('login.errors.password_number') }) 
      .regex(/[\W_]/, { message: t('login.errors.password_special') }), 
    rememberMe: z.boolean().optional(), 
  });
};

export type LoginSchemaType = z.infer<ReturnType<typeof getLoginSchema>>;
