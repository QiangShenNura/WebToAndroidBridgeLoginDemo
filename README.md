# Web to Android Bridge Login Demo

This project is a frontend demo that simulates user login and sends a JSON string to Android native code through a JavaScript bridge:

```javascript
window.AndroidBridge.onJSLoginResult(jsonString)
```

## Features

- Simulated login form with credential validation (`username` and `password` must not be empty).
- Input fields for all properties in the target Kotlin model:
  - `userId`
  - `age`
  - `heightInCm`
  - `weightInKg`
  - `gender` (0 for female, 1 for male)
- Payload serialized with `JSON.stringify(...)` before calling native code.
- Browser fallback message when `window.AndroidBridge` is not available.
- Outgoing JSON preview area for demo visibility.

## Payload Contract

The page sends this JSON shape to Android:

```json
{
  "userId": "U10001",
  "age": 28,
  "heightInCm": 175,
  "weightInKg": 68,
  "gender": 1
}
```

Notes:
- Numeric fields fallback to `-1` when empty or invalid.
- Values are passed as a **string** argument to the native bridge method.

## Quick Start

1. Clone the repository.
2. Open `index.html` in a browser to test the UI behavior.
3. (Optional) Serve via a local static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Configure Your MMA By Nuralogix Support

### 1) Change MMA Flow to `qrCodeLogin`
### 2) Setup QR Code Login URL with your website url
