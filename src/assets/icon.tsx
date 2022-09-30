import Icon from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

type IconProps = Partial<CustomIconComponentProps> &
  Pick<AntdIconProps, 'onClick'> & {
    stroke?: string
  }

export const AddMessageIcon: React.FC<IconProps> = ({ ...props }) => (
  <Icon
    component={() => (
      <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z" />
        <path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
      </svg>
    )}
    {...props}
  />
)

export const SendIcon: React.FC<IconProps> = ({ ...props }) => (
  <Icon
    component={() => (
      <svg fill="currentColor" width="24" height="24" viewBox="0 0 512 512">
        <title>Send</title>
        <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" />
      </svg>
    )}
    {...props}
  />
)

export const GameIcon: React.FC<IconProps> = ({ ...props }) => (
  <Icon
    component={() => (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke={props.stroke || '#000'}
          stroke-width="1.5"
          d="M12,6 L12,2 M12,6 C14.4983324,6.0444148 16.0056152,6 17,6 C19,6 21,6.5 22,10 C23,13.5 23,15.5 23,18 C23,20.5 21,21 19,21 C17,21 15.9456522,17 12,17 C8.05434783,17 7,21 5,21 C3,21 1,20.5 1,18 C1,15.5 1,13.5 2,10 C3,6.5 5,6 7,6 C7.99438477,6 9.50166757,6.0444148 12,6 L12,6 L12,6 Z M18,15 C18.5522847,15 19,14.5522847 19,14 C19,13.4477153 18.5522847,13 18,13 C17.4477153,13 17,13.4477153 17,14 C17,14.5522847 17.4477153,15 18,15 Z M14,12 C14.5522847,12 15,11.5522847 15,11 C15,10.4477153 14.5522847,10 14,10 C13.4477153,10 13,10.4477153 13,11 C13,11.5522847 13.4477153,12 14,12 Z M4,12 L10,12 M7,9 L7,15"
        />
      </svg>
    )}
    {...props}
  />
)
