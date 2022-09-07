import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../apis'
import { FormInput, FormPassword } from '../../components'
import { END_POINTS } from '../../constants'
import { LoginPayload } from '../../models'
import { useAuthStore } from '../../stores'

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const formMethods = useForm<LoginPayload>()
  const { login } = useAuthStore()
  const { handleSubmit } = formMethods

  const { mutate } = useLoginMutation({
    onSuccess: login,
  })

  const handleLogin = handleSubmit(data => {
    mutate(data)
  })

  return (
    <>
      <span className="text-center text-5xl font-semibold">Login</span>
      <FormProvider {...formMethods}>
        <Form
          layout="vertical"
          size="middle"
          className="flex flex-col"
          onFinish={handleLogin}
        >
          <FormInput
            name="email"
            label="Email"
            inputProps={{ required: true }}
          />
          <FormPassword
            name="password"
            label="Password"
            inputProps={{ required: true }}
          />
          <span
            className="text-blue-500 cursor-pointer text-center underline"
            onClick={() =>
              navigate(`/${END_POINTS.AUTH.MASTER}/${END_POINTS.AUTH.REGISTER}`)
            }
          >
            Doesn't have account?
          </span>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </FormProvider>
    </>
  )
}
