import twilio from 'twilio';

let twilioClient;

export const initWhatsAppService = () => {
  twilioClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
};

export const generarEnlaceWhatsApp = (telefono, mensaje) => {
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${telefono.replace('+', '')}?text=${mensajeCodificado}`;
};

export const sendWhatsAppMessage = async (to, body) => {
  if (!twilioClient) initWhatsAppService();
  return twilioClient.messages.create({
    body,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
    to: `whatsapp:${to}`
  });
};
