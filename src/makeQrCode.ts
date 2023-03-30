import QRCode, {QRCodeToDataURLOptions} from "qrcode";

const DEFAULT_OPTIONS: QRCodeToDataURLOptions = {
  errorCorrectionLevel: "H",
  type: "image/webp",
  margin: 10,
  scale: 10,
  width: undefined,
  color: {
    light: undefined,
    dark: undefined,
  },
  rendererOpts: {
    quality: 1,
  }
};

export default async function makeQrCode(text: string, options?: QRCodeToDataURLOptions) {
  try {
    return QRCode.toDataURL(text, {...DEFAULT_OPTIONS, ...options});
  } catch (err) {
    console.error(err);
    throw new Error("Oh no, your QR-code burned in the oven... maybe try again?");
  }
}
