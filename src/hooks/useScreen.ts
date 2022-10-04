import { useMediaQuery } from 'react-responsive'
import { SCREEN_WIDTH } from '../constants'

export const useScreen = () => {
  const isMobileScreen = useMediaQuery({
    maxWidth: SCREEN_WIDTH.mobile,
  })
  const isDesktopScreen = useMediaQuery({ maxWidth: SCREEN_WIDTH.desktop })

  return {
    isMobileScreen,
    isDesktopScreen,
  }
}
