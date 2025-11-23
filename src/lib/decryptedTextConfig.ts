/**
 * Configurazione globale per l'animazione DecryptedText
 * Modifica questi valori per cambiare la velocità dell'animazione ovunque
 */
export const DECRYPTED_TEXT_CONFIG = {
  speed: 70, // Velocità dell'animazione in millisecondi (più alto = più lento)
  maxIterations: 15, // Numero di iterazioni prima di rivelare il testo finale
  sequential: true, // Rivelare i caratteri uno per uno (true) o tutti insieme (false)
  revealDirection: 'start' as const, // Direzione: 'start' (sinistra->destra), 'end' (destra->sinistra), 'center'
} as const;

