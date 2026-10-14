/*
# Cerrar el acceso público (anon / authenticated) al esquema corporate

## Por qué
Las migraciones anteriores dejaron que cualquiera con la llave pública (anon)
pudiera INSERTAR en las 11 tablas de formularios y actualizar columnas. Esa llave
es pública (el marketplace la incluye en su frontend), así que cualquiera podía
escribir directo en la base saltándose los límites de /api (límite de peticiones,
tamaño, longitud de campos), llenándola de basura.

## Por qué es seguro cerrarlo
- Producción usa SUPABASE_SERVICE_ROLE_KEY (variable definida en Netlify solo para
  Production). El rol service_role tiene todos los permisos sobre corporate y
  salta RLS, así que el servidor sigue guardando igual.
- Evidencia de que Producción ya usa la llave de servicio: el servidor inserta con
  `.select('id')`; anon no tiene política de lectura, así que no podría leer su
  propia fila, y los registros existentes tienen email_status actualizado.
- Ninguna página del sitio escribe en estas tablas desde el navegador: todo pasa
  por /api/*.

## Qué hace
1. Elimina las políticas abiertas de INSERT y UPDATE (22 en total).
2. Quita todos los permisos de anon y authenticated sobre las tablas de corporate
   (incluidos los permisos por columna) y el USAGE del esquema.
3. Evita que tablas futuras en corporate hereden permisos para esos roles.
RLS sigue activado en las 11 tablas: sin políticas, el acceso queda denegado.
No se modifica ningún dato ni el esquema public (marketplace).

## Efecto en los deploy previews de Netlify
SUPABASE_SERVICE_ROLE_KEY solo existe en Production. En previews el servidor cae a
la llave pública y, tras esta migración, no podrá guardar en la base: el error se
registra en logs y el correo se envía igual (las rutas no abortan por ese error).

## Cómo revertir
-- GRANT USAGE ON SCHEMA corporate TO anon, authenticated;
-- GRANT INSERT ON ALL TABLES IN SCHEMA corporate TO anon, authenticated;
-- (y recrear las políticas con `CREATE POLICY ... FOR INSERT TO anon, authenticated
--  WITH CHECK (true)` si se quisiera el comportamiento anterior; no se recomienda)
*/

DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'corporate'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                   pol.policyname, pol.schemaname, pol.tablename);
  END LOOP;
END $$;

REVOKE ALL ON ALL TABLES IN SCHEMA corporate FROM anon, authenticated;
REVOKE USAGE ON SCHEMA corporate FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA corporate REVOKE ALL ON TABLES FROM anon, authenticated;
