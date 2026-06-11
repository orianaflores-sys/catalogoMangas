import { Helmet } from 'react-helmet-async'
import { getUser } from '../utils/auth'

function Perfil() {
  const user = getUser()

  return (
    <main>
      <Helmet>
        <title>Perfil | MangaVerse</title>
        <meta
          name="description"
          content="Perfil del usuario autenticado en MangaVerse."
        />
        <meta
          property="og:title"
          content="Perfil | MangaVerse"
        />
        <meta
          property="og:description"
          content="Información básica del usuario autenticado."
        />
      </Helmet>

      <section className="page-header">
        <h1>Perfil</h1>

        <p>
          Información del usuario que inició sesión en el sistema.
        </p>
      </section>

      <section className="profile-simple">
        <h2>Datos del usuario</h2>

        <p>
          <strong>Nombre:</strong> {user?.name}
        </p>

        <p>
          <strong>Usuario:</strong> {user?.username}
        </p>

        <p>
          <strong>Rol:</strong> {user?.role}
        </p>

        <p>
          <strong>Estado:</strong> Sesión activa
        </p>
      </section>

      <section className="profile-simple">
        <h2>Permisos</h2>

        {user?.role === 'Administrador' ? (
          <p>
            El administrador puede visualizar, registrar, editar y eliminar mangas
            dentro del catálogo local.
          </p>
        ) : (
          <p>
            El usuario puede visualizar y buscar mangas, pero no puede registrar,
            editar ni eliminar información.
          </p>
        )}
      </section>
    </main>
  )
}

export default Perfil