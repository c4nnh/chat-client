import { FormItemProps, Select, SelectProps } from 'antd'
import { ControllerProps } from 'react-hook-form'
import { ControlledFormItem } from './ControlledFormItem'

export type SelectOption = {
  value: string
  label: string | React.ReactNode
}

type Props = {
  name: string
  options: SelectOption[]
  label?: string
  formItemProps?: FormItemProps
  selectProps?: SelectProps
  infiniteScroll?: {
    hasNextPage?: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
  }
} & Omit<ControllerProps, 'render'>

export const FormSelect: React.FC<Props> = ({
  selectProps,
  options,
  infiniteScroll,
  ...rest
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (infiniteScroll && infiniteScroll.hasNextPage) {
      const { hasNextPage, fetchNextPage } = infiniteScroll
      const target = e.target as HTMLDivElement
      const { scrollTop, offsetHeight, scrollHeight } = target
      const bottom = Math.ceil(scrollTop + offsetHeight) === scrollHeight
      if (bottom && hasNextPage) {
        fetchNextPage()
      }
    }
  }

  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <Select
          {...{ value, onChange, onBlur }}
          {...selectProps}
          onPopupScroll={handleScroll}
        >
          {options
            .filter(
              (item, index, self) =>
                index === self.findIndex(i => i.value === item.value)
            )
            .map(item => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
        </Select>
      )}
    />
  )
}
