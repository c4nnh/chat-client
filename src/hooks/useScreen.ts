import { useMediaQuery } from 'react-responsive'

const SCREEN_WIDTH = {
  mobile: 450,
  desktop: 1000,
}

export const useScreen = () => {
  const isMobileScreen = useMediaQuery({ maxWidth: SCREEN_WIDTH.mobile })
  const isDesktopScreen = useMediaQuery({ maxWidth: SCREEN_WIDTH.desktop })

  return {
    isMobileScreen,
    isDesktopScreen,
  }
}
