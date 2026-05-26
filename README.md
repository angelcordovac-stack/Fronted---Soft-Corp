# SoftCorp Frontend (Grupo 14)

Angular 21 (standalone) + Bootstrap + JWT.

## Setup

```bash
npm install
npm start
```

App en http://localhost:4200

## Configuracion

El frontend espera el backend en `http://localhost:8080`. Si lo subiste a otro
lado, edita `src/app/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  url: 'http://localhost:8080',
};
```

## Cambios principales vs version anterior

### Nuevo / corregido en esta version

1. ✅ **Header global con login/logout reactivo.** El boton "Iniciar sesion"
   esta en la barra principal. Cuando hay sesion activa, se transforma en
   "Mi panel" + avatar con nombre + boton "Salir".

2. ✅ **Home con carrusel SoftCorp** estilo profe, pero con contenido del caso
   (4 escenas), 6 pasos del flujo, funcionalidades, CTA y testimonios.

3. ✅ **Nuevo modulo "Crear Incidencia"** dentro de Gestion de Incidencias
   (boton "+ Nueva Incidencia" en la cabecera).

4. ✅ **Modal de asignacion con dropdown de tecnicos** (en lugar del `prompt()`
   feo). Llama al endpoint `/api/tecnicos/disponibles`.

5. ✅ **Modal para marcar como solucionada con tipo de solucion**
   (antes mandaba un body vacio, ahora pide la descripcion).

6. ✅ **AuthService corregido** para mapear `password` a `passwordHash`
   (asi lo recibe la entity del backend).

7. ✅ **UsuarioService corregido** para mandar el campo `passwordHash` al backend
   en las altas/actualizaciones. El backend hashea con BCrypt.

8. ✅ **Limpieza:** se eliminaron servicios y modelos no usados (PersonaService,
   UbigeoService, TipoDocumentoService, etc.) y el componente RegistrarPersona
   que duplicaba a MantenimientoUsuarios.

### Lo que ya estaba bien (y se mantiene)

- AuthGuard + RoleGuard para proteger rutas por rol.
- HTTP Interceptor que adjunta el Bearer token automaticamente.
- Sidebar dinamico segun rol del usuario.
- CRUD de usuarios con modales (alta, edicion, eliminacion).
- ToastService para notificaciones.

## Usuarios de prueba

Antes de poder loguearte, hay que crear al menos un usuario en el backend.
El backend ahora **hashea las passwords con BCrypt**, asi que las passwords
viejas en texto plano ya no funcionan.

Ver el README del backend para el paso a paso de migracion.

## Estructura

```
src/app/
├── components/
│   ├── header/                       ← NUEVO: con login y user info reactivos
│   ├── footer/                       ← rediseñado
│   ├── home/                         ← NUEVO: carrusel SoftCorp
│   ├── inicio-sesion/                ← ahora con header/footer
│   ├── dashboard/                    ← sidebar dinamico por rol
│   ├── gestion-incidencias/          ← + crear, asignar con dropdown, solucionar con form
│   ├── gestion-repuestos/
│   ├── gestion-mantenimiento/
│   │   └── mantenimiento-usuarios/   ← CRUD usuarios (rol JEFE)
│   └── toast-container/
├── services/
│   ├── auth.service.ts               ← mapea password → passwordHash
│   ├── session.service.ts
│   ├── incidencia.service.ts         ← crear, asignar, solucionar(tipoSolucion)
│   ├── repuesto.service.ts
│   ├── tecnico.service.ts            ← NUEVO
│   ├── usuario.service.ts
│   └── toast.service.ts
├── model/                            ← solo Incidencia y Repuesto
├── guards/
│   ├── auth.guard.ts
│   └── module.guard.ts               ← roleGuard(['JEFE',...])
├── interceptors/
│   └── auth.interceptor.ts
└── environments/
    └── environment.ts
```
