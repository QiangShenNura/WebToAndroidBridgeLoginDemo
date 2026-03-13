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

## Kotlin Model Reference

```kotlin
data class QRCodeLoginResult(
    val userId: String = "",
    val age: Int = DEFAULT_VALUE,
    val heightInCm: Int = DEFAULT_VALUE,
    val weightInKg: Int = DEFAULT_VALUE,
    val gender: Int = DEFAULT_VALUE, // 0 for female, 1 for male
)
```

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

## Android WebView Integration Example

### 1) Add JavaScript interface in Android

```kotlin
class AndroidBridge {
    @JavascriptInterface
    fun onJSLoginResult(resultJson: String) {
        Log.d("AndroidBridge", "Received from JS: $resultJson")
        // Parse JSON into QRCodeLoginResult if needed.
    }
}
```

### 2) Register the bridge in your WebView setup

```kotlin
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(AndroidBridge(), "AndroidBridge")
webView.loadUrl("file:///android_asset/index.html")
```

## Security Notes

- Only expose required `@JavascriptInterface` methods.
- Avoid loading untrusted pages when JavaScript bridge is enabled.
- Keep bridge APIs minimal and validate all incoming data on native side.
- Enable WebView debugging only in debug builds.

## Project Files

- `index.html`: Demo page structure and form fields.
- `style.css`: Responsive visual style.
- `script.js`: Validation, JSON serialization, and bridge invocation.
- `README.md`: Setup and integration documentation.
