import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../apis'
import { FormInput, FormPassword } from '../../components'
import { END_POINTS } from '../../constants'
import { RegisterPayload } from '../../models'
import { useAuthStore } from '../../stores'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const formMethods = useForm<RegisterPayload>()
  const { login } = useAuthStore()
  const { handleSubmit } = formMethods

  const { mutate, isLoading } = useRegisterMutation({
    onSuccess: login,
  })

  const handleRegister = handleSubmit(data => {
    mutate(data)
  })

  return (
    <>
      <span className="text-center text-5xl font-semibold">Register</span>
      <FormProvider {...formMethods}>
        <Form
          layout="vertical"
          size="middle"
          className="flex flex-col"
          onFinish={handleRegister}
        >
          <FormInput
            name="email"
            label="Email"
            inputProps={{ required: true, readOnly: isLoading }}
          />
          <FormInput
            name="name"
            label="Name"
            inputProps={{ required: true, readOnly: isLoading }}
          />
          <FormPassword
            name="password"
            label="Password"
            inputProps={{ required: true, readOnly: isLoading }}
          />
          <span
            className="text-blue-500 cursor-pointer text-center underline"
            onClick={() =>
              navigate(`/${END_POINTS.AUTH.MASTER}/${END_POINTS.AUTH.LOGIN}`)
            }
          >
            Login
          </span>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Register
          </Button>
        </Form>
      </FormProvider>
    </>
  )
}
