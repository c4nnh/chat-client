import { FormItemProps, Input, InputProps } from 'antd'
import React from 'react'
import { ControllerProps } from 'react-hook-form'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string
  formItemProps?: FormItemProps
  inputProps?: InputProps
} & Omit<ControllerProps, 'render'>

export const FormInput: React.FC<Props> = ({ inputProps, ...rest }) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <Input allowClear {...{ value, onChange, onBlur }} {...inputProps} />
      )}
    />
  )
}
