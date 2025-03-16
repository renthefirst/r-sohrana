'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { createAccount, signIn } from '@/lib/actions/user.actions';
import OtpModal from './OtpModal';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

type FormType = 'sign-in' | 'sign-up';

const authAuthSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === 'sign-up'
        ? z.string().min(2).max(50)
        : z.string().optional(),
    email: z.string().email(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountId, setAccountId] = useState(null);

  const formSchema = authAuthSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const user =
        type === 'sign-up'
          ? await createAccount({
              fullName: values.fullName || '',
              email: values.email,
            })
          : await signIn({ email: values.email });

      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage('Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === 'sign-in' ? 'Вход' : 'Регистрация'}
          </h1>

          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel>Имя</FormLabel>
                    <FormControl className="shad-form-label">
                      <Input
                        placeholder="Введите ваше имя"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel>Почта</FormLabel>
                  <FormControl className="shad-form-label">
                    <Input
                      placeholder="Введите вашу почту"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === 'sign-in' ? 'Войти' : 'Зарегистрироваться'}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === 'sign-in'
                ? "Нет аккаунта?"
                : 'Уже есть аккаунт?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="ml-1 font-medium text-brand"
            >
              {type === 'sign-in' ? 'Зарегистрироваться!' : 'Войти!'}
            </Link>
          </div>
        </form>
      </Form>


      {accountId && (
        <OtpModal email={form.getValues('email')} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
