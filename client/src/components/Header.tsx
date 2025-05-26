import logo from '../assets/parrot.png'

export default function Header() {
  return (
      <header className="header">
        <img className="logo" src={logo} alt="Pollyglot Logo" />
        <div className="header-content">
          <h1 className="header-title">
            PollyGlot
          </h1>
          <p className="header-subtitle">
            Perfect Tranlation Every Time
          </p>
        </div>
      </header>
  )
}