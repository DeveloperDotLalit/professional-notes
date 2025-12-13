# Chapter 03: Security Hardening

## 1. Storage Encryption
`EncryptedSharedPreferences` uses the **Android Keystore System**.
- **Master Key**: Generated in the hardware-backed Trusted Execution Environment (TEE).
- **Process**:
    1.  App asks Keystore to sign/encrypt data.
    2.  Keystore stays locked. The App never sees the Private Key.
    3.  If the device is rooted, extracting the key is difficult/impossible depending on hardware support (StrongBox).

## 2. Network Security
- **Pinning**: Implementing `CertificatePinner` in OkHttp.
- **Cleartext**: Disabled by default (`usesCleartextTraffic=false`).
- **WebView**: A distinct attack vector. Always disable JavaScript (`setJavaScriptEnabled(false)`) if not needed. Use `WebViewAssetLoader` instead of `file://` URIs.

## 3. Tamper Detection
- **Signature Check**: At runtime, check if your APK is signed by *your* release key. If it's the debug key or a cracker's key, crash.
- **Installer Check**: Verify `getInstallerPackageName()` returns "com.android.vending" (Play Store).

[Previous: Chapter 02 - Rendering](chapter-02-rendering-jank.md) | [Next: Chapter 04 - R8](chapter-04-r8-optimization.md)
