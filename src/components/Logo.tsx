import logoImg from '../assets/logo.png'

const TokenSeaLogo = ({ size = 32 }: { size?: number }) => (
  <img
    src={logoImg}
    alt="TokenSea logo"
    width={size}
    height={size}
    className="h-auto object-contain"
    style={{ width: size }}
  />
)

export default TokenSeaLogo
