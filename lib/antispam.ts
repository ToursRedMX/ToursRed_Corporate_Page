export function verifyAntiSpam(data: {
  _hp?: string;
}): { success: boolean; error?: string } {
  if (data._hp && data._hp.trim().length > 0) {
    return { success: false, error: 'Verificación de seguridad fallida' };
  }

  return { success: true };
}
