import { Button, Form, Input } from 'antd';

import Card from 'components/core-ui/card/card';

import { ISignInForm } from './core/_models';
import useSignIn from './core/hooks/use-sign-in';

function SignIn() {
  const { isPendingLogin, loginMutate } = useSignIn();

  const onFinish = (values: ISignInForm) => {
    loginMutate(values);
  };

  return (
    <div
      className='relative flex min-h-lvh items-center justify-center overflow-hidden bg-white px-4'
      // style={{
      //   background:
      //     'radial-gradient(60% 50% at 20% 20%, rgb(246, 208, 255) 0%, rgba(246, 208, 255, 0) 60%), radial-gradient(60% 50% at 90% 90%, rgb(246, 208, 255) 0%, rgba(246, 208, 255, 0) 60%), rgb(255, 255, 255)',
      // }}
    >
      {/* Soft brand-tinted gradient blobs */}
      <div className='pointer-events-none absolute -left-10 -top-20 h-128 w-128 rounded-full bg-primary/10 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-20 -right-10 h-128 w-128 rounded-full bg-primary/10 blur-3xl' />
      <div className='relative z-10 flex w-full max-w-sm flex-col items-center'>
        {/* Logo (same as sidebar) */}
        <div className='mb-10'>
          <img src='/images/main-logo-dark.svg' alt='Logo' className='h-14 w-auto' />
        </div>

        {/* Login card */}
        <Card className='p-[clamp(16px,2vw,28px)]'>
          <div className='mb-8 flex flex-col items-center gap-2 text-center'>
            <h1 className='text-3xl md:text-[28px] font-semibold text-text-primary mb-3 '>Welcome Back</h1>
            <p className='text-sm! text-text-secondary max-w-112.5'>
              Manage sales agents, vendors, and regional operations from your admin dashboard.
            </p>
          </div>

          <Form
            layout='vertical'
            initialValues={{ email: '', password: '' }}
            onFinish={onFinish}
            requiredMark
            className='space-y-6!'
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <Input type='email' placeholder='Enter your email' className='h-11! rounded-lg bg-background!' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input.Password
                // classNames={{
                //   suffix: 'absolute right-2 top-3.25',
                //   root: 'relative px-0 rounded-lg!',
                //   input: 'px-2.75 py-3 rounded-lg',
                // }}
                placeholder='Enter your password'
                className='h-11! py-0 rounded-lg bg-background!'
              />
            </Form.Item>

            <Button
              loading={isPendingLogin}
              type='primary'
              htmlType='submit'
              block
              className='mt-2 h-11! rounded-lg text-base font-semibold'
            >
              Login
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
